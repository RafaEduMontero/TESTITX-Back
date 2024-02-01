import { CreateSkillDto } from "./dto/create-skill.dto";
import { UpdateSkillDto } from "./dto/update-skill.dto";
import { Skill } from "./entities/skill.entity";

export const SKIll_REPOSITORY = 'SkillRepository';

export interface SkillRepository {
  findAll(): Promise<Skill[]>;
  findById(id:string): Promise<Skill>;
  createSkill(createSkillDto: CreateSkillDto): Promise<Skill>;
  deleteSkill(id:string): Promise<Skill>;
  removeSkill(id:string): Promise<Skill>;
  updateSkill(id:string,SkillUpdate:UpdateSkillDto): Promise<Skill>;
}