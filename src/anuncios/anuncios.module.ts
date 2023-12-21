import { Module } from '@nestjs/common';
import { AnunciosService } from './anuncios.service';
import { AnunciosController } from './anuncios.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Anuncio, anuncioSchema } from './schema/anuncio.schema';

@Module({
  controllers: [AnunciosController],
  providers: [AnunciosService],
  imports : [
    MongooseModule.forFeature([{name : Anuncio.name , schema : anuncioSchema}])
  ],
  exports : [
    MongooseModule.forFeature([{name : Anuncio.name , schema : anuncioSchema}])

  ]

})
export class AnunciosModule {}
