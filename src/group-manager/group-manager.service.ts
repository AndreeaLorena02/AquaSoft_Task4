/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hotel } from 'src/hotels/hotel.schema';
import { User } from 'src/users/user.schema';

@Injectable()
export class GroupManagerService {

    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        @InjectModel(Hotel.name) private readonly hotelModel: Model<Hotel>,

      ) {}
    
      async getManagersByGroup(groupId: string): Promise<User[]> {
        console.log("id grup: " , groupId)
        // Găsește toate hotelurile din grup
        const hotels = await this.hotelModel.find({ group_id: groupId }).exec();
        console.log("hotels: " , hotels)

        if (!hotels.length) {
          throw new NotFoundException(`No hotels found for group ${groupId}`);
        }
    
        // Extrage ID-urile hotelurilor
        const hotelIds = hotels.map((hotel) => hotel._id.toString());
        console.log("hotelIds: " , hotelIds)

    
        // Găsește managerii asociați hotelurilor
        const managers = await this.userModel
          .find({
            hotelId: { $in: hotelIds }, // Utilizatorii care aparțin hotelurilor din grup
            permissionId: '676173a613e3328961b2ed9d', // Înlocuiește cu ID-ul permisiunii pentru manageri
          })
          .exec();
    
        return managers;
      }



      async findHotelManagersByGroupId(groupId: string): Promise<User[]> {
        return this.userModel.find({ groupId, permissionId: '676173a613e3328961b2ed9d' }).exec();
      }


      // async findManagersByIds(managerIds: string[]): Promise<any[]> {
      //   return this.hot.find({ _id: { $in: managerIds } }).exec();
      // }


}
