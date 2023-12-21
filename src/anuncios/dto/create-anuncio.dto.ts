import { IsNotEmpty, IsString } from "class-validator";

export class CreateAnuncioDto {
    @IsNotEmpty()
    @IsString()
    titulo: string;


    @IsNotEmpty()
    @IsString()
    descripcion: string;


    @IsNotEmpty()
    @IsString()
    usuario:String;
}
