import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAnuncioDto {
    @IsNotEmpty()
    @IsString()
    titulo: string;


    @IsNotEmpty()
    @IsString()
    descripcion: string;


    @IsOptional()
    @IsString()
    usuario:string;
}
