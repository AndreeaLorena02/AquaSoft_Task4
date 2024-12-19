/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Offers } from './offers.schema';
import { Model } from 'mongoose';
import { HotelOffers } from 'src/hotel-offers/hotel-offers.schema';

@Injectable()
export class OffersService {


    constructor(
      @InjectModel(Offers.name) private offersModel: Model<Offers>,
      @InjectModel(HotelOffers.name) private readonly hotelOffersModel: Model<HotelOffers>,
  ) {}
    
    
    
    async getOffersById(offerId: string): Promise<any> {
      return this.offersModel.findById(offerId);
    }

    async addOfferToHotel(hotelId: string, offerData: Partial<Offers>): Promise<{ offer: Offers; hotelOffer: HotelOffers }> {
      // 1. Salvează oferta în tabela `offers`
      const newOffer = new this.offersModel(offerData);
      const savedOffer = await newOffer.save();
  
      // 2. Salvează relația în tabela `hotelOffers`
      const newHotelOffer = new this.hotelOffersModel({
        hotelId,
        offerId: savedOffer._id,
      });
      const savedHotelOffer = await newHotelOffer.save();
  
      return { offer: savedOffer, hotelOffer: savedHotelOffer };
    }


}
