import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, BadRequestException } from '@nestjs/common';
import { AnunciosService } from './anuncios.service';
import { CreateAnuncioDto } from './dto/create-anuncio.dto';
import { UpdateAnuncioDto } from './dto/update-anuncio.dto';
import { authGuard } from 'src/auth/guards/auth.guard';
import { Request } from 'express';
import { Anuncio } from './schema/anuncio.schema';
import { UsersService } from 'src/users/users.service';

@Controller('anuncios')
export class AnunciosController {
  constructor(
    private readonly anunciosService: AnunciosService,
    private userService : UsersService
    ) {}



  @UseGuards(authGuard)
  @Post()
  async create(@Body() createAnuncioDto: CreateAnuncioDto ,  @Req() req:Request):Promise<Anuncio> {
    const userAuth = await req['user'];
     const userID = await this.userService.findByUserNameForAnuncio(userAuth.username);
     console.log(userID);
     console.log(userID._id);
     createAnuncioDto.usuario = userID._id;
    console.log(userAuth);
    return this.anunciosService.create(createAnuncioDto);
  }

//   @Get()
//  async findAll():Promise<Anuncio[]> {
    
//     return this.anunciosService.findAll();
//   }


 

  @Get()
  async findAll():Promise<any> {
    const anun = [];
    await this.anunciosService.findAll()
    .then((data) =>{
      data.map((x) =>{
        anun.push({
          'id':x._id,
          'titulo': x.titulo
      })
        
      })
      console.log(data);
    }).catch(()=>console.log('error'));
    return anun;
  }
 

  @UseGuards(authGuard)
  @Get(':id')
 async findOne(@Param('id') id: string ):Promise<any> {
    const anuncio = await this.anunciosService.findOne(id);
    const an =[] ; 
      if(!anuncio) throw new BadRequestException({'message' : 'no existe anuncio con este ID'});
      an.push({
        'Id':anuncio._id,
        'titulo':anuncio.titulo ,
        'descripcion': anuncio.descripcion ,
        'usuario': {
          'username' :anuncio.usuario.username,
          'name' : anuncio.usuario.nombre
        },
    });
    return an;
  }


  @UseGuards(authGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAnuncioDto: UpdateAnuncioDto, @Req() req:Request): Promise<any> {

    const userAnun = (await this.anunciosService.findOne(id))? (await this.anunciosService.findOne(id)).usuario : null ; 
    if(userAnun === null) throw new BadRequestException({'message' : 'no existe este anuncio'});

    const userAuth = await req['user'];

    console.log(userAuth)
    if(userAuth.rol ==='admin' || userAnun.username === userAuth.username){
      
      this.anunciosService.update(id, updateAnuncioDto);
      
      return ({'message' : 'ha actualizado'});
    }else{
      throw new BadRequestException({'message': 'no tiene permiso'});
    }



    
  }

  @UseGuards(authGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req:Request): Promise<any> {

    const userAnun = (await this.anunciosService.findOne(id))? (await this.anunciosService.findOne(id)).usuario : null ; 
    if(userAnun === null) throw new BadRequestException({'message' : 'no existe este anuncio'});

    const userAuth = await req['user'];

    if(userAuth.rol ==='admin' || userAnun.username === userAuth.username){
       this.anunciosService.remove(id);
      return ({'message' : 'ha borrado'});
    }else{
      throw new BadRequestException({'message': 'no tiene permiso'});
    }
  }


  

}
