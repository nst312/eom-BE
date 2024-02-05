import {
  IsArray,
  IsDate,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { invoices, Invoice_Status, Course_Type } from '@prisma/client';
import { Type } from 'class-transformer';
import { EmploymentDTO } from '../resume-master/dto/employment.dto';

export class InvoiceDTO {
  @ApiProperty()
  count: number;

  @ApiProperty()
  @IsArray()
  data: invoices[];
}

export class invoiceFilterDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  invoiceNumber: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  to: Date;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  from: Date;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Invoice_Status)
  status: Invoice_Status;

  @ApiProperty()
  @IsOptional()
  @IsObject({})
  sort: object;
}

export class CreateInvoiceDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  invoiceNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  clientId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  invoiceDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  dueDate: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  note: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  currency: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  discount: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  discountAmount: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  discountTotal: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  cgst: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  sgst: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  igst: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  taxTotal: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  grandTotal: number;

  @ApiProperty({ default: Invoice_Status.DRAFT, required: false })
  @IsOptional()
  @IsEnum(Invoice_Status)
  status: Invoice_Status;

  @ApiProperty({ type: () => [InvoiceItemDTO] })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InvoiceItemDTO)
  invoiceItems: InvoiceItemDTO[];
}

class InvoiceItemDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  qty: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  rate: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  hsnCode: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  total: number;
}

export class UpdateInvoiceDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  invoiceNumber: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  clientId: number;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  invoiceDate: Date;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  dueDate: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  note: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  currency: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  discount: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  discountAmount: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  discountTotal: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  cgst: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  sgst: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  igst: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  taxTotal: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  grandTotal: number;

  @ApiProperty({ default: Invoice_Status.DRAFT, required: false })
  @IsOptional()
  @IsEnum(Invoice_Status)
  status: Invoice_Status;

  @ApiProperty({ type: () => [UpdateInvoiceItemDTO] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateInvoiceItemDTO)
  invoiceItems: UpdateInvoiceItemDTO[];
}

class UpdateInvoiceItemDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  qty: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  rate: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  total: number;
}
