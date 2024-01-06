import { Module } from '@nestjs/common';
import { AnunciosService } from './anuncios.service';
import { AnunciosController } from './anuncios.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Anuncio, anuncioSchema } from './schema/anuncio.schema';
import { authGuard } from 'src/auth/guards/auth.guard';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [AnunciosController],
  providers: [AnunciosService,authGuard,UsersService],
  imports : [
    UsersModule,
    
    MongooseModule.forFeature([{name : Anuncio.name , schema : anuncioSchema}])
  ],
  exports : [
    MongooseModule.forFeature([{name : Anuncio.name , schema : anuncioSchema}])

  ]

})
export class AnunciosModule {}
