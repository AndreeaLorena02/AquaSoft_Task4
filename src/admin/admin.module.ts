/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/user.schema';
import { Permission, PermissionSchema } from 'src/permissions/permissions.schema';
import { Hotel, HotelSchema } from 'src/hotels/hotel.schema';
import { Group, GroupSchema } from 'src/groups/groups.schema';


@Module({
    imports: [
        MongooseModule.forFeature([
          {name: User.name, schema: UserSchema },
          {name: Permission.name, schema: PermissionSchema }, // Adaugă schema Permission
          {name: Hotel.name, schema: HotelSchema },
          {name: Group.name, schema: GroupSchema },

         ]),
      ],
      controllers: [AdminController],
      providers: [AdminService],
      exports: [AdminService],
})
export class AdminModule {

}
