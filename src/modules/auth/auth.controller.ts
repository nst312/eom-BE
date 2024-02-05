import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Param,
  Put,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBody,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  AuthResponseDTO,
  LoginUserDTO,
  RegisterUserDTO,
  ForgotPasswordDTO,
  UpdatePasswordDTO,
} from './auth.dto';
import { SuccessMessageDTO } from '../posts/post.dto';
import { JwtAuthGuard } from './auth.jwt.guard';
import { ApiOkResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { users } from '@prisma/client';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register user (Admin Only)' })
  @ApiBody({ type: RegisterUserDTO })
  @ApiOkResponse({ type: AuthResponseDTO })
  register(@Body() userData: RegisterUserDTO): Promise<AuthResponseDTO> {
    return this.authService.register(userData);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiBody({ type: LoginUserDTO })
  @ApiOkResponse({ type: AuthResponseDTO })
  login(@Body() userData: LoginUserDTO): Promise<AuthResponseDTO> {
    return this.authService.login(userData);
  }

  @UseGuards(JwtAuthGuard)
  @Get('refresh')
  @ApiOperation({ summary: 'Validate Token' })
  @ApiOkResponse({ type: AuthResponseDTO })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  validateToken(@Request() req): Promise<AuthResponseDTO> {
    const user = req.user;
    return this.authService.validateToken(user['id']);
  }

  @Post('forgotpassword')
  @ApiOperation({
    summary: 'Forgot your password.',
  })
  @ApiBody({ type: ForgotPasswordDTO })
  async forgotPassword(
    @Body() body: ForgotPasswordDTO,
  ): Promise<ForgotPasswordDTO> {
    return this.authService.forgotPassword(body);
  }

  @Get('validate/forgotpassword/:token')
  @ApiOperation({ summary: 'Validate token.' })
  async validateForgotPasswordToken(
    @Param('token') token: string,
  ): Promise<SuccessMessageDTO | users> {
    return this.authService.validateForgotPasswordToken({ token: token });
  }

  @Put('update/password/:token')
  @ApiOperation({ summary: 'Update your Password.' })
  @ApiBody({ type: UpdatePasswordDTO })
  async updateUserPassword(
    @Param('token') token: string,
    @Body() body: UpdatePasswordDTO,
  ): Promise<users | SuccessMessageDTO> {
    return this.authService.updateUserPassword({ token }, body);
  }
}
