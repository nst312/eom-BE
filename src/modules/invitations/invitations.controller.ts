import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
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
import { invitations, Role, users } from '@prisma/client';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { SuccessMessageDTO } from '../posts/post.dto';
import {
  UserInvitationDTO,
  PasswordDTO,
  MultipleInvitationDTO,
  BulkCsvInvitationDTO,
} from './invitations.dto';
import { InvitationsService } from './invitations.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { saveCvsToStorage } from '../image-upload/config';
import path from 'path';
import { PERMISSION } from '../../shared/constants/permission.constants';
@ApiBearerAuth()
@ApiTags('Employee Invitation')
@Controller('invitations')
export class InvitationsController {
  constructor(private invitationService: InvitationsService) {}

  // Get All Employee Invitation

  @UseGuards(JwtAuthGuard)
  @SetMetadata('permission', PERMISSION.CAN_INVITATION_LIST)
  @Get()
  @ApiOperation({
    summary: 'Get all employee invitation by company admin (Admin Only)',
  })
  async getAllInvitation(@Request() req): Promise<invitations[]> {
    return this.invitationService.getAllInvitation(req.user);
  }

  // Send New Employee Invitation

  @Post('employee')
  @UseGuards(JwtAuthGuard)
  @SetMetadata('permission', PERMISSION.CAN_INVITATION_ADD)
  @ApiOperation({
    summary: 'Send employee invitation by company admin. (Admin Only)',
  })
  @ApiBody({ type: UserInvitationDTO })
  async sendUserInvitation(
    @Body() body: UserInvitationDTO,
    @Request() req,
  ): Promise<invitations> {
    return this.invitationService.sendUserInvitation(body, req.user);
  }

  // Check Employee Invitation Token

  // @UseGuards(JwtGuestGuard)
  @Get('validate/:token')
  @ApiOperation({
    summary: 'Check invitations using token by employee. (Admin Only)',
  })
  async validateinInvitations(
    @Param('token') token: string,
  ): Promise<SuccessMessageDTO | invitations> {
    return this.invitationService.validateInvitation({ token: token });
  }

  // Accept Employee Invitation Token

  // @UseGuards(JwtGuestGuard)
  @Post('accept/:token')
  @ApiOperation({ summary: 'Accept invitation by employee.' })
  @ApiBody({ type: PasswordDTO })
  async acceptToken(
    @Param('token') token: string,
    @Body() body: PasswordDTO,
  ): Promise<users | SuccessMessageDTO> {
    return this.invitationService.acceptToken({ token }, body);
  }

  // Re-send Employee Invitation Token

  @Put('resend/:id')
  @UseGuards(JwtAuthGuard)
  @SetMetadata('permission', PERMISSION.CAN_INVITATION_RESEND)
  @ApiOperation({
    summary: 'Resend employee invitation by company admin. (Admin Only)',
  })
  async reSendUserInvitation(
    @Param('id') id: number,
    @Request() req,
  ): Promise<invitations> {
    return this.invitationService.reSendUserInvitation(
      { id: Number(id) },
      req.user,
    );
  }

  // Delete Employee Invitation Token

  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard)
  @SetMetadata('permission', PERMISSION.CAN_INVITATION_DELETE)
  @ApiOperation({
    summary: 'Delete employee invitation by company admin. (Admin Only)',
  })
  async deleteInvitation(
    @Param('id') id: number,
    @Request() req,
  ): Promise<invitations> {
    return this.invitationService.deleteInvitation(
      { id: Number(id) },
      req.user,
    );
  }

  @Post('bulk-csv')
  @UseGuards(JwtAuthGuard)
  @SetMetadata('permission', PERMISSION.CAN_INVITATION_BULK_SEND)
  @UseInterceptors(FileInterceptor('path', saveCvsToStorage))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Upload CSV File. (Admin Only)',
  })
  async bulkCsvInvitation(
    @Request() req,
    @Body() body: BulkCsvInvitationDTO,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<SuccessMessageDTO> {
    const filepath = file.path;
    return this.invitationService.bulkCsvInvitation(req.user, filepath);
  }

  @Post('multiple')
  @UseGuards(JwtAuthGuard)
  @SetMetadata('permission', PERMISSION.CAN_INVITATION_MUL_SEND)
  @ApiOperation({
    summary: 'Upload Multiple Invitation. (Admin Only)',
  })
  async bulkInvitation(
    @Request() req,
    @Body() body: MultipleInvitationDTO,
  ): Promise<SuccessMessageDTO> {
    const data = body.invitations;
    return this.invitationService.bulkInvitation(req.user, data);
  }
}
