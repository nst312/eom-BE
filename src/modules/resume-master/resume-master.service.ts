import { BadRequestException, Injectable } from '@nestjs/common';
import { resumes } from '@prisma/client';
import * as fs from 'fs';
import Handlebars from 'handlebars';
import * as pdf from 'html-pdf';
import * as paths from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as moment from 'moment';
import { CommonHelpers } from '../../shared/helpers/common.helpers';
import { SuccessMessageDTO } from '../posts/post.dto';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateResumeDTO,
  ResumesDTO,
  UpdateResumeDTO,
} from './dto/resume-master.dto';

@Injectable()
export class ResumeMasterService {
  constructor(private prisma: PrismaService) {}

  async create(data, user): Promise<CreateResumeDTO | resumes> {
    const payload = {
      personalDetails: data.personalDetails,
      profiles: data.profiles,
      educations: data.educations,
      employments: data.employments,
      skills: data.skills,
      languages: data.languages,
      hobbies: data.hobbies,
      certificates: data.certificates,
    };

    return this.prisma.resumes.create({
      data: {
        themeCode: data.themeCode,
        employee_id: user.employee_id,
        personalDetails: {
          create: payload.personalDetails,
        },
        profiles: {
          create: payload.profiles,
        },
        educations: {
          create: payload.educations,
        },
        employments: {
          create: payload.employments,
        },
        skills: {
          create: payload.skills,
        },
        languages: {
          create: payload.languages,
        },
        hobbies: {
          create: payload.hobbies,
        },
        certificates: {
          create: payload.certificates,
        },
      },
      include: {
        personalDetails: true,
        profiles: true,
        educations: true,
        employments: true,
        skills: true,
        languages: true,
        hobbies: true,
        certificates: true,
      },
    });
  }

  async uploadResumeAvatar(id, file, type): Promise<any> {
    const { filename } = file;
    if (type === 'photo') {
      return this.prisma.resumes.update({
        where: { id: Number(id) },
        data: {
          personalDetails: {
            update: {
              photo: filename,
            },
          },
        },
      });
    } else {
      return this.prisma.resumes.update({
        where: { id: Number(id) },
        data: {
          themeImage: filename,
        },
      });
    }
  }

  async findAll(where, page, perPage, user): Promise<ResumesDTO | resumes[]> {
    const company_id = user.company_id;
    const userId = user.role === 'EMPLOYEE' ? user.id : undefined;
    const count = await this.prisma.resumes.count({
      where: {
        employees: {
          users: {
            id: userId,
            companies: {
              every: {
                id: company_id,
              },
            },
          },
        },
        deletedAt: null,
      },
    });

    const data = await this.prisma.resumes.findMany({
      skip: perPage * (page - 1),
      take: perPage,
      where: {
        employees: {
          users: {
            id: userId,
            companies: {
              every: {
                id: company_id,
              },
            },
          },
        },
        deletedAt: null,
      },
      include: {
        personalDetails: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return { count, data };
  }

  async update(where, data, user): Promise<UpdateResumeDTO | resumes> {
    await this.find(where, user);
    const payload = {
      personalDetails: data.personalDetails,
      profiles: data.profiles,
      educations: data.educations,
      employments: data.employments,
      skills: data.skills,
      languages: data.languages,
      hobbies: data.hobbies,
      certificates: data.certificates,
    };
    const educations = await this.upsertArray(payload.educations);
    const employments = await this.upsertArray(payload.employments);
    const skills = await this.upsertArray(payload.skills);
    const languages = await this.upsertArray(payload.languages);
    const hobbies = await this.upsertArray(payload.hobbies);
    const certificates = await this.upsertArray(payload.certificates);

    delete payload.personalDetails.resumeId;
    delete payload.profiles.resumeId;

    return this.prisma.resumes.update({
      where,
      data: {
        themeCode: data.themeCode,
        employee_id: user.employee_id,
        personalDetails: {
          update: payload.personalDetails,
        },
        profiles: {
          update: payload.profiles,
        },
        educations: {
          upsert: educations,
        },
        employments: {
          upsert: employments,
        },
        skills: {
          upsert: skills,
        },
        languages: {
          upsert: languages,
        },
        hobbies: {
          upsert: hobbies,
        },
        certificates: {
          upsert: certificates,
        },
      },
      include: {
        personalDetails: true,
        profiles: true,
        educations: true,
        employments: true,
        skills: true,
        languages: true,
        hobbies: true,
        certificates: true,
      },
    });
  }

  htmlToPdfBuffer(html) {
    const options = {
      format: 'A4',
      type: 'pdf',
      orientation: 'portrait',
    };
    return new Promise((resolve, reject) => {
      // get previous month
      pdf
        .create(html, options)
        .toFile(`./templates/resume/pdf/${uuidv4()}.pdf`, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res.filename);
          }
        });
    });
  }

