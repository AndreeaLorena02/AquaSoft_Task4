/* eslint-disable prettier/prettier */
import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/users/user.schema';
import { AdminService } from './admin.service';
import { PermissionsGuard } from 'src/permissions/permissions.guard';

@Controller('admin')
export class AdminController {

    constructor(private readonly adminService: AdminService) {}

        
    @UseGuards(JwtAuthGuard, PermissionsGuard) // Aplică JWT și PermissionsGuard
    @Post('/add-hotel-manager/:hotelId')
    async addHotelManager(@Body() userData: Partial<User>,@Param('hotelId') hotelId: string): Promise<User> {
        return this.adminService.addHotelManager(userData, hotelId);
    }


      @UseGuards(JwtAuthGuard, PermissionsGuard) // Aplică JWT și PermissionsGuard
      @Post('/add-group-manager/:hotelId')
      async addGroupManager(@Body() userData: Partial<User>,@Param('groupId') groupId: string): Promise<User> {
          return this.adminService.addGroupManager(userData, groupId);
      }
}
