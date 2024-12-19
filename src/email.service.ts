/* eslint-disable prettier/prettier */
/* email.service.ts */
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  public transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 587,
      secure: false, // true pentru port 465, false pentru port 587
      auth: {
        user: 'd2b534ae32d1fd', // Înlocuiește cu userul tău Mailtrap
        pass: 'f814659d1a33ca', // Înlocuiește cu parola ta Mailtrap
      },
        debug: true, // Activează debugging
        logger: true, // Activează logarea completă
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
