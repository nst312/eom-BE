import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { invitations } from '@prisma/client';
import { Type } from 'class-transformer';

export class InvitationsDTO {
  @ApiProperty()
  count: number;

  @ApiProperty()
  @IsArray()
  data: invitations[];
}

export class BulkCsvInvitationDTO {
  @ApiProperty({ type: 'string', format: 'binary', required: true })
  path: Express.Multer.File;
}

export class UserInvitationDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class PasswordDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  @Matches(
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$^!%*?&])([a-zA-Z0-9@#$^!%*?&]{7,})$/,
    {
      message:
        'Should have at least 1 Lowercase, 1 Uppercase, 1 Number and 1 Symbol from (! @ # $ % ^ & *)',
    },
  )
  password: string;
}

export class MultipleInvitationDTO {
  @ApiProperty({ isArray: true, type: UserInvitationDTO })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserInvitationDTO)
  invitations: UserInvitationDTO[];
}

export class ResendInvitationDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
