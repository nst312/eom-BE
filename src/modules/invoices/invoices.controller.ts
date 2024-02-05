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
import { InvoicesService } from './invoices.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { Role, invoices } from '@prisma/client';
import {
  CreateInvoiceDTO,
  InvoiceDTO,
  invoiceFilterDTO,
  UpdateInvoiceDTO,
} from './invoices.dto';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';
import { SuccessMessageDTO } from '../posts/post.dto';
import { PERMISSION } from '../../shared/constants/permission.constants';

@ApiTags('Invoice')
@Controller('invoices')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class InvoicesController {
  constructor(private invoiceService: InvoicesService) {}

  // make a invoice
  @Post()
  @ApiOperation({
    summary: 'Create client invoice',
  })
  @SetMetadata('permission', [PERMISSION.CAN_INVOICE_ADD])
  @ApiBody({ type: CreateInvoiceDTO })
  async storeInvoice(@Body() body: CreateInvoiceDTO): Promise<invoices> {
    return this.invoiceService.createInvoice(body);
  }

  // get all invoice
  @Post('/list')
  @SetMetadata('permission', [PERMISSION.CAN_INVOICE_LIST])
  @ApiOperation({
    summary: 'Get All Client Invoice',
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
  async showAllInvoice(
    @Query('search') search: string,
    @Query('page') page = 1,
    @Query('perPage') perPage = 20,
    @Request() req,
    @Body() body: invoiceFilterDTO,
  ): Promise<InvoiceDTO> {
    return this.invoiceService.showAllInvoice(
      { deletedAt: null },
      search,
      Number(page),
      Number(perPage),
      req.user,
      body,
    );
  }

  // get invoice number
  @Get('/invoice-number')
  @ApiOperation({ summary: 'Get Invoice Number' })
  async getInvoiceNumber(): Promise<any> {
    return this.invoiceService.getInvoiceNumber();
  }

  // show invoice
  @Get(':id')
  @ApiOperation({ summary: 'Get Invoice' })
  async showInvoice(@Param('id') id: number): Promise<invoices> {
    return this.invoiceService.showInvoice({ id: Number(id) });
  }

  // update invoice
  @Put(':id')
  @SetMetadata('permission', [PERMISSION.CAN_INVOICE_UPDATE])
  @ApiOperation({ summary: 'Update Invoice' })
  @ApiBody({ type: UpdateInvoiceDTO })
  async updateInvoice(
    @Param('id') id: number,
    @Body() body: invoices,
  ): Promise<UpdateInvoiceDTO | invoices> {
    return this.invoiceService.updateInvoice({ id: Number(id) }, body);
  }

  // destroy invoice
  @Delete(':id')
  @SetMetadata('permission', [PERMISSION.CAN_INVOICE_DELETE])
  @ApiOperation({ summary: 'Delete Invoice' })
  async destroyInvoice(@Param('id') id: number): Promise<SuccessMessageDTO> {
    return this.invoiceService.destroyInvoice({ id: Number(id) });
  }

  //Download invoice
  @Get('download/:invoiceId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Download client invoice' })
  async downloadInvoice(
    @Param('invoiceId') invoiceId: number,
    @Request() req,
  ): Promise<{ pdf: string }> {
    return this.invoiceService.downloadInvoice(invoiceId, req);
  }

  @Post('send/:invoiceId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'Send client invoice.' })
  async sendInvoice(
    @Param('invoiceId') invoiceId: number,
    @Request() req,
  ): Promise<SuccessMessageDTO> {
    return this.invoiceService.sendInvoice(invoiceId, req);
  }

  // destroy invoice items
  @Delete(':invoiceId/invoice-item/:id')
  @ApiOperation({ summary: 'Delete Invoice Item' })
  async destroyInvoiceItems(
    @Param('invoiceId') invoiceId: number,
    @Param('id') id: number,
  ): Promise<SuccessMessageDTO> {
    return this.invoiceService.destroyInvoiceItems(
      Number(invoiceId),
      Number(id),
    );
  }
}
