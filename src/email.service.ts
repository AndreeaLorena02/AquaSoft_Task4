import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  public transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 587,
      secure: false,
      auth: {
        user: 'd2b534ae32d1fd',
        pass: 'f814659d1a33ca',
      },
      debug: true,
      logger: true,
    });
  }

  async sendEmail(to: string, subject: string, body: string) {
    const info = await this.transporter.sendMail({
      from: '"Group Manager" <manager@app.com>',
      to,
      subject,
      html: body,
    });

    console.log('E-mail trimis:', nodemailer.getTestMessageUrl(info));
  }
}
