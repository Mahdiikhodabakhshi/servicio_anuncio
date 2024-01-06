import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { tipousuario } from "../schema/enum";

export class CreateUserDto {



    @IsString()
    @IsNotEmpty()
    username:string;

    
    @IsString()
    @IsNotEmpty()
    password:string;

    
    @IsString()
    @IsNotEmpty()
    nombre:string;

    @IsEnum(tipousuario)
    @IsOptional()
    rol:string;

}
