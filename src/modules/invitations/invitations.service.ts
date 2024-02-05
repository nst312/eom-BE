import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { invitations, Prisma, users } from '@prisma/client';
import * as moment from 'moment';
import { AuthHelpers } from '../../shared/helpers/auth.helpers';
import { CompaniesService } from '../companies/companies.service';
import { SuccessMessageDTO } from '../posts/post.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as fs from 'fs';
import { readFileSync } from 'fs';
import * as paths from 'path';
import Handlebars from 'handlebars';
import { SendgridService } from '../../mail/sendgrid.service';
import { parse } from 'papaparse';
import { differenceBy, filter } from 'lodash';
import * as csv from 'csvtojson';

@Injectable()
export class InvitationsService {
  constructor(
    private prisma: PrismaService,
    private companyService: CompaniesService,
    private sendgridService: SendgridService,
  ) {}

  async getAllInvitation(
    user: users & { company_id: number },
  ): Promise<invitations[]> {
    const company_id = user.company_id;
    return await this.prisma.invitations.findMany({
      where: {
        deletedAt: null,
        company_id: company_id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async sendUserInvitation(body, user: users): Promise<invitations> {
    try {
      const { firstName, lastName, email } = body;

      // checking employee into user table
      const findUser = await this.prisma.users.findMany({ where: { email } });
      // checking employee already invited or not
      const findEmail = await this.prisma.invitations.findFirst({
        where: { deletedAt: null, email },
        rejectOnNotFound: null,
      });
      if (findUser.length > 0) {
        throw new BadRequestException({
          errors: { email: 'Email already exists.' },
        });
      }
      if (findEmail) {
        throw new BadRequestException({
          errors: { email: 'Employee already invited.' },
        });
      }
      const userCompany: users = await this.companyService.userCompany({
        id: Number(user.id),
      });
      const company_id = userCompany['companies'][0].id;
      const company_name = userCompany['companies'][0].company_name;
      const token = AuthHelpers.tokenHash();
      const response = await this.prisma.invitations.create({
        data: {
          firstName,
          lastName,
          email,
          token,
          company_id,
        },
      });
      // send email to the employee
      const username = firstName + ' ' + lastName;
      const link =
        process.env.FRONT_END + 'apps/invitation/validate-token/' + token;

      const data = {
        name: username,
        company: company_name,
        invitationLink: link,
      };

      const templateStr = fs
        .readFileSync(
          paths.resolve(__dirname, '../../../../templates/invitation.hbs'),
        )
        .toString('utf8');
      const template = Handlebars.compile(templateStr, { noEscape: true });
      const html = template(data);

      const mail = {
        to: email,
        subject: 'Welcome to EOM',
        from: process.env.SENDGRID_EMAIL_ADDRESS,
        text: link,
        html: html,
      };
      await this.sendgridService.sendMail(mail);
      return response;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new BadRequestException({
            errors: { email: 'Employee already invited.' },
          });
        }
      }
      throw e;
    }
  }

  async validateInvitation(where): Promise<SuccessMessageDTO | invitations> {
    try {
      const response = await this.prisma.invitations.findUnique({
        where,
      });
      if (response.deletedAt !== null) {
        throw new BadRequestException(
          'This invitation has already been accepted',
        );
      }
      const isTokenValid = this.validateToken(response);
      if (!isTokenValid) {
        throw new BadRequestException('token is expired');
      } else {
        return response;
      }
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  validateToken(invitation: invitations): boolean {
    const startTime = moment(invitation.updatedAt);
    const endTime = moment(new Date());
    const hoursDiff = endTime.diff(startTime, 'hours');

    if (hoursDiff >= 24) {
      return false;
    } else {
      return true;
    }
  }

  async acceptToken(where, data): Promise<users | SuccessMessageDTO> {
    try {
      const response = await this.prisma.invitations.findUnique({ where });

      if (response.deletedAt !== null) {
        throw new BadRequestException(
          'This invitation has already been accepted',
        );
      }
      const isTokenValid = this.validateToken(response);

      if (!isTokenValid) {
        throw new BadRequestException('This invitation is expired.');
      }
      const result = await this.prisma.users.create({
        data: {
          password: data.password,
          firstName: response.firstName,
          lastName: response.lastName,
          email: response.email,
          displayName: response.firstName,
          companies: {
            connect: {
              id: response.company_id,
            },
          },
        },
      });
      if (result) {
        await this.prisma.employees.create({
          data: {
            work_email: result.email,
            userId: result.id,
          },
        });

        const empId = await this.prisma.employees.findUnique({
          where: {
            userId: result.id,
          },
        });
        await this.prisma.dynamic_leave.create({
          data: {
            employeeId: empId.id,
            paidLeave: 1,
            sickLeave: 1,
            unPaidLeave: 0,
          },
        });
        await this.findInvitation({ id: response.id }, response.company_id);

        await this.prisma.invitations.update({
          where,
          data: {
            deletedAt: new Date(),
          },
        });

        return result;
      }
      // todo : need to handle else case
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async reSendUserInvitation(
    where,
    user: users & { company_id: number },
  ): Promise<invitations> {
    try {
      const findInvitationUserData = await this.prisma.invitations.findFirst({
        where,
      });
      if (
        findInvitationUserData.deletedAt !== null ||
        findInvitationUserData.company_id !== user.company_id
      ) {
        throw new NotFoundException('Invitation not found.');
      }
      const token = AuthHelpers.tokenHash();
      const userCompany: users = await this.companyService.userCompany({
        id: Number(user.id),
      });
      const username =
        findInvitationUserData.firstName +
        ' ' +
        findInvitationUserData.lastName;
      const link =
        process.env.FRONT_END + 'apps/invitation/validate-token/' + token;
      const company_name = userCompany['companies'][0].company_name;
      const data = {
        name: username,
        company: company_name,
        invitationLink: link,
      };

      const templateStr = fs
        .readFileSync(
          paths.resolve(__dirname, '../../../../templates/invitation.hbs'),
        )
        .toString('utf8');
      const template = Handlebars.compile(templateStr, { noEscape: true });
      const html = template(data);

      const mail = {
        to: findInvitationUserData.email,
        subject: 'Welcome to EOM',
        from: process.env.SENDGRID_EMAIL_ADDRESS,
        text: link,
        html: html,
      };
      await this.sendgridService.sendMail(mail);
      return await this.prisma.invitations.update({
        where,
        data: {
          token,
        },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async deleteInvitation(
    where,
    user: users & { company_id: number },
  ): Promise<invitations> {
    try {
      const company_id = user.company_id;
      await this.findInvitation(where, company_id);
      return await this.prisma.invitations.update({
        where,
        data: {
          deletedAt: new Date(),
        },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findInvitation(where, company_id): Promise<invitations> {
    try {
      const result = await this.prisma.invitations.findUnique({
        where,
      });
      if (result.deletedAt !== null || result.company_id !== company_id) {
        throw new NotFoundException('Invitation not found.');
      }
      return result;
    } catch (err) {
      throw new NotFoundException('Invitation not found.');
    }
  }

  // send csv file bulk invitation for employee
  async bulkCsvInvitation(user, path): Promise<SuccessMessageDTO> {
    const data = await csv().fromFile(path);

    if (data.length <= 0) {
      throw new Error('File is empty.');
    }

    const count = await this.multipleInvitation(data, user);
    return { message: `${count} invitation successfully.` };
  }

  // send csv file bulk invitation for employee
  async bulkInvitation(user, data): Promise<SuccessMessageDTO> {
    if (data.length <= 0) {
      throw new Error('Invitation request is empty.');
    }
    const count = await this.multipleInvitation(data, user);
    return { message: `${count} invitation successfully.` };
  }

  // create multiple employee invitation
  async multipleInvitation(data, user) {
    let invitationEmails = [];
    invitationEmails = data.map((result) => result.email);

    // checking employee into invitation table
    const _existInvitation = await this.prisma.invitations.findMany({
      where: {
        email: { in: invitationEmails },
      },
      select: {
        email: true,
      },
    });

    // checking employee into invitation table
    const _existUser = await this.prisma.users.findMany({
      where: {
        email: { in: invitationEmails },
      },
      select: {
        email: true,
      },
    });

    let checkEmail = [...data];
    if (_existInvitation.length > 0) {
      checkEmail = differenceBy(checkEmail, _existInvitation, 'email');
    }
    if (_existUser.length > 0) {
      checkEmail = differenceBy(checkEmail, _existUser, 'email');
    }

    // remove blank email
    checkEmail = filter(checkEmail, (v) => v.email !== '');
    const invitationData = filter(data, (v) => v.email !== '');

    // filtration original csv data
    let filterData = [];
    checkEmail.forEach((el) => {
      invitationData.forEach((d) => {
        if (d.email === el.email) filterData.push(d);
      });
    });

    if (filterData.length <= 0) {
      throw new NotFoundException('Data is already exist.');
    }

    // attach token and company id
    const payload = filterData.map((el) => {
      if (!el.email || el.email === '') return;
      return {
        email: el.email,
        firstName: el.firstName,
        lastName: el.lastName,
        token: AuthHelpers.tokenHash(),
        company_id: user.company_id,
      };
    });
    // create many invitation
    await this.prisma.invitations.createMany({
      data: payload,
      skipDuplicates: true,
    });

    // findInvitation
    invitationEmails = payload.map((el) => el.email);
    const invite = await this.prisma.invitations.findMany({
      where: {
        email: { in: invitationEmails },
      },
      select: {
        email: true,
        firstName: true,
        lastName: true,
        token: true,
        companies: {
          select: {
            company_name: true,
            website: true,
          },
        },
      },
    });

    const mail = invite.map((result) => {
      const { firstName, lastName, email, token, companies } = result;
      const username = firstName + ' ' + lastName;
      const company = companies.company_name;
      const website = companies.website;
      const link =
        process.env.FRONT_END + 'apps/invitation/validate-token/' + token;

      const hbsPayload = {
        name: username,
        company,
        invitationLink: link,
        website,
      };

      const templateStr = fs
        .readFileSync(
          paths.resolve(__dirname, '../../../../templates/invitation.hbs'),
        )
        .toString('utf8');
      const template = Handlebars.compile(templateStr, { noEscape: true });
      const html = template(hbsPayload);

      return {
        to: email,
        subject: 'Welcome to EOM',
        from: process.env.SENDGRID_EMAIL_ADDRESS,
        text: 'Employee Invitation Link',
        html: html,
      };
    });
    await this.sendgridService.sendMail(mail);
    return mail.length;
  }
}
