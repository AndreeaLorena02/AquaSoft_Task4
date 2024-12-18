/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { Group } from './groups.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PermissionsGuard } from 'src/permissions/permissions.guard';

@Controller('admin/groups')
export class GroupController {
  constructor(private readonly groupService: GroupsService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard) // Aplică JWT și PermissionsGuard
  @Post('createGroup')
  async createGroup(@Body() data: Partial<Group>): Promise<Group> {
    return this.groupService.createGroup(data);
  }
  @UseGuards(JwtAuthGuard, PermissionsGuard) // Aplică JWT și PermissionsGuard
  @Get('allGroups')
  async getAllGroups(): Promise<Group[]> {
    return this.groupService.getAllGroups();
  }
  @UseGuards(JwtAuthGuard, PermissionsGuard) // Aplică JWT și PermissionsGuard
  @Get('getGroup/:id')
  async getGroupById(@Param('id') id: number): Promise<Group> {
    return this.groupService.getGroupById(id);
  }
}
