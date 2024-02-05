import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PermissionService } from './permission.service';
import { PERMISSION } from '../../shared/constants/permission.constants';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { Role, role_permission } from '@prisma/client';
import { PermissionDTO, UpdatePermissionDTO } from './permission.dto';
import { SuccessMessageDTO } from '../posts/post.dto';

@ApiTags('Permission')
@Controller('permission')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @Get('/:role')
  @SetMetadata('permission', [PERMISSION.CAN_PERMISSION_LIST])
  @ApiOperation({ summary: 'Get All Permission' })
  findPermission(@Param('role') role: Role): Promise<PermissionDTO> {
    return this.permissionService.findPermission(role);
  }

  @Put('/:role')
  @SetMetadata('permission', [PERMISSION.CAN_PERMISSION_LIST])
  @ApiOperation({ summary: 'Update Multiple Permission' })
  @ApiBody({ type: [UpdatePermissionDTO] })
  updatePermission(
    @Body() body: UpdatePermissionDTO[],
    @Param('role') role: Role,
  ): Promise<SuccessMessageDTO> {
    return this.permissionService.updatePermission(role, body);
  }
}
