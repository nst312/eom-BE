import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';
import * as fs from 'fs';
import * as moment from 'moment';
import { CommonHelpers } from '../shared/helpers/common.helpers';
import paths from 'path';
import Handlebars from 'handlebars';
import { startCase } from 'lodash';

@Injectable()
export class SendgridService {
  constructor(private readonly configService: ConfigService) {
    SendGrid.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async mailSend(empId, email, firstName, lastName, company_name) {
    const date = moment().subtract(1, 'months');
    const month = date.format('MMMM');
    const year = date.format('YYYY');

    const path = `${
      process.cwd() + `/templates/salary-slip/${month}-${year}/${empId}.pdf`
    }`;

    // greetings
    const name = `${firstName} ${lastName}`;
    const salaryGreetings = {
      name: startCase(name.toLowerCase()),
      companyName: company_name,
      currentMonth: month,
      currentYear: year,
    };
    //greeting html
    const greetingTemplateStr = fs
      .readFileSync(
        paths.resolve(__dirname, '../../../../templates/greetings.hbs'),
      )
      .toString('utf8');

    const greetingTemplate = Handlebars.compile(greetingTemplateStr, {
      noEscape: true,
    });
    const greetingHtml = greetingTemplate(salaryGreetings);

    if (fs.existsSync(path)) {
      const data_base64 = CommonHelpers.base64_encode(path);
      const mail = {
        to: email,
        subject: 'Invoice',
        from: process.env.SENDGRID_EMAIL_ADDRESS,
        text: 'Invoice',
        html: greetingHtml,
        attachments: [
          {
            filename: `invoice.pdf`,
            content: data_base64,
            type: 'application/pdf',
            disposition: 'attachment',
          },
        ],
      };
      await this.sendMail(mail);
    }
  }

  async sendMail(mail) {
    try {
      const transport = await SendGrid.send(mail);
      console.log(`Email successfully dispatched to ${mail.to}`);
      return transport;
    } catch (err) {
      console.log(err.response.body);
    }
  }
}
