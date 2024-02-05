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
import { addresses, Role } from '@prisma/client';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { SuccessMessageDTO } from '../posts/post.dto';
import {
  AddressResponseDTO,
  CreateAddressDTO,
  UpdateAddressDTO,
} from './addresses.dto';
import { AddressesService } from './addresses.service';
import { PERMISSION } from '../../shared/constants/permission.constants';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@SetMetadata('permission', [PERMISSION.CAN_ADDRESS])
@ApiTags('User Address')
@Controller('user-address')
export class AddressesController {
  constructor(private addressService: AddressesService) {}

  @Post(':userId')
  @ApiOperation({ summary: 'Create User Address' })
  async store(
    @Body() body: CreateAddressDTO,
    @Param('userId') userId: number,
    @Request() req,
  ): Promise<AddressResponseDTO> {
    return this.addressService.store(body, userId);
  }

  @Get(':userId/:id')
  @ApiOperation({ summary: 'Find By User Address User & AddressId' })
  async findOne(
    @Param('userId') userId: number,
    @Param('id') id: number,
  ): Promise<addresses> {
    const addressId = { id: Number(id) };
    const meId = { id: Number(userId) };
    return this.addressService.findOne(addressId, meId);
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Find All User Address' })
  async findAll(
    @Param('userId') userId: number,
    @Request() req,
  ): Promise<addresses[]> {
    const meId = { id: Number(userId) };
    return this.addressService.findAll(meId);
  }

  @Put(':userId/:id')
  @ApiOperation({ summary: 'Update User Address Using Ids' })
  async updateOne(
    @Body() body: UpdateAddressDTO,
    @Param('userId') userId: number,
    @Param('id') id: number,
  ): Promise<addresses> {
    const addressId = { id: Number(id) };
    const meId = { id: Number(userId) };
    return this.addressService.updateOne(addressId, meId, body);
  }

  @Delete(':userId/:id')
  @ApiOperation({ summary: 'Delete company address' })
  @ApiResponse({ description: 'Company Address Successfully Deleted.' })
  async deleteOne(
    @Param('userId') userId: number,
    @Param('id') id: number,
    @Request() req,
  ): Promise<SuccessMessageDTO> {
    const addressId = { id: Number(id) };
    const meId = { id: Number(userId) };
    return this.addressService.deleteOne(addressId, meId);
  }
}
