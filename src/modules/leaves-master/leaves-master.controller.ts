import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { LeavesMasterService } from './leaves-master.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { leave_history, leaves, Role } from '@prisma/client';
import {
  CreateLeave,
  LeaveRequestDTO,
  LeavesDTO,
  UpdateLeave,
  UpdateLeaveReason,
  EmployeeLeavesDTO,
} from './leaves-master.dto';
import { ApiOkResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';
import { SuccessMessageDTO } from '../posts/post.dto';
import { PERMISSION } from '../../shared/constants/permission.constants';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Leave')
@Controller('leaves-master')
export class LeavesMasterController {
  constructor(private leaveService: LeavesMasterService) {}

  // Employee Create Leave
  @Post()
  @ApiOperation({ summary: 'Create Employee Leave' })
  @ApiBody({ type: CreateLeave })
  async createLeave(
    @Body() body: CreateLeave,
    @Request() req,
  ): Promise<leaves> {
    const data = await this.leaveService.createLeave(body, req.user);
    if (data) {
      const sendmail = await this.leaveService.mailForAdmin(data);
    }
    return data;
  }

  //Get Current Employee Leave List
  @Get('/current')
  @ApiImplicitQuery({
    name: 'query',
    required: false,
    type: String,
  })
  @ApiOperation({ summary: 'Get Current Employee Leave List' })
  // @ApiOkResponse({ type: LeavesDTO, description: 'Get All Leaves Response' })
  async getEmpLeaveList(
    @Request() req,
    // @Query('query') query = undefined,
  ): Promise<leaves[]> {
    // const q = query && query.toUpperCase();
    return this.leaveService.getEmpLeaveList(req.user);
  }

  //Add dynamic leave
  @Post('add/:employeeId')
  @ApiOperation({ summary: 'Create Dynamic Leaves' })
  @ApiBody({ type: EmployeeLeavesDTO })
  @ApiOkResponse({ type: EmployeeLeavesDTO })
  async createEmployeeLeave(
    @Param('employeeId') employee_id: number,
    @Body() body: EmployeeLeavesDTO,
  ): Promise<EmployeeLeavesDTO> {
    console.log('employee_id', employee_id);
    return this.leaveService.createEmployeeLeave(
      { id: Number(employee_id) },
      body,
    );
  }

  //Get dynamic leave
  @Get(':employeeId')
  @ApiOperation({ summary: 'Get employee by id' })
  async getDynamicLeave(
    @Param('employeeId') employee_id: number,
    @Request() req,
  ): Promise<EmployeeLeavesDTO> {
    console.log('employee_id', employee_id);
    return this.leaveService.getDynamicLeave({
      employeeId: Number(employee_id),
    });
  }

  //Update dynamic leave

  @Put('update/:id')
  @ApiOperation({ summary: 'Update Dynamic Leave' })
  @ApiBody({ type: EmployeeLeavesDTO })
  async updateDynamicLeave(
    @Param('id') id: number,
    @Body() body: EmployeeLeavesDTO,
  ): Promise<EmployeeLeavesDTO> {
    return this.leaveService.updateDynamicLeave({ id: Number(id) }, body);
  }

  // Employee Get By Id Leave
  @Get(':id')
  @ApiOperation({ summary: 'Get Single Employee Leave' })
  async getLeave(
    @Request() req,
    @Param('id') leaveId: number,
  ): Promise<leaves> {
    return this.leaveService.getByIdLeave({ id: Number(leaveId) });
  }

  //request leave mail
  @Post(':id/request')
  @ApiOperation({ summary: 'Request employee leave' })
  @SetMetadata('permission', [PERMISSION.CAN_LEAVE_REQUEST_MAIL])
  @ApiBody({ type: LeaveRequestDTO })
  async requestLeave(
    @Param('id') leaveId: number,
    @Body() body,
  ): Promise<SuccessMessageDTO> {
    return this.leaveService.requestLeave(body, { id: Number(leaveId) });
  }

  // Employee Update Leave
  @Put(':id')
  @ApiOperation({ summary: 'Update Employee Leave' })
  @ApiBody({ type: UpdateLeave })
  async updateLeave(
    @Param('id') leaveId: number,
    @Body() body: UpdateLeave,
    @Request() req,
  ): Promise<leaves> {
    return this.leaveService.updateLeave(
      body,
      { id: Number(leaveId) },
      req.user,
    );
  }

  // Employee Update Leave
  @Get()
  @SetMetadata('permission', [PERMISSION.CAN_LEAVE_UPDATE])
  @ApiOperation({ summary: 'Get All Employee Leave (Admin Only)' })
  @ApiOkResponse({ type: LeavesDTO, description: 'Get All Leaves Response' })
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
  async getAllLeave(
    @Query('query') query: string,
    @Query('page') page = 1,
    @Query('perPage') perPage = 20,
    @Request() req,
  ): Promise<LeavesDTO> {
    return this.leaveService.getAllLeave(
      query,
      Number(page),
      Number(perPage),
      req.user,
    );
  }

  // Employee Approved Leave
  @Put(':id/approved')
  @ApiOperation({ summary: 'Leave Approved (Admin Only)' })
  @ApiBody({ type: UpdateLeaveReason })
  async approvedLeave(
    @Param('id') leaveId: number,
    @Body('reason') reason: UpdateLeaveReason,
    @Request() req,
  ): Promise<leaves> {
    const approved = 'APPROVED';
    return this.leaveService.changeLeaveStatus(
      { id: Number(leaveId) },
      approved,
      reason,
      req.user,
    );
  }

  // Employee Approved Leave
  @Put(':id/reject')
  @ApiOperation({ summary: 'Leave Reject (Admin Only)' })
  @ApiBody({ type: UpdateLeaveReason })
  async rejectLeave(
    @Param('id') leaveId: number,
    @Body('reason') reason: UpdateLeaveReason,
    @Request() req,
  ): Promise<leaves> {
    const reject = 'REJECT';
    return this.leaveService.changeLeaveStatus(
      { id: Number(leaveId) },
      reject,
      reason,
      req.user,
    );
  }

  //Delete Employee Leave
  @Delete(':id')
  @ApiOperation({ summary: 'Delete Leave' })
  @ApiOkResponse({ type: 'Delete Leave successfully Deleted' })
  async deleteLeave(
    @Param('id') id: number,
    @Request() req,
  ): Promise<leaves | LeavesDTO> {
    return this.leaveService.deleteLeave({ id: Number(id) }, req.user);
  }

  //Get All Leaves History
  @Get(':id/history')
  @SetMetadata('permission', [PERMISSION.CAN_LEAVE_LIST])
  @ApiOperation({ summary: 'Get All Employee Leave History' })
  async getLeaveHistory(@Param('id') id: number): Promise<leave_history[]> {
    return this.leaveService.getLeaveHistory({ leaveId: Number(id) });
  }
}
