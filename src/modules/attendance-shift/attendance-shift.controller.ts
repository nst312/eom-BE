import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  Request,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { AttendanceShiftService } from './attendance-shift.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import {
  assignAttendanceRulesDto,
  AttendanceShiftDto,
  UpdateAttendanceShiftDTO,
} from './attendance-shift.dto';
import { ApiOkResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { attendance, users } from '@prisma/client';
import { SuccessMessageDTO } from '../posts/post.dto';
import { PERMISSION } from '../../shared/constants/permission.constants';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
// @SetMetadata('permission', [PERMISSION.CAN_COMPANY_ADDRESS])
@ApiTags('Attendance Shift')
@Controller('attendance-shift')
export class AttendanceShiftController {
  constructor(private attendanceShift: AttendanceShiftService) {}

  // @SetMetadata('permission', [PERMISSION.CAN_EXPENSE_CATEGORY_ADD])
  @Post('add/:company_id')
  @ApiOperation({ summary: 'Add Attendance Shift' })
  @ApiOkResponse({ type: AttendanceShiftDto })
  async addAttendanceShift(
    @Param('company_id') company_id: number,
    @Body() body: AttendanceShiftDto,
  ): Promise<attendance> {
    return this.attendanceShift.addAttendanceShift(Number(company_id), body);
  }

  @Get()
  @ApiOperation({ summary: 'Get All Attendance Shift' })
  async getAllAttendanceShift(@Req() req): Promise<attendance[]> {
    return this.attendanceShift.getAllAttendanceShift(req.user);
  }

  //Assign attendance shift rules
  @Post('attendanceLeaveRule')
  @ApiOperation({ summary: 'attendanceLeaveRule' })
  // @SetMetadata('permission', [PERMISSION.CAN_ASSIGN_LEAVE_RULE])
  async assignAttendanceRule(
    @Body() body: assignAttendanceRulesDto,
    @Request() req,
  ): Promise<SuccessMessageDTO> {
    return this.attendanceShift.assignAttendanceRule(body, req.user);
  }

  @Get('assignAttendanceRule/:empId')
  @ApiOperation({ summary: 'view assign  AttendanceRule' })
  async getAssignAttendanceRule(@Req() req, @Param('empId') empId: number) {
    return await this.attendanceShift.getAssignAttendanceRule(req.user, empId);
  }

  @Get('company/:id')
  @ApiOperation({ summary: 'Get employee by companyId' })
  // @SetMetadata('permission', [PERMISSION.CAN_EMPLOYEE_BY_COMPANY_LIST])
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
  async getCompanyEmployee(
    @Query('page') page = 1,
    @Query('perPage') perPage = 10,
    @Param('id') id: number,
    @Request() req,
  ): Promise<any> {
    return this.attendanceShift.getCompanyEmployee(
      Number(page),
      Number(perPage),
      id,
      req.user,
    );
  }

  @Delete('assignAttendanceRule/delete')
  @ApiOperation({ summary: 'remove assigned AttendanceRule' })
  // @SetMetadata('permission', [PERMISSION.CAN_ASSIGN_LEAVE_RULE_DELETE])
  async removeAssignLeaveRule(
    @Request() req,
    @Query('empId') empId: number,
    @Query('attendance_id') attendance_id: number,
  ): Promise<SuccessMessageDTO> {
    return this.attendanceShift.removeAssignAttendanceRule(
      req.user,
      empId,
      attendance_id,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete AttendanceRule' })
  // @SetMetadata('permission', [PERMISSION.CAN_LEAVE_RULE_DELETE])
  async deleteAttendanceRule(
    @Param('id', ParseIntPipe) id: number,
    @Req() req,
  ): Promise<SuccessMessageDTO> {
    return await this.attendanceShift.deleteAttendanceRule(id, req.user);
  }

  // @SetMetadata('permission', [PERMISSION.CAN_EXPENSE_CATEGORY_UPDATE])
  @Put('update/:id')
  @ApiOperation({ summary: 'Update AttendanceRule' })
  @ApiBody({ type: UpdateAttendanceShiftDTO })
  async updateAttendanceRule(
    @Param('id') id: number,
    @Body() body: UpdateAttendanceShiftDTO,
  ): Promise<attendance | UpdateAttendanceShiftDTO> {
    return this.attendanceShift.updateAttendanceRule(Number(id), body);
  }
}
