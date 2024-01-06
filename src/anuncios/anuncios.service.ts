import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAnuncioDto } from './dto/create-anuncio.dto';
import { UpdateAnuncioDto } from './dto/update-anuncio.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Anuncio } from './schema/anuncio.schema';
import { Model } from 'mongoose';

@Injectable()
export class AnunciosService {

  constructor(
    @InjectModel(Anuncio.name)  private anuncioSchema : Model<Anuncio>
    ){}



  async create(createAnuncioDto: CreateAnuncioDto):Promise<Anuncio> {
    const nuevoAnuncio = new this.anuncioSchema(createAnuncioDto);

    const otrousuario = await this.anuncioSchema.findOne({titulo : nuevoAnuncio.titulo}).exec();

    if(otrousuario) throw new BadRequestException({'message' : 'ya existe este anuncio'});

    return nuevoAnuncio.save();
  }

 
  async findAll() :Promise<any[]> {
    return this.anuncioSchema.find().exec();
  }

  async findOne(id : string):Promise<any> {
    return this.anuncioSchema.findById(id).populate('usuario');
  }

  async update(id : string, updateAnuncioDto: UpdateAnuncioDto) : Promise<Anuncio> {
    return this.anuncioSchema.findByIdAndUpdate(
      id ,
      {$set : updateAnuncioDto},
    );

  }

  async remove(id: string):Promise<Anuncio | unknown> {
    return this.anuncioSchema.findByIdAndDelete(id);
  }
}
