import {
  Body,
  Controller,
  SetMetadata,
  UseGuards,
  Request,
  Get,
  Query,
  Param,
  Put,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { ApiOkResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { EmployeeDTO, UpdateEmployeeDTO } from './employees.dto';
import { employees, Role } from '@prisma/client';
import { PERMISSION } from '../../shared/constants/permission.constants';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Employee')
@Controller('employees')
export class EmployeesController {
  constructor(private employeeService: EmployeesService) {}

  // Get All Company Employee
  @Get()
  @SetMetadata('permission', [PERMISSION.CAN_EMPLOYEE_LIST])
  @ApiOperation({ summary: 'Get all employees (Admin Only)' })
  @ApiQuery({ type: 'search', required: false })
  @ApiOkResponse({ type: EmployeeDTO })
  async getEmployees(
    @Query('search') search: string,
    @Query('page') page = 1,
    @Query('perPage') perPage = 20,
    @Request() req,
  ): Promise<EmployeeDTO> {
    return this.employeeService.getEmployees(
      search,
      Number(page),
      Number(perPage),
      req.user,
    );
  }

  // Get Employee by Id
  @Get(':id')
  @ApiOperation({ summary: 'Get employee by id' })
  async getEmployee(
    @Param('id') id: number,
    @Request() req,
  ): Promise<employees> {
    return this.employeeService.getEmployee({ id: Number(id) }, req.user);
  }

  // Delete Employee
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @SetMetadata('permission', [PERMISSION.CAN_EMPLOYEE_DELETE])
  @Put('delete')
  @ApiOperation({
    summary: 'Delete Id Based Companies Employee',
  })
  async deleteEmployeeDetails(@Body() body: [number]): Promise<any> {
    return this.employeeService.deleteEmployee(body);
  }

  // Update Employee by Id
  @Put(':id')
  @SetMetadata('permission', [PERMISSION.CAN_EMPLOYEE_UPDATE])
  @ApiOperation({ summary: 'Update employees by id' })
  @ApiBody({ type: UpdateEmployeeDTO })
  async updateEmployee(
    @Param('id') id: number,
    @Request() req,
    @Body() body: UpdateEmployeeDTO,
  ): Promise<employees> {
    return this.employeeService.updateEmployee({ id: Number(id) }, req.user, {
      users: {
        update: {
          firstName: body.firstName,
          lastName: body.lastName,
          middleName: body.middleName,
        },
      },
      personal_email: body.personal_email,
      phone: body.phone,
      phone2: body.phone2,
      birth_date: body.birth_date,
      joining_date: body.joining_date,
      employee_code: body.employee_code,
      empType: body.empType,
      jobPosition: {
        connect: {
          id: body.jobPositionId,
        },
      },
    });
  }
}