  async downloadResume(where, user, fullUrl): Promise<{ pdf: string }> {
    const resume = await this.find(where, user);
    const themeCode = resume.themeCode > 0 ? resume.themeCode : 1;

    const templateStr = fs
      .readFileSync(
        paths.resolve(
          __dirname,
          `../../../../templates/resume/resume-template/${themeCode}.hbs`,
        ),
      )
      .toString('utf8');
    const template = Handlebars.compile(templateStr, { noEscape: true });
    let dateOfBirth = '';
    if (resume['personalDetails'].dob) {
      dateOfBirth = moment(resume['personalDetails'].dob).format(
        'MMMM Do YYYY',
      );
    }
    const resumeData = {
      ...resume,
      dob: dateOfBirth,
      photoURL: fullUrl,
    };
    const html = template(resumeData);
    // html to pdf
    const filePath = await this.htmlToPdfBuffer(html);

    // pdf convert to base 64
    const data_base64 = CommonHelpers.base64_encode(filePath);
    // fs.unlinkSync(<PathLike>filePath);
    return { pdf: data_base64 };
  }

  async previewResume(where, user, fullUrl) {
    const resume = await this.find(where, user);
    console.log('were==', where);
    const themeCode = resume.themeCode > 0 ? resume.themeCode : 1;
    const templateStr = fs
      .readFileSync(
        paths.resolve(
          __dirname,
          `../../../../templates/resume/resume-template/${themeCode}.hbs`,
        ),
      )
      .toString('utf8');
    const template = Handlebars.compile(templateStr, { noEscape: true });
    const resumeData = {
      ...resume,
      photoURL: fullUrl,
      dob: moment(resume['personalDetails'].dob).format('MMMM Do YYYY'),
    };
    const html = template(resumeData);

    // const filePath = await this.htmlToPdfBuffer(html);

    // html to pdf
    // const filePath = await this.htmlToPdfBuffer(html);

    // pdf convert to base 64
    // const data_base64 = CommonHelpers.base64_encode(filePath);
    // fs.unlinkSync(<PathLike>filePath);
    return html;
  }

  async delete(where, user): Promise<SuccessMessageDTO> {
    await this.find(where, user);
    await this.prisma.resumes.update({
      where,
      data: {
        deletedAt: new Date(),
      },
    });
    return { message: 'Delete resume successfully.' };
  }

  async find(where, user): Promise<resumes> {
    const empId = user.role === 'EMPLOYEE' ? user.employee_id : undefined;
    try {
      const response = await this.prisma.resumes.findFirst({
        where: {
          id: where.id,
          employee_id: empId,
        },
        include: {
          personalDetails: true,
          profiles: true,
          educations: {
            orderBy: {
              id: 'asc',
            },
          },
          employments: {
            orderBy: {
              id: 'asc',
            },
          },
          skills: {
            orderBy: {
              id: 'asc',
            },
          },
          languages: {
            orderBy: {
              id: 'asc',
            },
          },
          hobbies: {
            orderBy: {
              id: 'asc',
            },
          },
          certificates: {
            orderBy: {
              id: 'asc',
            },
          },
        },
      });
      if (response.deletedAt !== null) {
        throw new BadRequestException('Resume not found.');
      }
      delete response.deletedAt;
      return response;
    } catch (err) {
      throw new BadRequestException('Resume not found.');
    }
  }

  upsertArray(element): Promise<any> {
    if (!element || element.length <= 0) return undefined;
    return element.map((el) => {
      let update;
      let create;
      delete el.resumeId;
      if (el.id) {
        update = {
          where: {
            id: el.id,
          },
          update: el,
          create: el,
        };
      } else {
        create = {
          where: {
            id: 0,
          },
          update: el,
          create: el,
        };
      }
      return { ...update, ...create };
    });
  }
}
