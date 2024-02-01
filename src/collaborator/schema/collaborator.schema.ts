import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';
import { SkillDocument } from 'src/skills/schema/skill.schema';
import { UserDocument } from 'src/users/schema/user.schema';


@Schema()
class Collaborator {

    @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true, index: true })
    user: UserDocument;

    @Prop()
    skills:SkillDocument[]

    @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop({default: false})
  isDeleted:boolean;
}

export type CollaboratorDocument = Collaborator & Document;

export const CollaboratorSchema = SchemaFactory.createForClass(Collaborator);

export type CollaboratorModel = Model<CollaboratorDocument>;