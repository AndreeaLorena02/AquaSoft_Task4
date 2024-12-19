/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Offers, OffersSchema } from './offers.schema';
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Offers.name, schema: OffersSchema }]),
  ],
  providers: [OffersService],
  controllers: [OffersController],
  exports: [OffersService,MongooseModule], // Exportăm pentru utilizare în alte module
})
export class OffersModule {}
