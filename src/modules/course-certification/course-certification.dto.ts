import { ApiProperty, PartialType } from '@nestjs/swagger';
import { course, Course_Type, document } from '@prisma/client';
import { IsArray, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class EmployeeCourseDTO {
  @ApiProperty()
  count: number;

  @ApiProperty()
  @IsArray()
  data: course[];
}
export class createCourseDto {
  @ApiProperty({ enum: Course_Type })
  @IsNotEmpty()
  @IsEnum(Course_Type)
  type: Course_Type;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  path: Express.Multer.File;
}

export class updateCourseDto extends PartialType(createCourseDto) {}
