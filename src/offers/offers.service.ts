/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Offers } from './offers.schema';
import { Model } from 'mongoose';
import { HotelOffers } from 'src/hotel-offers/hotel-offers.schema';
import { Hotel } from 'src/hotels/hotel.schema';

@Injectable()
export class OffersService {


    constructor(
      @InjectModel(Offers.name)
      private offersModel: Model<Offers>,
      @InjectModel(HotelOffers.name)
      private readonly hotelOffersModel: Model<HotelOffers>,
      @InjectModel(Hotel.name)
      private readonly hotelModel: Model<Hotel>,
  ) {}
    
    
  
    
    async getOffersById(offerId: string): Promise<any> {
      return this.offersModel.findById(offerId).exec();
    }


    async getUnassignedOffers(assignedOfferIds: string[]): Promise<Offers[]> {
      if (assignedOfferIds.length === 0) {
        return this.offersModel.find().exec(); // Returnează toate ofertele dacă nu sunt oferte atribuite
      }
      return this.offersModel.find({ _id: { $nin: assignedOfferIds } }).exec(); // Exclude ofertele atribuite
    }



    async deleteHotelOfferByOfferId(offerId: string): Promise<any> {
      const result = await this.hotelOffersModel.deleteMany({ offerId }).exec();
      if (!result.deletedCount) {
        console.warn(`No entries found in hotelOffers for offerId: ${offerId}`);
      }
      return result;
    }


    async getOffers(): Promise<any> {
      return this.offersModel.find().exec();
    }


    
    async deleteOffer(id:any): Promise<any> {
      return this.offersModel.findByIdAndDelete(id).exec();
    }



    async addOfferToHotel(hotelId: string, offerId: string) {
      // Verificăm dacă hotelul există
      const hotel = await this.hotelModel.findById(hotelId).exec();
      if (!hotel) {
        throw new NotFoundException(`Hotel with ID ${hotelId} not found`);
      }
  
      // Verificăm dacă oferta există
      const offer = await this.offersModel.findById(offerId).exec();
      if (!offer) {
        throw new NotFoundException(`Offer with ID ${offerId} not found`);
      }
  
      // Creăm o intrare în tabela HotelOffers
      const hotelOffer = new this.hotelOffersModel({
        hotelId,
        offerId,
      });
  
      return hotelOffer.save();
    }



    async addOffer(offerData: { name: string; price: number }): Promise<any> {
      // Creează și salvează oferta în tabela 'offers'
      const newOffer = new this.offersModel({
        name: offerData.name,
        price: offerData.price,
      });
  
      const savedOffer = await newOffer.save();
  
      return {
        message: 'Oferta a fost adăugată cu succes.',
        offer: savedOffer,
      };
    }




    async updateOffer(offerId: string,offerData: { name: string; price: number }): Promise<Offers> {
      const updatedOffer = await this.offersModel.findByIdAndUpdate(
        offerId,
        { $set: offerData },
        { new: true },
      );
  
      if (!updatedOffer) {
        throw new NotFoundException(`Offer with ID ${offerId} not found`);
      }
  
      return updatedOffer;
    }


}
