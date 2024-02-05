import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Request,
  SetMetadata,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { CompanyPolicyService } from './company-policy.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { savePolicyToStorage } from '../image-upload/config';
import {
  createPolicyDto,
  PolicyDto,
  updatePolicyDto,
} from './company-policy.dto';
import { company_policy, department_master, Role } from '@prisma/client';
import { EmployeeCourseDTO } from '../course-certification/course-certification.dto';
import { updateDocDto } from '../documents/documents.dto';
import { ApiOkResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { SuccessMessageDTO } from '../posts/post.dto';
import { PERMISSION } from '../../shared/constants/permission.constants';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('company-policy')
@Controller('company-policy')
export class CompanyPolicyController {
  constructor(private PolicyService: CompanyPolicyService) {}

  @Post('add')
  @SetMetadata('permission', [PERMISSION.CAN_COMPANY_POLICY_ADD])
  @ApiOperation({ summary: 'add company-policy' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('path', savePolicyToStorage))
  createPolicy(
    @Body() body: createPolicyDto,
    @UploadedFile() file: Express.Multer.File,
    // @Param('empId') empId: number,
    @Request() req,
  ): Promise<company_policy> {
    console.log('file', file);
    const data = { ...body, path: file?.filename };
    return this.PolicyService.createPolicy(data, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'view all company-policy' })
  @ApiConsumes('multipart/form-data')
  async getAllPolicy(@Req() req): Promise<PolicyDto> {
    return await this.PolicyService.getAllPolicy(req.user);
  }

  @Get(':policyId')
  @ApiOperation({ summary: 'view company-policy by id ' })
  @ApiConsumes('multipart/form-data')
  async getPolicy(@Req() req, @Param('policyId') policyId: number) {
    return await this.PolicyService.getPolicy(req.user, policyId);
  }

  @Put('update/:policyId')
  @ApiOperation({ summary: 'update company-policy' })
  @UseInterceptors(FileInterceptor('path', savePolicyToStorage))
  @SetMetadata('permission', [PERMISSION.CAN_COMPANY_POLICY_UPDATE])
  @ApiConsumes('multipart/form-data')
  updatePolicy(
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
    @Param('policyId') policyId: number,
    @Body() body: updatePolicyDto,
  ) {
    const data = { ...body, path: file?.filename };
    return this.PolicyService.updatePolicy(data, policyId, req.user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Company Policy' })
  @ApiOkResponse({ type: 'Company Policy successfully Deleted' })
  async deletePolicy(
    @Param('id') id: number,
  ): Promise<company_policy | SuccessMessageDTO> {
    return this.PolicyService.deletePolicy({ id: Number(id) });
  }
}
