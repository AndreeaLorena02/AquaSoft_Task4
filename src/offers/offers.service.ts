/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Offers } from './offers.schema';
import { Model } from 'mongoose';

@Injectable()
export class OffersService {


    constructor(@InjectModel(Offers.name) private offersModel: Model<Offers>) {}
    
    
    async getOffersById(offerId: string): Promise<any> {
      return this.offersModel.find({ offerId }).exec();
    }

}
