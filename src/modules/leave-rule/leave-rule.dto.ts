import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { leave_rules } from '@prisma/client';
import { CreateUserExpenseDTO } from '../expense/expense.dto';
import { Type } from 'class-transformer';
import { UserInvitationDTO } from '../invitations/invitations.dto';

export class GetLeaveRuleDto {
  @ApiProperty()
  count: number;

  @ApiProperty()
  @IsArray()
  data: leave_rules[];
}

export class createLeaveRuleDto {
  @ApiProperty()
  // @IsNotEmpty()
  // @IsString()
  name: string;

  @ApiProperty()
  // @IsString()
  description: string;

  @ApiProperty()
  // @IsNotEmpty()
  maxLeavesAllowedInMonth: number;

  @ApiProperty()
  // @IsNotEmpty()
  continuousLeavesAllowed: number;

  @ApiProperty()
  // @IsNotEmpty()
  leavesAllowedInYear: number;

  @ApiProperty()
  // @IsNotEmpty()
  // @IsBoolean()
  negativeLeavesAllowed: boolean;

  @ApiProperty()
  // @IsNotEmpty()
  // @IsBoolean()
  weekendsBetweenLeave: boolean;

  @ApiProperty()
  // @IsNotEmpty()
  // @IsBoolean()
  holidaysBetweenLeave: boolean;

  @ApiProperty()
  // @IsNotEmpty()
  // @IsBoolean()
  allowedUnderProbation: boolean;

  @ApiProperty()
  // @IsNotEmpty()
  // @IsBoolean()
  carryForwardEnabled: boolean;
}
export class UpdateLeaveRuleDto extends PartialType(createLeaveRuleDto) {}

export class assignLeaveRuleDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  employeeId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  leave_rulesId: number;
}

export class SuccessMessageDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  message: string;
}

export class MultipleLeaveAddDTO {
  @ApiProperty({ isArray: true, type: createLeaveRuleDto })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => createLeaveRuleDto)
  leaveRules: createLeaveRuleDto[];
}
