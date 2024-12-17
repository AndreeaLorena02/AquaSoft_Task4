/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Permission extends Document {
  @Prop({ required: true, unique: true })
  permissionId: number;
  

  @Prop({ required: true, trim: true })
  name: string;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
