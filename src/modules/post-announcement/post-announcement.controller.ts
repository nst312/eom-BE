import { PostAnnouncementService } from './post-announcement.service';
import { department_master, post_announcement, Role } from '@prisma/client';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import {
  createPostAnnouncementsDto,
  postAnnounceDto,
} from './post-announcement.dto';
import { ApiOkResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { SuccessMessageDTO } from '../posts/post.dto';
import { PERMISSION } from '../../shared/constants/permission.constants';

@Controller('post-announce')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Post Announcement')
export class PostAnnouncementController {
  constructor(private postAnnouncementService: PostAnnouncementService) {}

  // Add Announcement
  @Post('add/:companyId')
  @SetMetadata('permission', PERMISSION.CAN_ANNOUNCEMENT_ADD)
  @ApiOperation({ summary: 'Add_Announce' })
  async addBank(
    @Param('companyId') company_id: number,
    @Body() body: createPostAnnouncementsDto,
  ): Promise<post_announcement> {
    return this.postAnnouncementService.addPostAnnouncement(
      Number(company_id),
      body,
    );
  }

  @Put('update/:id')
  @SetMetadata('permission', PERMISSION.CAN_ANNOUNCEMENT_UPDATE)
  @ApiOperation({ summary: 'Update Post Announcement' })
  @ApiBody({ type: postAnnounceDto })
  async updateDepartment(
    @Param('id') id: number,
    @Body() body: createPostAnnouncementsDto,
  ): Promise<post_announcement> {
    return this.postAnnouncementService.updatePostAnnouncement(
      Number(id),
      body,
    );
  }

  @Get("list/:id")
  @SetMetadata('permission', PERMISSION.CAN_ANNOUNCEMENT_LIST)
  @ApiQuery({ type: 'search', required: false })
    @ApiOperation({ summary: 'Get post announcement by id' })
  async getPostAnnouncement(
    @Param('id') id: number,
    @Query('search') search: string,
    @Query('page') page = 1,
    @Query('perPage') perPage = 20,

  ): Promise<postAnnounceDto> {
    return this.postAnnouncementService.getPostAnnouncement(
      search,
      Number(page),
      Number(perPage),
      id
    );
  }

  // Delete announcement
  @Delete(':id')
  @SetMetadata('permission', PERMISSION.CAN_ANNOUNCEMENT_DELETE)
  @ApiOperation({ summary: 'Delete Announcement' })
  @ApiOkResponse({ type: 'Announcement successfully Deleted' })
  async deleteAnnouncement(
    @Param('id') id: number,
  ): Promise<post_announcement | SuccessMessageDTO> {
    return this.postAnnouncementService.deleteAnnouncement({ id: Number(id) });
  }
}
