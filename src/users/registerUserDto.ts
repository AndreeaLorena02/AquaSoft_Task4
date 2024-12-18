/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsMongoId, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsNotEmpty()
  @IsMongoId()
  idRole: string;
}
