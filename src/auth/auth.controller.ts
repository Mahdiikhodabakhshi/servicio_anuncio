import * as bcrypt from 'bcryptjs';


import { Body, Controller, HttpCode, HttpException, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Controller('auth')
export class AuthController {

    constructor(private userService : UsersService){}
    @Post('/singup')
    async register( @Body() createUserDto:CreateUserDto){
        createUserDto.password = await bcrypt.hash (createUserDto.password , 10);
        return this.userService.create(createUserDto);

    }

    @HttpCode(HttpStatus.OK)
    @Post('/login')
    async loging(@Body() LoginUserDto:UpdateUserDto){
        const user = await this.userService.findByUserName(LoginUserDto.username);
        if (!user) throw new HttpException('el usuario no existe' , HttpStatus.NOT_FOUND);

        const passOK = await bcrypt.compare(LoginUserDto.password , user.password);

        if(!passOK) throw new HttpException('la contraseña no esta bien' , HttpStatus.UNAUTHORIZED)

        return {'token' : '1234'};
    }



}
