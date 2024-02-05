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
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { addresses, Role } from '@prisma/client';
import { CompanyAddressService } from './company-address.service';
import {
  CreateCompanyAddressDTO,
  AddressCompanyResponseDTO,
  UpdateCompanyAddressDTO,
} from './company-address.dto';
import { SuccessMessageDTO } from '../posts/post.dto';
import { PERMISSION } from '../../shared/constants/permission.constants';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@SetMetadata('permission', [PERMISSION.CAN_COMPANY_ADDRESS])
@ApiTags('Company Address')
@Controller('company-address')
export class CompanyAddressController {
  constructor(private companyAddress: CompanyAddressService) {}

  @Post()
  @ApiOperation({ summary: 'Create company address' })
  @ApiBody({ type: CreateCompanyAddressDTO })
  @ApiCreatedResponse({ type: AddressCompanyResponseDTO })
  async store(
    @Body() body: CreateCompanyAddressDTO,
    @Request() req,
  ): Promise<AddressCompanyResponseDTO> {
    return this.companyAddress.store(body, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all company addresses' })
  async findAll(@Request() req): Promise<addresses[]> {
    return this.companyAddress.findAll(req.user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get company addresses Id by id' })
  async findOne(@Param('id') id: number, @Request() req): Promise<addresses> {
    return this.companyAddress.findOne({ id: Number(id) });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete company address' })
  @ApiResponse({ description: 'Company Address Successfully Deleted.' })
  async deleteOne(@Param('id') id: number): Promise<SuccessMessageDTO> {
    return this.companyAddress.deleteOne({ id: Number(id) });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update company Address' })
  @ApiBody({ type: CreateCompanyAddressDTO })
  async updateOne(
    @Param('id') id: number,
    @Body() body: UpdateCompanyAddressDTO,
  ): Promise<addresses> {
    return this.companyAddress.updateOne({ id: Number(id) }, body);
  }
}
