import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { tipousuario } from "./enum";

@Schema()
export class User {

   

    @Prop({required:true})
    username:string;

    @Prop({required:true})
    password:string;

    @Prop({required:true  })
    nombre:string;

    @Prop({default : tipousuario.usuario})
    rol:tipousuario;

     
}

export const UserSchema = SchemaFactory.createForClass(User);
