import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

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
    UsersModule],
  controllers: [AppController],
  providers: [AppService],
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
