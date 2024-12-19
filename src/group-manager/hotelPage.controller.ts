import * as jwt from 'jsonwebtoken';
import { BadRequestException, Controller, Get, Query } from '@nestjs/common';

@Controller('hotelPage')
export class HotelAccessController {
  @Get('/')
  async accessHotel(@Query('token') token: string) {
    const secret = 'temporary_secret_key'; // Aceeași cheie secretă folosită la generare

    try {
      const payload = jwt.verify(token, secret); // Verifică tokenul
      return { message: 'Acces permis', userId: payload['userId'] };
    } catch (err) {
      throw new BadRequestException('Token invalid sau expirat');
    }
  }
}