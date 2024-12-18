import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupController } from './groups.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Group, GroupSchema } from './groups.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
  ],
  controllers: [GroupController],
  providers: [GroupsService],
  exports: [GroupsService],
})
export class GroupModule {}
