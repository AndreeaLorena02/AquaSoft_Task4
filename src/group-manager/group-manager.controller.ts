/* eslint-disable prettier/prettier */
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GroupManagerService } from './group-manager.service';

@Controller('group-manager')
export class GroupManagerController {

    constructor(private readonly groupManagerService: GroupManagerService) {}

    @UseGuards(JwtAuthGuard) // Protejează ruta cu autentificare
    @Get('/group/:groupId/hotelManagers')
    async getManagersByGroup(@Param('groupId') groupId: string) {
      return this.groupManagerService.getManagersByGroup(groupId);
    }

}
