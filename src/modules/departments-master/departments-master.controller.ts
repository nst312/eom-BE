import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { department_master, Role } from '@prisma/client';
import { DepartmentsMasterService } from './departments-master.service';
import { ApiOkResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import {
  CreateDepartmentDTO,
  UpdateDepartmentDTO,
} from '../companies/departments.dto';
import { SuccessMessageDTO } from '../posts/post.dto';
import { PERMISSION } from '../../shared/constants/permission.constants';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Department')
@Controller('departments')
export class DepartmentsMasterController {
  constructor(private departmentMasterService: DepartmentsMasterService) {}

  //Create Department_Master
  @SetMetadata('permission', [PERMISSION.CAN_DEPARTMENT_ADD])
  @Post()
  @ApiOperation({ summary: 'Create Department_Master' })
  @ApiBody({ type: CreateDepartmentDTO })
  @ApiOkResponse({ type: CreateDepartmentDTO })
  async createDepartment(
    @Body() body: CreateDepartmentDTO,
  ): Promise<department_master> {
    return this.departmentMasterService.createDepartment_Master(body);
  }

  //Get Department_Master
  @Get()
  @ApiOperation({ summary: 'Get All Department' })
  async getAllDepartments(): Promise<department_master[]> {
    return this.departmentMasterService.getAllDepartments_Master();
  }

  //update Department_Master
  @Put(':id')
  @SetMetadata('permission', [PERMISSION.CAN_DEPARTMENT_UPDATE])
  @ApiOperation({ summary: 'Update Department' })
  @ApiBody({ type: CreateDepartmentDTO })
  async updateDepartment(
    @Param('id') id: number,
    @Body() body: UpdateDepartmentDTO,
  ): Promise<department_master> {
    return this.departmentMasterService.updateDepartment(
      { id: Number(id) },
      body,
    );
  }

  //Delete Department_Master
  @Delete(':id')
  @SetMetadata('permission', [PERMISSION.CAN_DEPARTMENT_DELETE])
  @ApiOperation({ summary: 'Delete Department' })
  @ApiOkResponse({ type: 'Department successfully Deleted' })
  async deleteDepartment(
    @Param('id') id: number,
  ): Promise<department_master | SuccessMessageDTO> {
    return this.departmentMasterService.deleteDepartment({ id: Number(id) });
  }
}
