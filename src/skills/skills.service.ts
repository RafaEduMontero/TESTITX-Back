import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { SKIll_REPOSITORY, SkillRepository } from './skill.repository';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { UsersService } from 'src/users/users.service';
import { COLLABORATOR_REPOSITORY, CollaboratorRepository } from 'src/collaborator/collaborator.repository';

@Injectable()
export class SkillsService {
    private readonly logger = new Logger(SkillsService.name);

    constructor(
        @Inject(SKIll_REPOSITORY) private readonly skillRepository:SkillRepository,
        @Inject(COLLABORATOR_REPOSITORY) private readonly collaboratorRepository: CollaboratorRepository
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
        const skill = await this.skillRepository.updateSkill(id,updateSkillDto);
        await this.collaboratorRepository.updateManyByIdSkill(skill);
        return skill;
      }
    
      async deleteById(id: string) {
        return await this.skillRepository.deleteSkill(id);
      }
    
      async removeById(id:string){
        return await this.skillRepository.removeSkill(id);
      }
}
