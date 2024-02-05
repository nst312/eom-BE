import {
  Body,
  Controller,
  Param,
  Post,
  Request,
  UseGuards,
  Get,
  SetMetadata,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';
import { ApiOkResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { Role, salaries, users, salary_history } from '@prisma/client';
import { SuccessMessageDTO } from '../posts/post.dto';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import {
  CreateSalaryDTO,
  SalaryDTO,
  SalaryHistoryDTO,
  SalarySlipDTO,
} from './salary.dto';
import { SalaryService } from './salary.service';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';
import { PERMISSION } from '../../shared/constants/permission.constants';

@ApiBearerAuth()
@ApiTags('Employee Salary')
@Controller('salaries')
export class SalaryController {
  constructor(private salaryService: SalaryService) {}

  @Get()
  @SetMetadata('permission', PERMISSION.CAN_SALARY_LIST)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all salaries list' })
  @ApiOkResponse({ type: SalaryDTO })
  async getEmployees(
    @Query('page') page = 1,
    @Query('perPage') perPage = 20,
    @Request() req,
  ): Promise<SalaryDTO> {
    return this.salaryService.getSalary(
      Number(page),
      Number(perPage),
      req.user,
    );
  }

  @Post('sendSalarySlip/:userId/:salaryId')
  @UseGuards(JwtAuthGuard)
  @SetMetadata('permission', PERMISSION.CAN_SALARY_SEND)
  @ApiOperation({
    description: 'Send salary slip.',
  })
  async sendSalarySlip(
    @Param('userId') user_id: number,
    @Param('salaryId') salaryId: number,
    @Request() req,
  ): Promise<SuccessMessageDTO> {
    return this.salaryService.sendSalarySlip(salaryId, req);
  }

  @Get('companyLogo/:fileName')
  getImageUrl(@Param('fileName') fileName: string, @Res() res) {
    return res.sendFile(fileName, { root: './templates/companyLogo' });
  }

  //Download Salary Certificate
  @Get(':employeeId/download/:salaryId')
  @UseGuards(JwtAuthGuard)
  @SetMetadata('permission', PERMISSION.CAN_SALARY_DOWNLOAD)
  @ApiOperation({ summary: 'Download Pdf' })
  @ApiOperation({
    description: 'Send salary slip.',
  })
  async downloadSalarySlip(
    @Param('employeeId') employee_id: number,
    @Param('salaryId') salaryId: number,
    @Request() req,
  ): Promise<{ pdf: string }> {
    return this.salaryService.downloadSalarySlip(salaryId, req);
  }

  @Get(':employeeId')
  @UseGuards(JwtAuthGuard)
  @SetMetadata('permission', PERMISSION.CAN_SALARY)
  @ApiOperation({ summary: 'Get salaries list by employee id' })
  @ApiOkResponse({ type: SalaryDTO })
  async getSalaryById(
    @Param('employeeId') employee_id: number,
    @Query('page') page = 1,
    @Query('perPage') perPage = 20,
    @Request() req,
  ): Promise<SalaryDTO> {
    return this.salaryService.getSalaryById(
      { id: Number(employee_id) },
      Number(page),
      Number(perPage),
      req.user,
    );
  }

  // Get All Salary History
  @Get('getSalaryHistory/:employeeId')
  @UseGuards(JwtAuthGuard)
  @SetMetadata('permission', PERMISSION.CAN_SALARY_HISTORY)
  @ApiOperation({ summary: 'Get all salaries history' })
  @ApiImplicitQuery({
    name: 'search',
    required: false,
    type: String,
  })
  @ApiImplicitQuery({
    name: 'page',
    required: false,
    type: Number,
  })
  @ApiImplicitQuery({
    name: 'perPage',
    required: false,
    type: Number,
  })
  async getSalaryHistory(
    @Param('employeeId') employee_id: number,
    @Query('search') search: string,
    @Query('page') page = 1,
    @Query('perPage') perPage = 20,
    @Request() req,
  ): Promise<SalaryHistoryDTO> {
    return this.salaryService.getSalaryHistory(
      Number(employee_id),
      search,
      Number(page),
      Number(perPage),
      req.user,
      req,
    );
  }

  //Download Salary History
  @Get('download/:historyId')
  @UseGuards(JwtAuthGuard)
  @SetMetadata('permission', PERMISSION.CAN_SALARY_HISTORY_DOWNLOAD)
  @ApiOperation({ summary: 'Download Salary History' })
  @ApiOperation({
    description: 'Send salary slip.',
  })
  async downloadSalaryHistory(
    @Param('historyId') historyId: number,
    @Request() req,
  ): Promise<{ pdf: string }> {
    console.log('historyId', historyId);
    return this.salaryService.downloadSalaryHistory(historyId, req);
  }

  @Post(':employeeId')
  @UseGuards(JwtAuthGuard)
  @SetMetadata('permission', PERMISSION.CAN_SALARY_ADD)
  @ApiOperation({ summary: 'Add salary details' })
  @ApiBody({ type: CreateSalaryDTO })
  @ApiOkResponse({ type: CreateSalaryDTO })
  async createSalary(
    @Param('employeeId') employee_id: number,
    @Request() req,
    @Body() salaries: salaries,
  ): Promise<salaries> {
    return this.salaryService.createSalary(
      { id: Number(employee_id) },
      salaries,
      req.user,
    );
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update salary details' })
  @SetMetadata('permission', PERMISSION.CAN_SALARY_UPDATE)
  @ApiBody({ type: CreateSalaryDTO })
  @ApiOkResponse({ type: CreateSalaryDTO })
  async updateSalaryDetails(
    @Param('id') id: number,
    @Request() req,
    @Body() salaries: salaries,
  ): Promise<SuccessMessageDTO> {
    return this.salaryService.updateSalaryDetails(
      { id: Number(id) },
      salaries,
      req.user,
    );
  }
}
