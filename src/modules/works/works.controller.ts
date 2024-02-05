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
  Res,
  SetMetadata,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { CreateWorkDTO, UpdateWorkDTO } from './works.dto';
import { WorksService } from './works.service';
import { Role, works } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { saveFileToStorage, saveImageToLogoStorage } from '../companies/config';
import { saveDocumentsToStorage } from '../image-upload/config';
import { PERMISSION } from '../../shared/constants/permission.constants';

@ApiBearerAuth()
@ApiTags('works')
@UseGuards(JwtAuthGuard)
@Controller('works')
export class WorksController {
  constructor(private worksService: WorksService) {}

  @Get()
  @ApiOperation({ summary: 'Get All Works' })
  getAllWorks() {
    return this.worksService.getAllWork();
  }

  @Get('workId/:workId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get Work By ID' })
  getWorkById(@Param('workId') workId: number) {
    return this.worksService.getWorkById(workId);
  }

  @Get(':empId')
  @UseGuards(JwtAuthGuard)
  getWork(@Param('empId') empId: number) {
    return this.worksService.getWork({
      employeeId: Number(empId),
      deletedAt: null,
    });
  }

  @Post(':empId')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'created works' })
  @UseInterceptors(FileInterceptor('path', saveDocumentsToStorage))
  createWorks(
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
    @Param('empId') empId: number,
    @Body() body: CreateWorkDTO,
  ) {
    const data = { ...body, path: file?.filename };
    return this.worksService.createWork(data, req.user, empId);
  }

  @Put(':workId')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Update works' })
  @UseInterceptors(FileInterceptor('path', saveFileToStorage))
  updateWorks(
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
    @Param('workId') workId: number,
    @Body() body: UpdateWorkDTO,
  ) {
    const data = file ? { ...body, path: file.filename } : body;
    return this.worksService.updateWork(data, req.user, workId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete works' })
  deleteWork(@Param('id', ParseIntPipe) id: number): Promise<works> {
    return this.worksService.deleteWork(id);
  }

  //  DOWNLOAD Work
  @Get(`download/:id`)
  @UseGuards(JwtAuthGuard)
  @SetMetadata('permission', [PERMISSION.CAN_WORKS_DOWNLOAD])
  @ApiOperation({ summary: 'Download work' })
  async downloadWork(@Param('id') id: number, @Res() res): Promise<any> {
    return this.worksService.downloadWork(id, res);
  }
}
