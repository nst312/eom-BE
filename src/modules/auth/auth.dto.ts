import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { INVALID_EMAIL } from '../../shared/constants/strings';
import { ApiProperty } from '@nestjs/swagger';
import { UserJWTDTO } from '../user/user.dto';

export class AuthResponseDTO {
  @ApiProperty()
  @IsObject()
  user: UserJWTDTO;

  @IsArray()
  permissions: string[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  accessToken: string;
}

export class RegisterUserDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  displayName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  company_name: string;

  @IsEmail()
  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
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

export class LoginUserDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail({}, { message: INVALID_EMAIL })
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UpdatePasswordDTO {
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

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}

export class ForgotPasswordDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
