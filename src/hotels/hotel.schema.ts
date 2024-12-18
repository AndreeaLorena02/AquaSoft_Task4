/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HotelDocument = Hotel & Document;

@Schema()
export class Hotel {
  @Prop({ type: String, required: true, maxlength: 100 }) // VARCHAR(100), NOT NULL
  HotelName: string;

  @Prop({ type: Number, required: true }) // DECIMAL(9,6), NOT NULL
  Latitude: number;

  @Prop({ type: Number, required: true }) // DECIMAL(9,6), NOT NULL
  Longitude: number;

  @Prop({ type: Number, default: null }) // INT, poate fi NULL
  RegionID?: number;

  @Prop({ type: String, default: null }) // INT, poate fi NULL
  CityID?: string;

  @Prop({ type: String, default: null }) // INT, poate fi NULL
  group_id?: string;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);
