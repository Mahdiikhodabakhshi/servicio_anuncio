import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll():Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string):Promise<User> {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto):Promise<User> {
    //todo
    return this.usersService.update(id, updateUserDto);
  }

  // @Delete(':id')
  // async remove(@Param('id') id: string):Promise<User | unknown> {
  //   return this.usersService.remove(id);
  // }
  @Delete(':id')
  async remove(@Param('id') id: string):Promise<any> {
    if(id.length !=24) throw new BadRequestException({'message' : 'id debe que tener 24 caracteres'});

    const eliminarUsuario = await this.usersService.remove(id);

    if(!eliminarUsuario) throw new BadRequestException({'message': 'no existe este usuario'});

  

    return {'message':`el usuario con id ${id} ha borrado`};
  }
  
  
}
