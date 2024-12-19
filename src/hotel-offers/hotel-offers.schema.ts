/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema({ collection: 'hotelOffers' })
export class HotelOffers extends Document {
  @Prop({ required: true })
  hotelId: string;

  @Prop({ required: true })
  offerId: string;
}

export const HotelOffersSchema = SchemaFactory.createForClass(HotelOffers);
