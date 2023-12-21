import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/users/schema/user.schema";

@Schema()
export class Anuncio {

    @Prop({required:true})
    titulo: string;


    @Prop({required:true})
    descripcion: string;


    @Prop({type : mongoose.Schema.Types.ObjectId , ref:'User'})
    usuario:User;



}


export const anuncioSchema = SchemaFactory.createForClass(Anuncio);
