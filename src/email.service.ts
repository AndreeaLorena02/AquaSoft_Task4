/* eslint-disable prettier/prettier */
/* email.service.ts */
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 587,
      auth: {
        user: 'calin 12', // Înlocuiește cu userul tău Mailtrap
        pass: 'Federer 1', // Înlocuiește cu parola ta Mailtrap
      },
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
