/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Schema()
export class User extends Document {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    required: true,
    enum: ['Administrator', 'Hotel Manager', 'Group Manager', 'Traveler', 'Data Operator'],
    default: 'Traveler',
  })
  role: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  // Metodă pentru compararea parolelor
  // async comparePassword(plainPassword: string): Promise<boolean> {
  //   return bcrypt.compare(plainPassword, this.password);
  // }
}

// Schema Factory
export const UserSchema = SchemaFactory.createForClass(User);

// Middleware pentru criptarea parolei
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});
