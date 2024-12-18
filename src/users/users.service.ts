/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { Permission } from 'src/permissions/permissions.schema';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UsersService {


    constructor(
      @InjectModel(User.name) private readonly userModel: Model<User>,
      @InjectModel(Permission.name) private permissionModel: Model<Permission>,
      private readonly jwtService: JwtService,


  ) {}

    async createUser(userData:any): Promise<User> {
      const travelerPermission = await this.permissionModel.findOne({ name: 'Traveler' }).exec();

    if (!travelerPermission) {
      throw new NotFoundException('Permission with name "Traveler" not found');
    }

    // Setează permissionId în datele user-ului
    userData.permissionId = travelerPermission._id;

    // Creează user-ul și salvează în baza de date
    const newUser = new this.userModel(userData);
    return newUser.save();
    }


   async validateUser(email: string, password: string): Promise<any> {
      const user: User = await this.findByEmail(email);
      if (user && (await user.comparePassword(password))) {
        const { password, ...result } = user.toObject();
        return result;
      }
      throw new UnauthorizedException('Invalid credentials');
    }

    async login(userData: { email: string; password: string }) {
      // Verifică utilizatorul folosind validateUser
      const user = await this.validateUser(userData.email, userData.password);
    
      // Dacă utilizatorul este valid, generează token-ul JWT
      const payload = {
        email: user.email,
        sub: user._id,
        permissionId: user.permissionId, // Adaugă permissionId în payload
      };
      return {
        access_token: this.jwtService.sign(payload),
        user: user
    }
  }
    
  
    async getUsers(): Promise<User[]> {
      return this.userModel.find().exec();
    }


    async findByEmail(email: string) {
      return this.userModel.findOne({ email }).exec();
    }
    

    
}
