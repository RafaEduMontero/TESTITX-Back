import { Types } from "mongoose";
import { SkillDocument, SkillModel } from "src/skills/schema/skill.schema";
import { UserDocument } from "src/users/schema/user.schema";

export class Collaborator{

    id: string;
    user:UserDocument;
    skills:SkillDocument[];
    createdAt: Date;
    updatedAt: Date;
    isDeleted?:boolean;
}