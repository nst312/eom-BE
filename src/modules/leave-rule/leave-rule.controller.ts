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
import { LeaveRuleService } from './leave-rule.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { leave_rules } from '@prisma/client';
import {
  assignLeaveRuleDTO,
  createLeaveRuleDto,
  GetLeaveRuleDto,
  MultipleLeaveAddDTO,
  UpdateLeaveRuleDto,
} from './leave-rule.dto';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { SuccessMessageDTO } from '../posts/post.dto';
import { PERMISSION } from '../../shared/constants/permission.constants';
import { EmployeesService } from '../employees/employees.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Leave-rule')
@Controller('leave-rule')
export class LeaveRuleController {
  constructor(
    private leaveRuleService: LeaveRuleService,
    private employeeService: EmployeesService,
  ) {}

  @Post('')
  @ApiOperation({ summary: 'Create Company Leave_rule' })
  @SetMetadata('permission', [PERMISSION.CAN_LEAVE_RULE_ADD])
  async createLeaveRule(
    @Body() body: createLeaveRuleDto,
    @Request() req,
  ): Promise<leave_rules> {
    return this.leaveRuleService.createLeaveRule(body, req.user);
  }

  @Get('')
  @ApiOperation({ summary: 'view all Leave_rule' })
  async getAllLeaveRule(@Req() req): Promise<GetLeaveRuleDto> {
    return await this.leaveRuleService.getAllLeaveRule(req.user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'view Leave_rule by id' })
  async getExpenseById(
    @Param('id') id: number,
    @Req() req,
  ): Promise<leave_rules> {
    return await this.leaveRuleService.getLeave_ruleById(id, req.user);
  }

  @Put('update/:id')
  @ApiOperation({ summary: 'Update Leave_rule' })
  @SetMetadata('permission', [PERMISSION.CAN_LEAVE_RULE_UPDATE])
  async updateLeave_rule(
    @Param('id') id: number,
    @Body() body: UpdateLeaveRuleDto,
    @Req() req,
  ): Promise<leave_rules> {
    return await this.leaveRuleService.updateLeave_rule(id, body, req.user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete Leave_rule' })
  @SetMetadata('permission', [PERMISSION.CAN_LEAVE_RULE_DELETE])
  async deleteLeave_rule(
    @Param('id', ParseIntPipe) id: number,
    @Req() req,
  ): Promise<SuccessMessageDTO> {
    return await this.leaveRuleService.deleteLeave_rule(id, req.user);
  }

  //get employee by company id
  @Get('company/:id')
  @ApiOperation({ summary: 'Get employee by companyId' })
  @SetMetadata('permission', [PERMISSION.CAN_EMPLOYEE_BY_COMPANY_LIST])
  async getCompanyEmployee(
    @Param('id') id: number,
    @Request() req,
  ): Promise<any> {
    return this.leaveRuleService.getCompanyEmployee(id, req.user);
  }

  @Post('assignLeaveRule')
  @ApiOperation({ summary: 'assignLeaveRule' })
  @SetMetadata('permission', [PERMISSION.CAN_ASSIGN_LEAVE_RULE])
  async assignLeaveRule(
    @Body() body: assignLeaveRuleDTO,
    @Request() req,
  ): Promise<SuccessMessageDTO> {
    return this.leaveRuleService.assignLeaveRule(body, req.user);
  }

  @Get('assignLeaveRule/:empId')
  @ApiOperation({ summary: 'view assign  leaveRule' })
  async getAssignLeaveRule(@Req() req, @Param('empId') empId: number) {
    return await this.leaveRuleService.getAssignLeaveRule(req.user, empId);
  }

  @Post('multipleLeave')
  @ApiOperation({ summary: 'add multiple LeaveRule' })
  async multipleLeave(
    @Request() req,
    @Body() body: MultipleLeaveAddDTO,
  ): Promise<leave_rules[]> {
    const data = body.leaveRules;
    return this.leaveRuleService.multipleLeave(data, req.user);
  }

  @Delete('assignLeaveRule/delete')
  @ApiOperation({ summary: 'remove assigned LeaveRule' })
  @SetMetadata('permission', [PERMISSION.CAN_ASSIGN_LEAVE_RULE_DELETE])
  async removeAssignLeaveRule(
    @Request() req,
    @Query('empId') empId: number,
    @Query('leaveRuleId') leaveRuleId: number,
  ): Promise<SuccessMessageDTO> {
    return this.leaveRuleService.removeAssignLeaveRule(
      req.user,
      empId,
      leaveRuleId,
    );
  }
}
