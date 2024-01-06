/* eslint-disable @typescript-eslint/no-unused-vars */
import * as bcrypt from 'bcryptjs';


import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {

    constructor(

        private userService : UsersService ,
        private jwtService : JwtService

        ){}
    
    @Post('/signup')
    async register( @Body() createUserDto:CreateUserDto){
        createUserDto.password = await bcrypt.hash (createUserDto.password , 10);
        return this.userService.create(createUserDto);

    }

    @HttpCode(HttpStatus.OK)
    @Post('/login')
    async login(@Body() LoginUserDto:UpdateUserDto , @Res() res:Response){
        
        const user = await this.userService.findByUserName(LoginUserDto.username);
        if (!user) throw new HttpException('el usuario no existe' , HttpStatus.NOT_FOUND);



        if(!LoginUserDto.password) throw new HttpException('escribe la contraseña' , HttpStatus.NOT_ACCEPTABLE);



        const passOK = await bcrypt.compare(LoginUserDto.password , user.password);

        if(!passOK) throw new HttpException('la contraseña no esta bien' , HttpStatus.UNAUTHORIZED);


       const payload = {username : user.username , rol : user.rol}
        const access_token =  await this.jwtService.signAsync(payload);
        const refresh_token =  await this.jwtService.signAsync(payload , {expiresIn:'1h'});

        res.cookie('access_token' , access_token , {httpOnly: true , secure: true ,sameSite: 'strict'});
        res.cookie('refresh_token' , refresh_token , {httpOnly: true , secure: true ,sameSite: 'strict'});


        res.json({access_token , refresh_token }) ;


       
    }

    @Post('/refresh')
    async refresh(@Body() body , @Res() res:Response , @Req() req:Request){
        let actual_refresh_token = body.refresh_token;

        if(!actual_refresh_token){
            actual_refresh_token = req.cookies.refresh_token
        }

        try {
            const payload = await this.jwtService.verifyAsync(actual_refresh_token);

            delete payload.exp;
            const access_token =  await this.jwtService.signAsync(payload);
            const refresh_token =  await this.jwtService.signAsync(payload , {expiresIn:'1h'});
    
            res.cookie('access_token' , access_token , {httpOnly: true , secure: true ,sameSite: 'strict'});
            res.cookie('refresh_token' , refresh_token , {httpOnly: true , secure: true ,sameSite: 'strict'});
    
    
            res.json({access_token , refresh_token }) ;

            // const user = this.userService.findByUserName(payload.username);
            //return payload;
            // return user;
             
         } catch {
             throw new UnauthorizedException();
         }
 
    }


    @Get('/validation')
    async validarToken(@Req() req:Request){
        const token = this.extractTokenFromHeader(req);

       

        try {
           const payload = await this.jwtService.verifyAsync(token);
           // const user = this.userService.findByUserName(payload.username);
           return payload;
           // return user;
            
        } catch {
            throw new UnauthorizedException();
        }


    }
    



    private extractTokenFromHeader(req : Request):string | undefined{

       const [type , token ] = req.headers.authorization?.split(" ") ?? [];

       return (type ==='Bearer' ? token : undefined);
    }



}
