/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { GroupModule } from './groups/groups.module';
import { HotelsModule } from './hotels/hotels.module';
import { AdminModule } from './admin/admin.module';
import { PermissionsModule } from './permissions/permissions.module';
import { GroupManagerModule } from './group-manager/group-manager.module';
import { HotelOffersModule } from './hotel-offers/hotel-offers.module';
import { OffersService } from './offers/offers.service';
import { OffersController } from './offers/offers.controller';
import { OffersModule } from './offers/offers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('STR_MONGO');
        console.log('Connecting to database at:', uri);
        return { uri };
      },
    }),
    UsersModule,GroupModule,HotelsModule, AdminModule,PermissionsModule,GroupModule, GroupManagerModule, HotelOffersModule, OffersModule],
  controllers: [AppController, OffersController],
  providers: [AppService, OffersService],
})
export class AppModule {
  constructor(@InjectConnection() private readonly connection: Connection) { }

  async onModuleInit() {
    this.connection.on('connected', () => {
      console.log('Successfully connected to the database');
    });

    this.connection.on('error', (err) => {
      console.error('Error connecting to the database:', err);
    });
  }
}
