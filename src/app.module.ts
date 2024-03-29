// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AnunciosModule } from './anuncios/anuncios.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.URL_MONGODB), UsersModule, AnunciosModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
