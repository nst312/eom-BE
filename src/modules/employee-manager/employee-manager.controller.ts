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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { EmployeesManagerService } from './employee-manager.service';
import {
  allEmpManagerDto,
  createEmpManagerDto,
  updateEmpManagerDto,
} from './employee-manager.dto';
import { PERMISSION } from '../../shared/constants/permission.constants';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('employeeManager')
@Controller('employeeManager')
export class EmployeeManagerController {
  constructor(private employeeManagerService: EmployeesManagerService) {}

  @Post('')
  @ApiOperation({ summary: 'Create manager of employee' })
  @SetMetadata('permission', [PERMISSION.CAN_EMPLOYEE_MANAGER_ADD])
  async creatEmpManager(
    @Body() body: createEmpManagerDto,
    @Request() req,
  ): Promise<createEmpManagerDto> {
    return this.employeeManagerService.createEmpManager(body, req.user);
  }

  @Get('')
  @ApiOperation({ summary: 'Get All manager of employee by company' })
  @SetMetadata('permission', [PERMISSION.CAN_EMPLOYEE_MANAGER_BY_COMPANY_LIST])
  getAllEmpManager(@Request() req): Promise<allEmpManagerDto> {
    const empId = req.user.employeeId;
    return this.employeeManagerService.getAllEmpManager(req.user);
  }

  @Get('employee/:empId')
  @ApiOperation({ summary: 'Get manager of employee by id' })
  @SetMetadata('permission', [PERMISSION.CAN_MANAGER_OF_EMPLOYEE_LIST])
  getEmpManager(@Request() req, @Param('empId') empId: number) {
    return this.employeeManagerService.getEmpManager(req.user, empId);
  }

  @Get('manager/:manId')
  @ApiOperation({ summary: 'Get employees of manager  by id' })
  @SetMetadata('permission', [PERMISSION.CAN_EMPLOYEES_OF_MANAGER_LIST])
  getEmployeeOfManager(@Request() req, @Param('manId') manId: number) {
    return this.employeeManagerService.getEmployeeOfManager(req.user, manId);
  }

  @Put('update/:id')
  @ApiOperation({ summary: 'update  empManager   id' })
  @SetMetadata('permission', [PERMISSION.CAN_EMPLOYEE_MANAGER_UPDATE])
  updateEmpManager(
    @Param('id') id: number,
    @Body() body: updateEmpManagerDto,
  ): Promise<any> {
    return this.employeeManagerService.updateEmpManager(id, body);
  }
}
