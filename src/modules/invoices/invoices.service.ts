import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { invoices } from '@prisma/client';
import { InvoiceDTO, UpdateInvoiceDTO } from './invoices.dto';
import { SuccessMessageDTO } from '../posts/post.dto';
import Handlebars from 'handlebars';
import * as fs from 'fs';
import * as pdf from 'html-pdf';
import * as paths from 'path';
import * as converter from 'number-to-words';
import { CommonHelpers } from '../../shared/helpers/common.helpers';
import { SendgridService } from '../../mail/sendgrid.service';
import * as moment from 'moment';
import { isEmpty } from 'lodash';

@Injectable()
export class InvoicesService {
  constructor(
    private prisma: PrismaService,
    private sendgridService: SendgridService,
  ) {}

  async createInvoice(data): Promise<invoices> {
    const invoicePayload = {
      invoiceNumber: data.invoiceNumber,
      clientId: data.clientId,
      invoiceDate: data.invoiceDate,
      dueDate: data.dueDate,
      note: data.note,
      currency: data.currency,
      discount: data.discount,
      discountAmount: data.discountAmount,
      discountTotal: data.discountTotal,
      cgst: data.cgst,
      sgst: data.sgst,
      igst: data.igst,
      taxTotal: data.taxTotal,
      grandTotal: data.grandTotal,
      status: data.status,
    };

    // create invoice
    return this.prisma.invoices.create({
      data: {
        ...invoicePayload,
        invoiceItems: {
          createMany: {
            data: data.invoiceItems,
          },
        },
      },
      include: {
        invoiceItems: true,
      },
    });
  }

  // show all invoice
  async showAllInvoice(
    where,
    searchKey: string,
    page,
    perPage,
    user,
    body,
  ): Promise<InvoiceDTO> {
    const company_id = user.company_id;
    const search = !searchKey ? '' : searchKey;
    const from = body.from ? body.from : undefined;
    const to = body.to ? body.to : undefined;
    const status = body.status ? body.status : undefined;
    const sort = isEmpty(body.sort) ? { createdAt: 'desc' } : body.sort;

    const count = await this.prisma.invoices.count({
      where: {
        AND: [
          {
            invoiceNumber: {
              contains: `${body.invoiceNumber || ''}`,
              mode: 'insensitive',
            },
          },
          { status },
          {
            clients: {
              client_name: { contains: `${search}`, mode: 'insensitive' },
            },
          },
          {
            invoiceDate: {
              gte: from,
              lte: to,
            },
          },
        ],
        clients: {
          companies: {
            every: {
              id: company_id,
            },
          },
        },
        deletedAt: null,
      },
    });
    const data = await this.prisma.invoices.findMany({
      skip: perPage * (page - 1),
      take: perPage,
      where: {
        AND: [
          {
            invoiceNumber: {
              contains: `${body.invoiceNumber || ''}`,
              mode: 'insensitive',
            },
          },
          { status },
          {
            clients: {
              client_name: { contains: `${search}`, mode: 'insensitive' },
            },
          },
          {
            invoiceDate: {
              gte: from,
              lte: to,
            },
          },
        ],
        clients: {
          companies: {
            every: {
              id: company_id,
            },
          },
        },
        deletedAt: null,
      },
      include: {
        clients: {
          select: {
            client_name: true,
            work_email: true,
          },
        },
      },

      orderBy: {
        ...sort,
      },
    });
    return { count, data };
  }

  // update invoice
  async updateInvoice(where, data): Promise<UpdateInvoiceDTO | invoices> {
    // check invoice exist or not
    await this.showInvoice(where);

    const invoicePayload = {
      invoiceNumber: data.invoiceNumber,
      clientId: data.clientId,
      invoiceDate: data.invoiceDate,
      dueDate: data.dueDate,
      note: data.note,
      currency: data.currency,
      discount: data.discount,
      discountAmount: data.discountAmount,
      discountTotal: data.discountTotal,
      cgst: data.cgst,
      sgst: data.sgst,
      igst: data.igst,
      taxTotal: data.taxTotal,
      grandTotal: data.grandTotal,
      status: data.status,
    };
    // update invoice
    await this.prisma.invoices.update({
      where,
      data: invoicePayload,
    });

    if (data.invoiceItems.length) {
      data.invoiceItems.forEach((el) => {
        el.invoiceId = where.id;
      });
      await data.invoiceItems.map(async (item) => {
        if (item.id) {
          await this.prisma.invoice_items.update({
            where: {
              id: item.id,
            },
            data: item,
          });
        } else {
          await this.prisma.invoice_items.create({
            data: item,
          });
        }
      });
    }
    return this.prisma.invoices.findUnique({
      where,
      include: {
        invoiceItems: true,
      },
    });
  }

  // delete invoice
  async destroyInvoice(where): Promise<SuccessMessageDTO> {
    // check invoice exist or not
    await this.showInvoice(where);

    const response = await this.prisma.invoices.update({
      where,
      data: { deletedAt: new Date() },
    });
    if (!response) {
      throw new BadRequestException('Something went wrong!');
    }

    return { message: 'Invoice deleted successfully.' };
  }

  // delete invoice
  async destroyInvoiceItems(itemId, invoiceItemId): Promise<SuccessMessageDTO> {
    // check invoice
    await this.showInvoice({ id: itemId });

    // check invoice item
    const response = await this.prisma.invoice_items.findUnique({
      where: { id: invoiceItemId },
    });

    if (!response) {
      throw new NotFoundException('invoice item not found');
    }

    await this.prisma.invoice_items.delete({ where: { id: invoiceItemId } });
    return { message: 'Invoice item deleted successfully.' };
  }

