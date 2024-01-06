import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userSchema : Model<User> ){}

  async create(createUserDto: CreateUserDto):Promise<User> {
    
    const nuevaUsuario = new this.userSchema(createUserDto);

    const otroUsuario= await this.userSchema.findOne({username : nuevaUsuario.username}).exec();
    
    if(otroUsuario) throw new BadRequestException({'message' : 'YA EXISTE USUARIO'});

    
    return nuevaUsuario.save();
  }

  async findAll() : Promise<User[]> {
    return this.userSchema.find().exec();
  }

  async findOne(id: string):Promise<User> {
    return this.userSchema.findById(id).exec();
  }

  async findByUserName(username : string) :Promise<User>{
    return this.userSchema.findOne({username}).exec();
  }
  
  async findByUserNameForAnuncio(username : string) :Promise<any>{
    return this.userSchema.findOne({username}).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto):Promise<User> {
    return this.userSchema.findByIdAndUpdate(
      id ,
      updateUserDto
    ).exec()
  }

  async remove(id: string):Promise<User | unknown> {
    return this.userSchema.findByIdAndDelete(id).exec();
  }
}
