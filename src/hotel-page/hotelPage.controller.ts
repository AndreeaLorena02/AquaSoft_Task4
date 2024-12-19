/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import * as jwt from 'jsonwebtoken';
import { BadRequestException, Controller, Get, Query } from '@nestjs/common';

@Controller('hotelPage')
export class HotelAccessController {
  @Get()
  async accessHotel(@Query('token') token: string) {
    console.log("AM PRIMIT TOKENUL")
    const secret = 'temporary_secret_key'; // Aceeași cheie secretă folosită la generare

    try {
      const payload = jwt.verify(token, secret); // Verifică tokenul
      return { message: 'Acces permis', userId: payload['userId'] };
    } catch (err) {
      throw new BadRequestException('Token invalid sau expirat');
    }
  }
}