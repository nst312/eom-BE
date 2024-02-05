import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Request,
  Res,
  SetMetadata,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { clients, Role } from '@prisma/client';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ClientsDTO, CreateClientsDTO, UpdateClientsDTO } from './clients.dto';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';
import { SuccessMessageDTO } from '../posts/post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { saveImageToClientStorage } from '../../shared/helpers/image-upload.helpers';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { PERMISSION } from '../../shared/constants/permission.constants';

@ApiTags('Client')
@Controller('clients')
export class ClientsController {
  constructor(private _clientsService: ClientsService) {}

  // Storing companies clients
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @SetMetadata('permission', [PERMISSION.CAN_CLIENT_ADD])
  @Post()
  @ApiOperation({
    summary: 'Create New Companies Clients',
  })
  @ApiBody({ type: CreateClientsDTO })
  @UseInterceptors(FileInterceptor('files', saveImageToClientStorage))
  async storeClients(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateClientsDTO,
    @Req() req,
  ): Promise<CreateClientsDTO | clients> {
    return this._clientsService.storeClients(file?.filename, body, req.user);
  }

  // Delete clients
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @SetMetadata('permission', [PERMISSION.CAN_CLIENT_DELETE])
  @Put('delete')
  @ApiOperation({
    summary: 'Delete Id Based Companies Client',
  })
  async deleteClients(@Body() body: [number]): Promise<any> {
    return this._clientsService.deleteClients(body);
  }

  // Show All companies clients
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @SetMetadata('permission', [PERMISSION.CAN_CLIENT_LIST])
  @Get()
  @ApiOperation({
    summary: 'Get All Companies Client',
  })
  @ApiImplicitQuery({
    name: 'search',
    required: false,
    type: String,
  })
  @ApiImplicitQuery({
    name: 'page',
    required: false,
    type: Number,
  })
  @ApiImplicitQuery({
    name: 'perPage',
    required: false,
    type: Number,
  })
  async showAllClients(
    @Query('search') search: string,
    @Query('page') page = 1,
    @Query('perPage') perPage = 20,
    @Request() req,
  ): Promise<ClientsDTO> {
    return this._clientsService.showAllClients(
      { deletedAt: null },
      search,
      Number(page),
      Number(perPage),
      req.user,
    );
  }

  // Update companies client
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @SetMetadata('permission', [PERMISSION.CAN_CLIENT_UPDATE])
  @Put(':id')
  @ApiOperation({
    summary: 'Update Id Based Companies Client',
  })
  @UseInterceptors(FileInterceptor('files', saveImageToClientStorage))
  async updateClients(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UpdateClientsDTO,
  ): Promise<clients | UpdateClientsDTO> {
    return this._clientsService.updateClients(
      file?.filename,
      { id: Number(id) },
      body,
    );
  }

  // Show companies client
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @SetMetadata('permission', [PERMISSION.CAN_CLIENT])
  @Get(':id')
  @ApiOperation({
    summary: 'Get Id Based Companies Client',
  })
  async showClients(@Param('id') id: number): Promise<clients> {
    return this._clientsService.showClients({ id: Number(id) });
  }

  @Get('logo/:fileName')
  seeUploadedFile(@Param('fileName') fileName: string, @Res() res) {
    return res.sendFile(fileName, { root: './templates/clientLogo' });
  }
}
