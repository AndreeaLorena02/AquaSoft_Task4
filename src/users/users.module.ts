/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {User, UserSchema } from './user.schema';
import { Permission, PermissionSchema } from 'src/permissions/permissions.schema';
import { AuthModule } from 'src/auth/auth.module';
import { AdminModule } from 'src/admin/admin.module';
// import { AuthModule } from 'src/auth/auth.module';
// import { JwtModule } from '@nestjs/jwt';
// import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
    { name: User.name, schema: UserSchema },
    { name: Permission.name, schema: PermissionSchema }]),
    AuthModule,
    AdminModule
    // forwardRef(() => AuthModule),

  // JwtModule.register({
  //   secret: 'my_token', // Cheie secretă sigură
  //   signOptions: { expiresIn: '1h' }, // Token valabil 1 oră
  // }),

],
  
  providers: [UsersService ],
  controllers: [UsersController],
  exports: [UsersService],

})
export class UsersModule {

}