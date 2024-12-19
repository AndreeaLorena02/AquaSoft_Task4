/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HotelOffers } from './hotel-offers.schema';
import { Model } from 'mongoose';

@Injectable()
export class HotelOffersService {

    constructor(@InjectModel(HotelOffers.name) private hotelOffersModel: Model<HotelOffers>) {}

    async getOffersByHotelId(hotelId: string): Promise<any> {
      console.log("hotelId: " , hotelId)
      const offers = await this.hotelOffersModel.find({hotelId}).exec();
      // console.log("Offers fetched: ", offers); // Log pentru rezultate
      return offers;
    }


    async getObject(hotelId: string): Promise<HotelOffers> {
      console.log("hotelId: " , hotelId)
      const offers = await this.hotelOffersModel.findById(hotelId).exec();
      console.log("Offers fetched: ", offers); // Log pentru rezultate
      return offers;
    }
}
