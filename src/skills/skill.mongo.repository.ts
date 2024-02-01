import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { SkillRepository } from "./skill.repository";
import { InjectModel } from "@nestjs/mongoose";
import { Skill } from "./entities/skill.entity";
import { SkillDocument, SkillModel } from "./schema/skill.schema";
import { CreateSkillDto } from "./dto/create-skill.dto";
import { UpdateSkillDto } from "./dto/update-skill.dto";

@Injectable()
export class SkillMongoRepository implements SkillRepository{
    constructor(@InjectModel(Skill.name) private skillModel:SkillModel){}

    async findAll(): Promise<Skill[]> {
        const skills =  await this.skillModel.find();
        return skills.map((skill) => this.mapToSkill(skill));
    }
    
    async findById(id: string): Promise<Skill> {
        try{
            const skillRecord = await this.skillModel.findById(id.trim()).exec();
    
          if(!skillRecord || skillRecord.isDeleted){
            throw new NotFoundException("Registro no encontrado");
          }
    
          return this.mapToSkill(skillRecord);
          }catch(error){
            throw new BadRequestException(error.message);
          }
    }
    
    async createSkill(createSkillDto: CreateSkillDto): Promise<Skill> {
        try{
            const skillCreated = await this.skillModel.create(createSkillDto);
            return this.mapToSkill(skillCreated);
        }catch(error){
            if(error.code === 11000){
                throw new Error('Ya existe un registro con el mismo título.');
            } else {
              // Otras excepciones, manejar según sea necesario
              throw error;
            }
        }
    }
    
    async deleteSkill(id: string): Promise<Skill> {
        const skillRecord = await this.findById(id);
        const skillDeleted = await this.skillModel.findByIdAndUpdate(skillRecord.id,{$set: {isDeleted: !skillRecord.isDeleted}},{new:true,runValidators:true});
        return this.mapToSkill(skillDeleted);
    }
    
    async removeSkill(id: string): Promise<Skill> {
        const skillRemove = await this.skillModel.findByIdAndDelete(id);
        return this.mapToSkill(skillRemove);
    }
    
    async updateSkill(id: string, skillUpdate: UpdateSkillDto): Promise<Skill> {
        const skillUpdateOK = await this.skillModel.findByIdAndUpdate(id,skillUpdate,{new:true});
        return this.mapToSkill(skillUpdateOK);
    }

    private mapToSkill(rawSkill: SkillDocument): Skill {
        const skill = new Skill();
    
        skill.id = rawSkill.id;
        skill.title = rawSkill.title;
        skill.description = rawSkill.description;
        skill.state = rawSkill.state;
        skill.createdAt = rawSkill.createdAt;
        skill.updatedAt = rawSkill.updatedAt;
    
        return skill;
      }
}
