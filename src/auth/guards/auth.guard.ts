import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService, TokenExpiredError } from "@nestjs/jwt";
import { Request, Response } from "express";

@Injectable()
 export class authGuard implements CanActivate{
    constructor(private jwtService:JwtService){}

    async canActivate(context: ExecutionContext):  Promise<boolean>  {
       const request = context.switchToHttp().getRequest();

       let token = this.extractTokenFromHeader(request);
       if(!token){
         token = request.cookies.access_token
       }
       if(!token) throw new UnauthorizedException();

       
       
       //validar access token
       try {
          const payload = await this.jwtService.verifyAsync(token);
          // const user = this.userService.findByUserName(payload.username);
         // return payload;
          // return user;
          request['user'] = payload;
           
       } catch(e) { // no valido, por algún motivo
            if(e instanceof TokenExpiredError){
               // access_token caducado
               // obtener y validar refresh_token (desde cookies)

               token = request.cookies.refresh_token;
               if(!token) throw new UnauthorizedException();

                // validar refresh_token
               try{
                  const payload = await this.jwtService.verifyAsync(token);
                  delete payload.exp; // para eliminar timestamp expiración
         

                  // generar nuevos tokens


                  const access_token =  await this.jwtService.signAsync(payload);
                     const refresh_token =  await this.jwtService.signAsync(payload , {expiresIn:'1h'});
            
                     // almacenar en cookies
                     const response:Response = context.switchToHttp().getResponse();
                     response.cookie('access_token' , access_token , {httpOnly: true , secure: true ,sameSite: 'strict'});
                     response.cookie('refresh_token' , refresh_token , {httpOnly: true , secure: true ,sameSite: 'strict'});
                     request['user'] = payload;

                     return true;   // permitir continuar (tokens auto actualizados)
               }catch{
                  // error validando refresh_token
                  throw new UnauthorizedException();
               }
            }else{
               throw new UnauthorizedException();
            }
           
       } 
       return true;
    }

    private extractTokenFromHeader(req : Request):string | undefined{

        const [type , token ] = req.headers.authorization?.split(" ") ?? [];
 
        return (type ==='Bearer' ? token : undefined);
     }
}