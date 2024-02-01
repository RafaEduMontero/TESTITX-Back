import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';

@Schema()
class Skill{
  @Prop({ index: true, required: true , unique:true})
    title:string

    @Prop()
    description:string

    @Prop({default:false})
    state:boolean

    @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop({default: false})
  isDeleted:boolean;
}

export type SkillDocument = Skill & Document;

export const SkillSchema = SchemaFactory.createForClass(Skill);

export type SkillModel = Model<SkillDocument>;