import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray, IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class AttendanceShiftDto {
  @ApiProperty()
  // @IsString()
  ruleName: string;

  @ApiProperty()
  // @IsString()
  Description: string;

  @ApiProperty()
  @IsDateString()
  shiftInTime: Date;

  @ApiProperty()
  @IsDateString()
  shiftOutTime: Date;

  @ApiProperty()
  durationCount: number;

  @ApiProperty()
  fullDayWorkDuration: number;

  @ApiProperty()
  halfDayWorkDuration: number;

  @ApiProperty()
  totalBreakDuration: number;

  @ApiProperty()
  noOfBreaks: number;

  @ApiProperty()
  isDefault: boolean;
}

export class assignAttendanceRulesDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  employee_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  attendance_id: number;
}

export class SuccessMessageDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  message: string;
}

export class UpdateAttendanceShiftDTO extends PartialType(AttendanceShiftDto) {}
