import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  Request,
  SetMetadata,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CourseCertificationService } from './course-certification.service';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  saveDocumentsToStorage,
  saveImageToStorage,
} from '../image-upload/config';
import {
  createCourseDto,
  EmployeeCourseDTO,
  updateCourseDto,
} from './course-certification.dto';
import { course, document, Role, works } from '@prisma/client';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { EmployeeDocDTO, updateDocDto } from '../documents/documents.dto';
import { PERMISSION } from '../../shared/constants/permission.constants';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('course-certification')
@Controller('course-certification')
export class CourseCertificationController {
  constructor(private courseService: CourseCertificationService) {}

  @Post('add/:empId')
  @ApiOperation({ summary: 'add certificate' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('path', saveDocumentsToStorage))
  createCourse(
    @Body() body: createCourseDto,
    @UploadedFile() file: Express.Multer.File,
    @Param('empId') empId: number,
    @Request() req,
  ): Promise<course> {
    const data = { ...body, path: file?.filename };
    return this.courseService.createCourse(data, empId, req.user);
  }

  @Get(':empId')
  @ApiOperation({ summary: 'view courseCertificate by employee id' })
  @ApiConsumes('multipart/form-data')
  async getDocuments(
    @Param('empId') empId: number,
    @Req() req,
  ): Promise<EmployeeCourseDTO> {
    return await this.courseService.getCourse(empId, req.user);
  }

  @Get('courseId/:courseId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get Course By ID' })
  getCourseById(@Param('courseId') courseId: number) {
    return this.courseService.getCourseById(courseId);
  }

  @Put('update/:courseId')
  @ApiOperation({ summary: 'update courseCertificate by employee id' })
  @UseInterceptors(FileInterceptor('path', saveImageToStorage))
  @ApiConsumes('multipart/form-data')
  updateCourse(
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
    @Param('courseId') courseId: number,
    @Body() body: updateCourseDto,
  ) {
    const data = file ? { ...body, path: file.filename } : body;
    return this.courseService.updateCourse(data, courseId);
  }

  @Post('verification/:courseId')
  @SetMetadata('permission', PERMISSION.CAN_COURSE_VERIFIED)
  @ApiOperation({ summary: 'verification courseCertificate by id' })
  @ApiConsumes('multipart/form-data')
  verificationCourse(@Param('courseId') courseId: number) {
    return this.courseService.verificationCourse(courseId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete certificate' })
  deleteWork(@Param('id', ParseIntPipe) id: number): Promise<course> {
    return this.courseService.deleteCourse(id);
  }
}
