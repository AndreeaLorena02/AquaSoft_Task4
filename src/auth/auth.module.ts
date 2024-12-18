/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    PassportModule,
    JwtModule.register({
      secret: 'my_token', // Cheie secretă sigură
      signOptions: { expiresIn: '1h' }, // Token valabil 1 oră
    }),
  ],
  providers: [AuthService, JwtStrategy],
//   controllers: [AuthController],
  exports: [AuthService, JwtModule, PassportModule],

})
export class AuthModule {}
