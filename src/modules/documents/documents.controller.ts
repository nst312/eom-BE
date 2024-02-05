import {
  Controller,
  Body,
  Get,
  Post,
  Put,
  Param,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
  Req,
  SetMetadata,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { createDocDTO, EmployeeDocDTO, updateDocDto } from './documents.dto';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  saveDocumentsToStorage,
  saveImageToStorage,
} from '../image-upload/config';
import { document, Role } from '@prisma/client';
import { PERMISSION } from '../../shared/constants/permission.constants';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('documents')
@Controller('documents')
export class DocumentsController {
  constructor(private documentService: DocumentsService) {}

  @Post('add/:empId')
  @ApiOperation({ summary: 'add documents' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('path', saveImageToStorage))
  createDocument(
    @Body() body: createDocDTO,
    @UploadedFile() file: Express.Multer.File,
    @Param('empId') empId: number,
    @Request() req,
  ): Promise<document> {
    const data = { ...body, path: file?.filename };
    return this.documentService.createDocument(data, empId, req.user);
  }

  @Get(':empId')
  @ApiOperation({ summary: 'view documents by employee id' })
  @ApiConsumes('multipart/form-data')
  async getDocuments(
    @Param('empId') empId: number,
    @Req() req,
  ): Promise<EmployeeDocDTO> {
    return await this.documentService.getDocuments(empId, req.user);
  }

  @Get('documentId/:documentId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get Document By ID' })
  getDocumentById(@Param('documentId') documentId: number) {
    return this.documentService.getDocumentById(documentId);
  }

  @Put('update/:docId')
  @ApiOperation({ summary: 'update documents by document id' })
  @UseInterceptors(FileInterceptor('path', saveDocumentsToStorage))
  @ApiConsumes('multipart/form-data')
  updateDocument(
    @UploadedFile() file: Express.Multer.File,
    @Param('docId') docId: number,
    @Body() body: updateDocDto,
  ) {
    const data = file ? { ...body, path: file.filename } : body;
    return this.documentService.updateDocument(data, docId);
  }

  @Post('verification/:docId')
  @SetMetadata('permission', [PERMISSION.CAN_DOC_VERIFIED])
  @ApiOperation({ summary: 'verification documents by id' })
  @ApiConsumes('multipart/form-data')
  verificationDocuments(@Param('docId') docId: number) {
    return this.documentService.verificationDocuments(docId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete document' })
  deleteDocument(@Param('id', ParseIntPipe) id: number): Promise<document> {
    return this.documentService.deleteDocument(id);
  }
}