  // get invoice number
  async getInvoiceNumber(): Promise<any> {
    const aggregations = await this.prisma.invoices.aggregate({
      _max: { invoiceNumberPrefix: true },
    });
    const currentYear = new Date().getFullYear();
    let invoiceNumber;
    if (!aggregations._max.invoiceNumberPrefix) {
      invoiceNumber = `INV-${currentYear}-1`;
    } else {
      const response = await this.prisma.invoices.findFirst({
        where: {
          invoiceNumberPrefix: aggregations._max.invoiceNumberPrefix,
        },
        select: { invoiceNumber: true },
      });
      const _invoiceNumber = response.invoiceNumber.split('-');
      invoiceNumber = `INV-${currentYear}-${parseInt(_invoiceNumber[2]) + 1}`;
    }
    return { invoiceNumber };
  }

  // Download Invoice to client
  async downloadInvoice(invoiceId, req): Promise<{ pdf: string }> {
    // reusable methods
    const { content } = await this.invoiceToPdf(invoiceId, req);
    return { pdf: content };
  }

  // Send Invoice to client
  async sendInvoice(invoiceId, req): Promise<SuccessMessageDTO> {
    // reusable methods
    const { email, content, invoiceNumber } = await this.invoiceToPdf(
      invoiceId,
      req,
    );

    // mail payload
    const mail = {
      to: email,
      subject: 'Invoice',
      from: process.env.SENDGRID_EMAIL_ADDRESS,
      text: 'Invoice',
      attachments: [
        {
          filename: `${invoiceNumber}.pdf`,
          content,
          type: 'application/pdf',
          disposition: 'attachment',
        },
      ],
    };
    await this.sendgridService.sendMail(mail);

    return { message: 'Invoice successfully sent.' };
  }

  htmlToPdfBuffer(html, invoiceNumber) {
    const options = {
      format: 'A4',
      type: 'pdf',
      orientation: 'portrait',
    };
    return new Promise((resolve, reject) => {
      // get previous month
      pdf
        .create(html, options)
        .toFile(`./templates/invoice/${invoiceNumber}.pdf`, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res.filename);
          }
        });
    });
  }

  async invoiceToPdf(invoiceId, req) {
    const invoice = await this.showInvoice({ id: Number(invoiceId) });
    const {
      invoiceNumber,
      invoiceDate,
      dueDate,
      discount,
      cgst,
      sgst,
      igst,
      grandTotal,
      clients,
      invoiceItems,
      taxTotal,
    } = invoice;
    if (!clients) {
      throw new NotFoundException('Client not found.');
    }
    const companyLogoPathUrl =
      req.protocol +
      '://' +
      req.get('host') +
      `/api/salaries/companyLogo/${invoice.clients.companies[0]?.company_logo}`;
    const netPayWord = converter
      ?.toWords(grandTotal)
      .replace(/[^a-zA-Z ]/g, ' ');
    const hbsPayload = {
      companyLogoPathUrl,
      companyName: clients.companies[0]?.company_name,
      companyEmail: clients.companies[0]?.email,
      companyWebsite: clients.companies[0]?.website,
      clientGST: clients.gstin,
      clientName: clients.client_name,
      clientWebsite: clients.website,
      clintAddresses1: clients.address[0]?.street1,
      clintAddresses2: clients.address[0]?.street2,
      clintCity: clients.address[0]?.city,
      clintCountry: clients.address[0]?.country,
      clintState: clients.address[0]?.state,
      gstIn: clients.companies[0]?.gstin,
      invoiceNumber,
      invoiceDate: moment(invoiceDate).format('DD/MM/YYYY'),
      dueDate: moment(dueDate).format('DD/MM/YYYY'),
      items: invoiceItems,
      discount,
      cgst,
      sgst,
      igst,
      taxTotal,
      grandTotal,
      netPayWord,
      street1: clients.companies[0]?.addresses[0]?.street1,
      street2: clients.companies[0]?.addresses[0]?.street2,
      city: clients.companies[0]?.addresses[0]?.city,
      state: clients.companies[0]?.addresses[0]?.state,
      country: clients.companies[0]?.addresses[0]?.country,
      tagLine: clients.companies[0]?.tag_line,
    };

    // read hbs file
    const invoiceHbs = fs
      .readFileSync(
        paths.resolve(__dirname, '../../../../templates/invoice.hbs'),
      )
      .toString('utf8');
    const invoiceTemplate = Handlebars.compile(invoiceHbs, {
      noEscape: true,
    });
    const invoiceHtml = invoiceTemplate(hbsPayload);

    // html to pdf
    const filePath = await this.htmlToPdfBuffer(invoiceHtml, invoiceNumber);
    const data_base64 = CommonHelpers.base64_encode(filePath);
    return { email: clients.work_email, content: data_base64, invoiceNumber };
  }

  // show invoice with id
  async showInvoice(where): Promise<invoices | any> {
    try {
      const response = await this.prisma.invoices.findUnique({
        where,
        include: {
          invoiceItems: true,
          clients: {
            include: {
              companies: {
                include: {
                  addresses: true,
                },
              },
              address: true,
            },
          },
        },
      });
      if (response.deletedAt !== null) {
        throw new BadRequestException('Invoice not found.');
      }
      delete response.deletedAt;
      return response;
    } catch (err) {
      throw new BadRequestException('Invoice not found.');
    }
  }
}
