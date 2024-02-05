import {
  BadRequestException,
  ForbiddenException,
  Get,
  Injectable,
  NotFoundException,
  Param,
  Res,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { posts, post_accepts, Prisma, Status, users } from '@prisma/client';
import {
  CreatePostDTO,
  PostsDTO,
  SuccessMessageDTO,
  UpdateDTO,
} from './post.dto';

type StringFilter = {
  search: SearchFilter | string | number;
};

type SearchFilter = {
  query: string;
  mode: SearchFilterMode;
};

enum SearchFilterMode {
  NATURAL,
  BOOLEAN,
}

const tsQuery = /[()|:*!]/g;

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async makePost(
    user: users & { company_id: number },
    posts,
  ): Promise<CreatePostDTO> {
    const company_id = user.company_id;
    return await this.prisma.posts.create({
      data: {
        ...posts,
        createdBy: {
          connect: {
            id: user.id,
          },
        },
        companies: {
          connect: {
            id: company_id,
          },
        },
      },
    });
  }

  async updateOnePost(
    where,
    user: users,
    post: UpdateDTO,
  ): Promise<posts | any> {
    const findPost = await this.findById(where);
    if (findPost.createById !== user.id)
      throw new ForbiddenException('No Permission');
    return await this.prisma.posts.update({
      where,
      data: post,
    });
  }

  async findPosts(
    searchKey: StringFilter,
    page: number,
    perPage: number,
    user: users & { company_id: number },
  ): Promise<PostsDTO> {
    // const getQuery = (searchKey: string) => {
    //     searchKey
    //         .replace(tsQuery, " ")
    //         .trim()
    //         .split(/\s+/)
    //         .join(" | ");
    // }
    const company_id = user.company_id;
    const postCount = await this.prisma.posts.count();

    if (searchKey) {
      const data = await this.prisma.posts.findMany({
        skip: perPage * (page - 1),
        take: perPage,
        where: {
          title: {
            search: `${searchKey}`,
          },
          description: {
            search: `${searchKey}`,
          },
          companies: {
            every: {
              id: user.company_id,
            },
          },
        },
        include: {
          createdBy: {
            select: {
              id: true,
              displayName: true,
              email: true,
            },
          }, // Return all fields
          postsAccepted: {
            include: {
              acceptBy: {
                select: {
                  displayName: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return { count: postCount, data };
    } else {
      const data = await this.prisma.posts.findMany({
        skip: perPage * (page - 1),
        take: perPage,
        where: {
          companies: {
            every: {
              id: company_id,
            },
          },
        },
        include: {
          createdBy: {
            select: {
              id: true,
              displayName: true,
              email: true,
            },
          }, // Return all fields
          postsAccepted: {
            include: {
              acceptBy: {
                select: {
                  displayName: true,
                },
              },
            },
          },
          companies: {
            select: {
              id: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return { count: postCount, data };
    }
  }

  async findPost(where: Prisma.postsWhereUniqueInput): Promise<posts> {
    await this.findById(where);
    return await this.prisma.posts.findUnique({
      where,
      include: {
        createdBy: {
          select: {
            id: true,
            displayName: true,
            email: true,
          },
        }, // Return all fields
      },
    });
  }

  //
  async findMyPost(
    user: users,
    page: number,
    perPage: number,
  ): Promise<PostsDTO> {
    const myPostCount = await this.prisma.posts.count({
      where: {
        createById: user.id,
      },
    });
    const response = await this.prisma.posts.findMany({
      skip: perPage * (page - 1),
      take: perPage,
      where: { createById: user.id },
      include: {
        createdBy: {
          select: {
            id: true,
            displayName: true,
            email: true,
          },
        }, // Return all fields
        postsAccepted: {
          include: {
            acceptBy: {
              select: {
                displayName: true,
              },
            },
          },
        },
        companies: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return { count: myPostCount, data: response };
  }

  //Update Post Status
  async updatePostStatus(
    where: Prisma.postsWhereUniqueInput,
    status: Status,
  ): Promise<posts> {
    return this.prisma.posts.update({
      where,
      data: {
        status,
      },
    });
  }

  //accepts post
  async acceptPost(data, user: users): Promise<post_accepts> {
    const isAccepted = await this.checkAcceptPost({
      postId: Number(data.postId),
      userId: Number(user.id),
    });
    if (isAccepted) return isAccepted;
    const postObj = await this.findById({ id: data.postId });
    if (!postObj) throw new BadRequestException('Post id no exist');
    if (postObj.createById === user.id)
      throw new BadRequestException("You can't accept your own post.");
    await this.updatePostStatus({ id: data.postId }, Status.ACCEPTED);
    return await this.prisma.post_accepts.create({
      data: {
        acceptPost: {
          connect: {
            id: data.postId,
          },
        },
        acceptBy: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  }

  async getAcceptsPostsById(where): Promise<any> {
    await this.findById(where);
    return await this.prisma.posts.findUnique({
      where,
      select: {
        id: true,
        postsAccepted: {
          select: {
            acceptBy: {
              select: {
                displayName: true,
                id: true,
              },
            },
            id: false,
          },
        },
      },
    });
  }

  //Post Ratings
  async makeRatingPost(
    ratingUsers,
    where,
    user: users,
  ): Promise<SuccessMessageDTO> {
    await this.findById(where);
    const postObj = await this.checkPostRatingPostId({
      postId: Number(where.id),
    });
    if (postObj && postObj.status === Status.CLOSED)
      throw new BadRequestException('Rating already added.');

    //maping multiple rating
    const newData = ratingUsers.map(async (el) => {
      if (el.userId === user.id)
        throw new BadRequestException('Your not rating consider');
      if (el.rating > 10)
        throw new BadRequestException('Rating must be less then 10.');
      const currentUsers = await this.prisma.users.findUnique({
        where: { id: el.userId },
      });
      const totalRating = currentUsers.totalRating + el.rating;
      await this.prisma.users.updateMany({
        where: { id: currentUsers.id },
        data: {
          totalRating,
        },
      });
      return { ...el, postId: where.id };
    });
    const _data = await Promise.all(newData);

    const response = await this.prisma.post_ratings.createMany({
      data: _data,
      skipDuplicates: true, // Skip 'Bobo'
    });
    if (response)
      await this.updatePostStatus({ id: Number(where.id) }, Status.CLOSED);

    return { message: 'Post resolve successfully.' };
  }

  async findById(where: Prisma.postsWhereUniqueInput): Promise<posts> {
    try {
      const postObj = await this.prisma.posts.findUnique({ where });
      if (!postObj) throw new NotFoundException('Post Not Found');
      return postObj;
    } catch (err) {
      throw new NotFoundException('Post Not Found');
      return;
    }
  }

  async checkAcceptPost(
    where: Prisma.post_acceptsWhereInput,
  ): Promise<post_accepts> {
    try {
      return await this.prisma.post_accepts.findFirst({ where });
    } catch (err) {
      return;
    }
  }

  async checkPostRatingPostId(
    where: Prisma.post_ratingsWhereInput,
  ): Promise<any> {
    try {
      const isRatingPost = await this.prisma.post_ratings.findFirst({ where });
      if (isRatingPost) {
        const postObjs = await this.findById({
          id: Number(isRatingPost.postId),
        });
        return postObjs;
      }
    } catch (err) {
      return;
    }
  }
}
