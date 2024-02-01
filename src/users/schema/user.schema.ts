import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';


@Schema()
class User {

    @Prop()
    name:string;

    @Prop()
    surname:string;

  @Prop({ index: true, required: true ,unique:true})
  email: string;

  @Prop()
  password: string;

  @Prop()
  age: number;

  @Prop()
    position:string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop({default: false})
  isDeleted:boolean
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);

export type UserModel = Model<UserDocument>;