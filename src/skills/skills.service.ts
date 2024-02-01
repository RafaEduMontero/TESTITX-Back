import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { SKIll_REPOSITORY, SkillRepository } from './skill.repository';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SkillsService {
    private readonly logger = new Logger(SkillsService.name);

    constructor(
        @Inject(SKIll_REPOSITORY) private readonly skillRepository:SkillRepository
    ){}

    async findAll() {
        return this.skillRepository.findAll();
      }
    
      async findById(id: string) {
        const skill = await this.skillRepository.findById(id);
    
        if (!skill) {
          throw new NotFoundException(`Skill not found ${id}`);
        }
        
        return skill;
      }
    
      async createSkill(createSkillDto: CreateSkillDto) {
        this.logger.log('Creating skill in the skills service');
        return await this.skillRepository.createSkill(createSkillDto);
      }
    
      async updateSkill(updateSkillDto: UpdateSkillDto, id: string) {
        const user = await this.skillRepository.updateSkill(id,updateSkillDto)
        return user;
      }
    
      async deleteById(id: string) {
        return await this.skillRepository.deleteSkill(id);
      }
    
      async removeById(id:string){
        return await this.skillRepository.removeSkill(id);
      }
}
