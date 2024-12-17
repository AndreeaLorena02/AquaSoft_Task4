/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Permission, PermissionSchema } from './permissions.schema';

@Module({
  providers: [PermissionsService],
  controllers: [PermissionsController],
  imports:[    
    MongooseModule.forFeature([{ name: Permission.name, schema: PermissionSchema }]),
],
exports: [MongooseModule],

})
export class PermissionsModule {

}