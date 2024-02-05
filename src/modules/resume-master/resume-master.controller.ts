import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UploadedFile,
  SetMetadata,
  UseInterceptors,
  UseGuards,
  Param,
  Put,
  Res,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResumeMasterService } from './resume-master.service';
import { resumes, Role } from '@prisma/client';
import {
  CreateResumeDTO,
  ResumesDTO,
  UpdateResumeDTO,
} from './dto/resume-master.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { resumeImage } from '../../shared/helpers/image-upload.helpers';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { SuccessMessageDTO } from '../posts/post.dto';
import { PERMISSION } from '../../shared/constants/permission.constants';

@ApiTags('Resume')
@Controller('resume-master')
@ApiBearerAuth()
export class ResumeMasterController {
  constructor(private _resume: ResumeMasterService) {}

  // Make a Resume
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create Resume' })
  @ApiBody({ type: CreateResumeDTO })
  async create(@Body() body: CreateResumeDTO, @Request() req): Promise<any> {
    return this._resume.create(body, req.user);
  }

  //upload personal details avatar
  @Put(':id/avatar')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('photo', resumeImage))
  async uploadResumeAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: number,
  ): Promise<any> {
    return this._resume.uploadResumeAvatar(id, file, 'photo');
  }

  //upload personal details theme image
  @Put(':id/themeImage')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('themeImage', resumeImage))
  async uploadResumeThemeImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: number,
  ): Promise<any> {
    return this._resume.uploadResumeAvatar(id, file, 'themeImage');
  }

  //upload personal details theme image
  @Get(':id/download')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Download Employee Resume' })
  async resumeDownload(
    @Param('id') id: number,
    @Request() req,
  ): Promise<{ pdf: string }> {
    const fullUrl =
      req.protocol + '://' + req.get('host') + '/api/resume-master/image/';
    return this._resume.downloadResume({ id: Number(id) }, req.user, fullUrl);
  }

  //preview personal details theme image
  @Get(':id/preview')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Preview Employee Resume' })
  @SetMetadata('permission', [PERMISSION.CAN_RESUME_PREVIEW])
  async resumePreview(@Param('id') id: number, @Request() req) {
    const fullUrl =
      req.protocol + '://' + req.get('host') + '/api/resume-master/image/';
    return this._resume.previewResume({ id: Number(id) }, req.user, fullUrl);
  }

  // Get a Resume List
  @Get()
  @UseGuards(JwtAuthGuard)
  @SetMetadata('permission', [PERMISSION.CAN_RESUME_LIST])
  @ApiOperation({ summary: 'Get Resume List' })
  @ApiImplicitQuery({
    name: 'perPage',
    required: false,
    type: Number,
  })
  @ApiImplicitQuery({
    name: 'page',
    required: false,
    type: Number,
  })
  async findAll(
    @Query('page') page = 1,
    @Query('perPage') perPage = 20,
    @Request() req,
  ): Promise<ResumesDTO | resumes[]> {
    return this._resume.findAll(
      { deletedAt: null },
      Number(page),
      Number(perPage),
      req.user,
    );
  }

  // Get a Resume
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get Resume' })
  async find(@Param('id') id: number, @Request() req): Promise<resumes> {
    return this._resume.find({ id: Number(id) }, req.user);
  }

  @Get('image/:fileName')
  getImageUrl(@Param('fileName') fileName: string, @Res() res) {
    return res.sendFile(fileName, { root: './templates/resume/images' });
  }

  // Update a Resume
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update Resume' })
  @ApiBody({ type: UpdateResumeDTO })
  async update(
    @Param('id') id: number,
    @Body() body: UpdateResumeDTO,
    @Request() req,
  ): Promise<UpdateResumeDTO | resumes> {
    return this._resume.update({ id: Number(id) }, body, req.user);
  }

  // Delete Resume
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete Resume' })
  async delete(
    @Param('id') id: number,
    @Request() req,
  ): Promise<SuccessMessageDTO> {
    return this._resume.delete({ id: Number(id) }, req.user);
  }
}
