  import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { BankDetailsService } from './bankDetails.service';
import { bank_details, employees, Role } from '@prisma/client';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BankDetailsDto, UpdateBankDetailsDTO } from './bankDetails.dto';
import { ApiOkResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { PERMISSION } from '../../shared/constants/permission.constants';

@Controller('bank-details')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Bank Detail')
export class BankDetailsController {
  constructor(private bankDetailsService: BankDetailsService) {}

  // Add Bank Details
  @SetMetadata('permission', PERMISSION.CAN_BANK_ADD)
  @Post('add/:employeeId')
  @ApiOperation({ summary: 'Add_Bank_Details' })
  @ApiBody({ type: BankDetailsDto })
  @ApiOkResponse({ type: BankDetailsDto })
  async addBank(
    @Param('employeeId') employeeId: number,
    @Body() body: BankDetailsDto,
  ): Promise<bank_details> {
    return this.bankDetailsService.addBankDetails(Number(employeeId), body);
  }

  @Put('update/:id')
  @SetMetadata('permission', PERMISSION.CAN_BANK_ADD)
  @ApiOperation({ summary: 'Update Bank Details' })
  @ApiBody({ type: UpdateBankDetailsDTO })
  async updateDepartment(
    @Param('id') id: number,
    @Body() body: UpdateBankDetailsDTO,
  ): Promise<bank_details | UpdateBankDetailsDTO> {
    return this.bankDetailsService.updateBankDetails({ id: Number(id) }, body);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get employee by id' })
  async getEmployee(@Param('id') id: number): Promise<bank_details> {
    return this.bankDetailsService.getBankDetails({ employeeId: Number(id) });
  }
}
