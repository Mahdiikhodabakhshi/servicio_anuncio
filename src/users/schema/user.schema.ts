import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { tipousario } from "./enum";

@Schema()
export class User {

    @Prop({required:true})
    username:string;

    @Prop({required:true})
    password:string;

    @Prop({required:true})
    nombre:string;

    @Prop({default : tipousario.usuario})
    rol:tipousario;
}

export const UserSchema = SchemaFactory.createForClass(User);
