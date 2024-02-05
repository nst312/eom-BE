import {
  Controller,
  Get,
  Param,
  Post,
  Request,
  Res,
  SetMetadata,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { saveImageToStorage } from './config';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';

@ApiTags('Avatar')
@Controller('avatar')
export class ImageUploadController {
  constructor(private prisma: PrismaService) {}

  @Get(':fileName')
  findUploadFile(@Param('fileName') fileName: string, @Res() res) {
    return res.sendFile(fileName, { root: './images' });
  }

  @Get('companyLogo/:fileName')
  companyLogo(@Param('fileName') fileName: string, @Res() res) {
    return res.sendFile(fileName, { root: './templates/companyLogo' });
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Add Image' })
  @UseInterceptors(FileInterceptor('file', saveImageToStorage))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Request() req) {
    const data = {
      fileName: file.filename,
      userId: req?.user?.id,
    };

    return this.prisma.users.update({
      where: {
        id: data.userId,
      },
      data: {
        avatar_url: data.fileName,
      },
    });
  }
}
