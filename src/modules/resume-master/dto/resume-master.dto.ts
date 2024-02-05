import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  PersonalDetailsDTO,
  UpdatePersonalDetailsDTO,
} from './personal-details.dto';
import { ProfileDTO } from './profile.dto';
import { EducationDTO } from './education.dto';
import { EmploymentDTO } from './employment.dto';
import { SkillDTO, LanguageDTO, HobbyDTO, CertificateDTO } from './skill.dto';
import { resumes } from '@prisma/client';

export class ResumesDTO {
  @ApiProperty()
  count: number;

  @ApiProperty()
  @IsArray()
  data: resumes[];
}

export class CreateResumeDTO {
  @ApiProperty()
  @IsNumber()
  themeCode: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  themeImage: string;

  @ApiProperty()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => PersonalDetailsDTO)
  personalDetails: PersonalDetailsDTO;

  @ApiProperty()
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => ProfileDTO)
  profiles: ProfileDTO;

  @ApiProperty({ type: () => [EducationDTO] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EducationDTO)
  educations: EducationDTO[];

  @ApiProperty({ type: () => [EmploymentDTO] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EmploymentDTO)
  employments: EmploymentDTO[];

  @ApiProperty({ type: () => [SkillDTO] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SkillDTO)
  skills: SkillDTO[];

  @ApiProperty({ type: () => [LanguageDTO] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LanguageDTO)
  languages: LanguageDTO[];

  @ApiProperty({ type: () => [HobbyDTO] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HobbyDTO)
  hobbies: HobbyDTO[];

  @ApiProperty({ type: () => [CertificateDTO] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CertificateDTO)
  certificates: CertificateDTO[];
}

export class UpdateResumeDTO {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  themeCode: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  themeImage: string;

  @ApiProperty()
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => UpdatePersonalDetailsDTO)
  personalDetails: UpdatePersonalDetailsDTO;

  @ApiProperty()
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => ProfileDTO)
  profiles: ProfileDTO;

  @ApiProperty({ type: () => [EducationDTO] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EducationDTO)
  educations: EducationDTO[];

  @ApiProperty({ type: () => [EmploymentDTO] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EmploymentDTO)
  employments: EmploymentDTO[];

  @ApiProperty({ type: () => [SkillDTO] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SkillDTO)
  skills: SkillDTO[];

  @ApiProperty({ type: () => [LanguageDTO] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LanguageDTO)
  languages: LanguageDTO[];

  @ApiProperty({ type: () => [HobbyDTO] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HobbyDTO)
  hobbies: HobbyDTO[];

  @ApiProperty({ type: () => [CertificateDTO] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CertificateDTO)
  certificates: CertificateDTO[];
}
