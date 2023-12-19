import { Injectable } from '@nestjs/common';
import { CreateAnuncioDto } from './dto/create-anuncio.dto';
import { UpdateAnuncioDto } from './dto/update-anuncio.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Anuncio } from './schema/anuncio.schema';
import { Model } from 'mongoose';

@Injectable()
export class AnunciosService {

  constructor(
    @InjectModel(Anuncio.name)  private anuncioModule : Model<Anuncio>
    ){}
  create(createAnuncioDto: CreateAnuncioDto) {
    return 'This action adds a new anuncio';
  }

  findAll() {
    return `This action returns all anuncios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} anuncio`;
  }

  update(id: number, updateAnuncioDto: UpdateAnuncioDto) {
    return `This action updates a #${id} anuncio`;
  }

  remove(id: number) {
    return `This action removes a #${id} anuncio`;
  }
}
