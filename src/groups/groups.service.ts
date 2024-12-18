/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Group } from './groups.schema';
import { Model } from 'mongoose';

@Injectable()
export class GroupsService {


    constructor(
        @InjectModel(Group.name) private groupModel: Model<Group>,
      ) {}
    
      async createGroup(data: Partial<Group>): Promise<Group> {
        const newGroup = new this.groupModel(data);
        console.log("data: " , newGroup)
        return newGroup.save();
      }
    
      async getAllGroups(): Promise<Group[]> {
        return this.groupModel.find().exec();
      }
    
      async getGroupById(id: number): Promise<Group> {
        return this.groupModel.findOne({ ID: id }).exec();
      }


}
