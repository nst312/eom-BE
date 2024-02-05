import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { department_master, post_announcement } from '@prisma/client';
import { postAnnounceDto } from './post-announcement.dto';
import { SuccessMessageDTO } from '../posts/post.dto';

@Injectable()
export class PostAnnouncementService {
  constructor(private prisma: PrismaService) {}

  async addPostAnnouncement(id, data): Promise<post_announcement> {
    return this.prisma.post_announcement.create({
      data: {
        ...data,
        company_id: id,
      },
    });
  }

  async updatePostAnnouncement(where, data): Promise<post_announcement> {
    return await this.prisma.post_announcement.update({
      where: {
        id: where,
      },
      data,
    });
  }

  async getPostAnnouncement(
    searchKey: string,
    page: number,
    perPage: number,
    id: any
  ): Promise<postAnnounceDto> {
    try {
      const count = await this.prisma.post_announcement.count({
        where: {
          deletedAt: null,
          company_id: Number(id),
        },
      });

      if (searchKey) {
        console.log("?????", searchKey);
        searchKey = `*${searchKey}*`;
        const data = await this.prisma.post_announcement.findMany({
          skip: perPage * (page - 1),
          take: perPage,
          where: {
            deletedAt: null,
            company_id: id,
            OR: {
              message: {
                search: `${searchKey}`,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        });
        return { count, data };
      } else {
        const data = await this.prisma.post_announcement.findMany({
          skip: perPage * (page - 1),
          take: perPage,
          where: {
            deletedAt: null,
            company_id:Number(id),
          },
          orderBy: {
            createdAt: 'desc',
          },
        });
        return { count, data };
      }
    } catch (err) {
      console.log(">>>>>>>>>>>>>////////>>>>>>>>>>>>>", err);
      throw new NotFoundException('Post announcement not found.');
    }
  }

  async deleteAnnouncement(
    where,
  ): Promise<SuccessMessageDTO | post_announcement> {
    // check announcement exist or not
    await this.findAnnouncement(where);
    await this.prisma.post_announcement.update({
      where,
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Announcement deleted successfully.' };
  }

  async findAnnouncement(where): Promise<post_announcement> {
    try {
      const response = await this.prisma.post_announcement.findUnique({
        where,
      });
      if (response.deletedAt)
        throw new BadRequestException('Announcement not found.');
      return response;
    } catch (e) {
      throw new BadRequestException('Announcement not found.');
    }
  }
}
