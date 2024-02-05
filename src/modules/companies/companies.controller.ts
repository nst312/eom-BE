import {
  Body,
  Controller,
  Post,
  SetMetadata,
  UseGuards,
  Request,
  Get,
  Query,
  Param,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesDTO, UpdateCompanyDTO } from './companies.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { companies, company_departments, Role } from '@prisma/client';
import { ApiOkResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { SuccessMessageDTO } from '../posts/post.dto';
import { DepartmentsService } from './departments.service';
import {
  CreateDepartmentDTO,
  DepartmentsDTO,
  UpdateDepartmentDTO,
} from './departments.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { saveCompanyToLogoStorage } from './config';
import { AuthGuard } from '@nestjs/passport';
import { PERMISSION } from '../../shared/constants/permission.constants';

@ApiTags('Company')
@Controller('companies')
export class CompaniesController {
  constructor(
    private companyService: CompaniesService,
    private departmentService: DepartmentsService,
  ) {}

  //Create Company
  // @Post()
  // @ApiOperation({ summary: 'Create Company' })
  // @ApiBody({ type: CreateCompanyDTO })
  // @ApiOkResponse({ type: CreateCompanyDTO })
  // async createCompany(
  //   @Body() companyData: CreateCompanyDTO,
  //   @Request() req,
  // ): Promise<companies | CreateCompanyDTO> {
  //   return this.companyService.createCompanies(companyData, req.user);
  // }

  //Get All Companies
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @SetMetadata('permission', [PERMISSION.CAN_COMPANY_LIST])
  @Get('all')
  @ApiOperation({ summary: 'Get All Companies' })
  @ApiOkResponse({ type: CompaniesDTO })
  async getAllCompanies(
    @Query('page') page = 1,
    @Query('perPage') perPage = 20,
  ): Promise<CompaniesDTO> {
    const where = {};
    return this.companyService.getAllCompanies(
      where,
      Number(page),
      Number(perPage),
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @SetMetadata('permission', [PERMISSION.CAN_COMPANY_DEPARTMENT_LIST])
  @Get('department')
  @ApiOperation({ summary: 'Get All Departments' })
  async getAllDepartments(
    @Query('search') search: string,
    @Query('page') page = 1,
    @Query('perPage') perPage = 20,
    @Request() req,
  ): Promise<DepartmentsDTO> {
    return this.departmentService.getAllDepartments(
      req.user,
      search,
      Number(page),
      Number(perPage),
    );
  }

  //Create Departments
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @SetMetadata('permission', [PERMISSION.CAN_COMPANY_DEPARTMENT_ADD])
  @Post('department')
  @ApiOperation({ summary: 'Create Company Based Department' })
  @ApiBody({ type: CreateDepartmentDTO })
  async createDepartment(
    @Body() body: CreateDepartmentDTO,
    @Request() req,
  ): Promise<company_departments> {
    return this.departmentService.createDepartment(body, req.user);
  }

  //Get Id By Company
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('my-company')
  @ApiOperation({ summary: 'Get Id By Company' })
  async getCompany(@Request() req): Promise<companies> {
    return this.companyService.getCompany(req.user);
  }

  @Get(':fileName')
  seeUploadedFile(@Param('fileName') fileName: string, @Res() res) {
    return res.sendFile(fileName, { root: './images' });
  }

  //Update Company
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @SetMetadata('permission', [PERMISSION.CAN_COMPANY_UPDATE])
  @Put(':id')
  @ApiOperation({ summary: 'Update Company' })
  @ApiBody({ type: UpdateCompanyDTO })
  @UseInterceptors(FileInterceptor('company_logo', saveCompanyToLogoStorage))
  async updateCompany(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UpdateCompanyDTO,
    @Request() req,
  ): Promise<companies | UpdateCompanyDTO> {
    return this.companyService.updateCompany(
      { id: Number(id) },
      file?.filename,
      body,
      req.user,
    );
  }

  //Delete Company
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @SetMetadata('permission', [PERMISSION.CAN_COMPANY_DELETE])
  @Delete(':id')
  @ApiOperation({ summary: 'Delete Company' })
  @ApiOkResponse({ type: 'Company successfully Deleted' })
  async deleteCompany(
    @Param('id') id: number,
    @Request() req,
  ): Promise<SuccessMessageDTO | companies> {
    return this.companyService.deleteCompany({ id: Number(id) }, req.user);
  }

  //Get id By Department
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @SetMetadata('permission', [PERMISSION.CAN_COMPANY_DEPARTMENT])
  @Get('department/:dept_id')
  @ApiOperation({ summary: 'Get Id By Company' })
  async getDepartment(
    @Param('dept_id') dept_id: number,
    @Request() req,
  ): Promise<company_departments> {
    return this.departmentService.getDepartment(Number(dept_id), req.user);
  }

  //Update Department
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @SetMetadata('permission', [PERMISSION.CAN_COMPANY_DEPARTMENT_UPDATE])
  @Put('department/:dept_id')
  @ApiOperation({ summary: 'Update Department' })
  @ApiBody({ type: UpdateDepartmentDTO })
  async updateDepartment(
    @Param('dept_id') dept_id: number,
    @Request() req,
    @Body() body: UpdateDepartmentDTO,
  ): Promise<company_departments | UpdateDepartmentDTO> {
    return this.departmentService.updateDepartment(
      Number(dept_id),
      req.user,
      body,
    );
  }

  //Delete Department
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @SetMetadata('permission', [PERMISSION.CAN_COMPANY_DEPARTMENT_DELETE])
  @Delete('department/:dept_id')
  @ApiOperation({ summary: 'Delete Department' })
  @ApiOkResponse({ description: 'Department successfully Deleted' })
  async deleteDepartment(
    @Param('dept_id') dept_id: number,
    @Request() req,
  ): Promise<SuccessMessageDTO | company_departments> {
    return this.departmentService.deleteDepartment(Number(dept_id), req.user);
  }
}
