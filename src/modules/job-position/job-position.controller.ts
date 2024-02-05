import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { JobPositionService } from './job-position.service';
import { CreateJobPositionDTO, JobPositionDTO } from './job-position.dto';
import { job_position, Role } from '@prisma/client';
import { ApiOkResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { SuccessMessageDTO } from '../posts/post.dto';
import { PERMISSION } from '../../shared/constants/permission.constants';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Job Position')
@Controller('job-position')
export class JobPositionController {
  constructor(private jobPositionService: JobPositionService) {}

  //create job-position

  @Post('add')
  @SetMetadata('permission', [PERMISSION.CAN_JOB_POSITION_ADD])
  @ApiOperation({ summary: 'Create job position' })
  @ApiBody({ type: CreateJobPositionDTO })
  async createJobPosition(
    @Body() body: CreateJobPositionDTO,
    @Request() req,
  ): Promise<job_position> {
    return this.jobPositionService.createJobPosition(body);
  }

  //getAll job-position

  @Get()
  @SetMetadata('permission', [PERMISSION.CAN_JOB_POSITION_LIST])
  @ApiOperation({ summary: 'Get All job position' })
  async getAllJobPosition(
    @Query('search') search: string,
    @Query('page') page = 1,
    @Query('perPage') perPage = 20,
    @Request() req,
  ): Promise<JobPositionDTO> {
    return this.jobPositionService.getAllJobPosition(
      { deletedAt: null },
      search,
      Number(page),
      Number(perPage),
      req.user,
    );
  }

  //update job-position

  @Put(':id')
  @SetMetadata('permission', [PERMISSION.CAN_JOB_POSITION_UPDATE])
  @ApiOperation({ summary: 'Update job position' })
  @ApiBody({ type: CreateJobPositionDTO })
  async updateJobPosition(
    @Param('id') id: number,
    @Body() body: CreateJobPositionDTO,
  ): Promise<job_position> {
    return this.jobPositionService.updateJobPosition({ id: Number(id) }, body);
  }

  //delete job-position

  @Delete(':id')
  @SetMetadata('permission', [PERMISSION.CAN_JOB_POSITION_DELETE])
  @ApiOperation({ summary: 'Delete job position' })
  @ApiOkResponse({ type: 'job-position successfully Deleted' })
  async deleteJobPosition(
    @Param('id') id: number,
  ): Promise<job_position | SuccessMessageDTO> {
    return this.jobPositionService.deleteJobPosition({ id: Number(id) });
  }

  //Get job-position by Id

  @Get(':id')
  @SetMetadata('permission', [PERMISSION.CAN_JOB_POSITION])
  @ApiOperation({ summary: 'Get job position by id' })
  async getJobPosition(
    @Param('id') id: number,
    @Request() req,
  ): Promise<job_position> {
    return this.jobPositionService.getJobPosition({ id: Number(id) });
  }
}
