/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { GroupManagerController } from './group-manager.controller';
import { GroupManagerService } from './group-manager.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/user.schema';
import { Permission, PermissionSchema } from 'src/permissions/permissions.schema';
import { Hotel, HotelSchema } from 'src/hotels/hotel.schema';
import { Group, GroupSchema } from 'src/groups/groups.schema';
import { EmailService } from 'src/email.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[
    MongooseModule.forFeature([
          {name: User.name, schema: UserSchema },
          {name: Permission.name, schema: PermissionSchema }, // Adaugă schema Permission
          {name: Hotel.name, schema: HotelSchema },
          {name: Group.name, schema: GroupSchema },

         ]),
         UsersModule
  ],
  controllers: [GroupManagerController ],
  providers: [GroupManagerService,EmailService]
})
export class GroupManagerModule {}
