/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';



@Schema()
export class User extends Document {


  async comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
  }; 


  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true })
  password: string;

  // @Prop({ default: 'Traveler' })
  // role: string;

  @Prop({ type: String }) // Referință pentru permissionId
  permissionId: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({type: String, default: null })
  hotelId: string;

  @Prop({type: String, default: null })
  groupId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);



UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Middleware doar pentru criptarea parolei
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


