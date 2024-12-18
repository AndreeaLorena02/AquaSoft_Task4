/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class Group {

  @Prop({ type: String, required: true, maxlength: 100 }) // Numele grupului, NOT NULL
  group_name: string;

  @Prop({ type: String, default: null }) // Descrierea, poate fi NULL
  description?: string;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
