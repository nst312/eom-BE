import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Param,
  Query,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { posts, post_accepts } from '@prisma/client';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { ApiOkResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import {
  CreatePostDTO,
  MakeRatingBodyDTO,
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

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Post')
@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @Post()
  @ApiOperation({ summary: 'Create Post user' })
  @ApiBody({ type: CreatePostDTO })
  @ApiOkResponse({ type: CreatePostDTO })
  async createPost(
    @Body() post: CreatePostDTO,
    @Request() req,
  ): Promise<CreatePostDTO> {
    return this.postService.makePost(req.user, post);
  }

  @Get()
  @ApiQuery({ type: 'search', required: false })
  @ApiOperation({ summary: 'Get All Users Posts' })
  async getPosts(
    @Request() req,
    @Query('search') search: StringFilter,
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 20,
  ): Promise<PostsDTO> {
    return this.postService.findPosts(
      search,
      Number(page),
      Number(perPage),
      req.user,
    );
  }

  @Get('me')
  @ApiOperation({ summary: 'Get My User Posts' })
  async myPost(
    @Request() req,
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 20,
  ): Promise<PostsDTO> {
    return this.postService.findMyPost(req.user, Number(page), Number(perPage));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get User Posts' })
  async getPost(@Param('id') id: number): Promise<posts> {
    return this.postService.findPost({
      id: Number(id),
    });
  }

  @Put(':id')
  @ApiBody({ type: UpdateDTO })
  @ApiOperation({ summary: 'Update User Posts' })
  async updatePost(
    @Param('id') id: number,
    @Body() post: UpdateDTO,
    @Request() req,
  ): Promise<posts> {
    return this.postService.updateOnePost({ id: Number(id) }, req.user, post);
  }

  //Accept Post Issue
  @Post(':id/accept')
  @ApiOperation({ summary: 'Accept User Posts' })
  async acceptPost(
    @Param('id') id: number,
    @Request() req,
  ): Promise<post_accepts> {
    return this.postService.acceptPost({ postId: Number(id) }, { ...req.user });
  }

  @Get(':id/accept')
  @ApiOperation({ summary: 'Get Accepted Post Users' })
  async getAcceptsPostsById(@Param('id') id: number): Promise<posts> {
    return this.postService.getAcceptsPostsById({ id: Number(id) });
  }

  //Post Rating
  @Post(':id/rating')
  @ApiOperation({ summary: 'User Rating' })
  @ApiBody({ type: [MakeRatingBodyDTO] })
  @ApiOkResponse({ type: SuccessMessageDTO })
  async ratingPost(
    @Body() ratingUsers: MakeRatingBodyDTO[],
    @Request() req,
    @Param('id') id: number,
  ): Promise<SuccessMessageDTO> {
    return this.postService.makeRatingPost(
      ratingUsers,
      { id: Number(id) },
      req.user,
    );
  }
}
