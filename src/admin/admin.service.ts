/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { promises } from 'dns';
import { Model } from 'mongoose';
import { Group } from 'src/groups/groups.schema';
import { Hotel } from 'src/hotels/hotel.schema';
import { Permission } from 'src/permissions/permissions.schema';
import { User } from 'src/users/user.schema';

@Injectable()
export class AdminService {

    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        @InjectModel(Permission.name) private readonly permissionModel: Model<Permission>,
        @InjectModel(Hotel.name) private readonly hotelModel: Model<Hotel>,
        @InjectModel(Group.name) private readonly groupModel: Model<Group>,
      ) {}


    async addHotelManager(userData: Partial<User>, hotelId: string): Promise<User> {
       // Găsește permisiunea cu numele "Hotel Manager"
        const hotelManagerPermission = await this.permissionModel.findOne({ name: 'Hotel Manager' }).exec();

        if (!hotelManagerPermission) {
        throw new NotFoundException('Permission with name "Hotel Manager" not found');
        }

        // Verifică dacă hotelul există
        const hotel = await this.hotelModel.findById(hotelId).exec();
        if (!hotel) {
        throw new NotFoundException(`Hotel with ID ${hotelId} not found`);
        }

        // Atribuie permissionId și HotelID utilizatorului
        userData.permissionId = hotelManagerPermission._id.toString();
        userData.hotelId = hotel._id.toString();

        // Creează și salvează utilizatorul
        const newUser = new this.userModel(userData);
        return newUser.save();
      }


      async addGroupManager(userData: Partial<User>, groupId: string):Promise<User>{
        const groupManagerPermission = await this.permissionModel.findOne({ name: 'Group Manager' }).exec();

        if (!groupManagerPermission) {
        throw new NotFoundException('Permission with name "Hotel Manager" not found');
        }

        // Verifică dacă hotelul există
        const group = await this.groupModel.findOne({ ID: groupId }).exec();
        if (!group) {
        throw new NotFoundException(`Group with ID ${groupId} not found`);
        }

        // Atribuie permissionId și HotelID utilizatorului
        userData.permissionId = groupManagerPermission._id.toString();
        userData.groupId = group._id.toString();

        // Creează și salvează utilizatorul
        const newUser = new this.userModel(userData);
        return newUser.save();
      } 
}
