import { Skill } from "src/skills/entities/skill.entity";
import { User } from "src/users/entities/user.entity";

export class CollaboratorDto{
    user:User;

    skills:Skill[];
}