import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  SetMetadata,
  UseGuards,
  Req,
  Query,
  Request,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UpdateUserDTO, UserDTO, UsersDTO } from './user.dto';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { ApiOkResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { UpdatePasswordDTO } from '../auth/auth.dto';
import { SuccessMessageDTO } from '../posts/post.dto';
import { Role, users } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { saveImageToLogoStorage } from '../companies/config';
import { RoleService } from './role.service';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';
import { PERMISSION } from '../../shared/constants/permission.constants';

@ApiBearerAuth()
@ApiTags('User')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private roleService: RoleService,
  ) {}

  // get all employee users
  @Get('dashboard')
  @ApiOperation({ summary: 'Get All Employee User List' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getEmployeeUsers(@Request() req): Promise<users[]> {
    return this.userService.getEmployeeUsers(req.user);
  }

  @Get('profile')
  @ApiOperation({ summary: 'Get User Details' })
  @ApiOkResponse({ type: UserDTO, description: 'UserObject' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getUserProfile(@Req() req): Promise<UserDTO> {
    return this.userService.findById({ id: Number(req.user.id) });
  }

  // get all users
  @Get()
  @SetMetadata('permission', [PERMISSION.CAN_USER_LIST])
  @ApiOperation({ summary: 'Get All User List (Admin Only)' })
  @ApiOkResponse({ type: UsersDTO, description: 'User Response' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getUsers(
    @Query('page') page = 1,
    @Query('perPage') perPage = 20,
    @Req() req,
  ): Promise<UsersDTO> {
    return this.userService.getAllUsers(
      Number(page),
      Number(perPage),
      req.user,
    );
  }

  // Delete User
  @ApiBearerAuth()
  @SetMetadata('permission', [PERMISSION.CAN_USER_DELETE])
  @Put('delete')
  @ApiOperation({
    summary: 'Delete Id Based User Id',
  })
  async deleteUser(@Body() body: [number]): Promise<any> {
    return this.userService.deleteUser(body);
  }

  @Get('role')
  @SetMetadata('permission', [PERMISSION.CAN_USER_LIST_ROLE])
  @ApiImplicitQuery({
    name: 'role',
    required: false,
    type: String,
    enum: Role,
  })
  @ApiOperation({ summary: 'Find Users Without Admin' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getUserWithoutAdmin(
    @Query('role') role: Role,
    @Req() req,
  ): Promise<users[]> {
    const isRole = role ? role : { notIn: [Role.SUPER_ADMIN, Role.CEO] };
    return this.roleService.getUserWithoutAdmin(isRole, req.user);
  }

  // get user by id
  @Get(':id')
  @ApiOperation({ summary: 'Get Id By User' })
  @ApiOkResponse({ type: UserDTO, description: 'UserObject' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getUser(@Param('id') id: number): Promise<UserDTO> {
    return this.userService.findById({ id: Number(id) });
  }

  @Put('profile')
  @ApiOperation({ summary: 'Update User Profile' })
  @ApiOkResponse({ type: UserDTO, description: 'UpdateUserObject' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBody({ type: UpdateUserDTO })
  @UseInterceptors(FileInterceptor('avatar_url', saveImageToLogoStorage))
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async updateUserProfile(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Req() req,
    @Body() userData: UpdateUserDTO,
  ): Promise<UserDTO> {
    return this.userService.updateUser(
      { id: Number(req.user.id) },
      file?.filename,
      userData,
    );
  }

  @Put('change-password')
  @ApiOperation({ summary: 'Change Password' })
  @ApiOkResponse({ description: 'Password successfully updated.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  passwordChanged(
    @Req() req,
    @Body() newPasswordBody: UpdatePasswordDTO,
  ): Promise<SuccessMessageDTO> {
    return this.userService.updatePassword(
      { id: Number(req.user.id) },
      newPasswordBody,
    );
  }

  @Put('role/:userId')
  @ApiImplicitQuery({
    name: 'role',
    required: true,
    type: String,
    enum: Role,
  })
  @ApiOperation({ summary: 'Update User Role' })
  @SetMetadata('permission', [PERMISSION.CAN_USER_UPDATE_ROLE])
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  assignRole(
    @Param('userId') userId: number,
    @Query('role') role: Role,
  ): Promise<SuccessMessageDTO> {
    return this.roleService.assignRole(userId, role);
  }
}
