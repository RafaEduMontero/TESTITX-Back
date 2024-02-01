import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Collaborator } from "./entities/collaborator.entity";
import { CollaboratorDocument, CollaboratorModel } from "./schema/collaborator.schema";
import { CollaboratorRepository } from './collaborator.repository';
import { CollaboratorDto } from "./dto/collaborator.dto";
import { User } from "src/users/entities/user.entity";
import { Skill } from "src/skills/entities/skill.entity";

@Injectable()
export class CollaboratorMongoRepository implements CollaboratorRepository{
    
    constructor(@InjectModel(Collaborator.name) private collaboratorModel:CollaboratorModel){}

    async findAll(): Promise<Collaborator[]> {
        const skills =  await this.collaboratorModel.find({isDeleted:{$ne:true}});
        return skills.map((skill) => this.mapToCollaborator(skill));
    }
    
    async findById(id: string): Promise<Collaborator> {
        try{
            const collaboratorRecord = await this.collaboratorModel.findById(id.trim()).exec();
    
          if(!collaboratorRecord || collaboratorRecord.isDeleted){
            throw new NotFoundException("Registro no encontrado");
          }
    
          return this.mapToCollaborator(collaboratorRecord);
          }catch(error){
            throw new BadRequestException(error.message);
          }
    }
    
    async createCollaborator(createCollaboratorDto: CollaboratorDto): Promise<Collaborator> {
        try{

            const collaboratorCreated = await this.collaboratorModel.create(createCollaboratorDto);
            return this.mapToCollaborator(collaboratorCreated);
        }catch(error){
            if(error.code === 11000){
                throw new HttpException(`Existe un colaborador con el mismo usuario`,HttpStatus.BAD_REQUEST)
            } else {
              // Otras excepciones, manejar según sea necesario
              throw error;
            }
        }
    }

    async deleteCollaborator(id: string): Promise<Collaborator> {
        const collaboratorRecord = await this.findById(id);
        const collaboratorDeleted = await this.collaboratorModel.findByIdAndUpdate(collaboratorRecord.id,{$set: {isDeleted: !collaboratorRecord.isDeleted}},{new:true,runValidators:true});
        return this.mapToCollaborator(collaboratorDeleted);
    }

    async removeCollaborator(id: string): Promise<Collaborator> {
        const collaboratorRemove = await this.collaboratorModel.findByIdAndDelete(id);
        return this.mapToCollaborator(collaboratorRemove);
    }

    async updateCollaborator(id: string, collaboratorUpdate: CollaboratorDto): Promise<Collaborator> {
        const collaboratorUpdateOK = await this.collaboratorModel.findByIdAndUpdate(id,collaboratorUpdate,{new:true});
        return this.mapToCollaborator(collaboratorUpdateOK);
    }

    private mapToCollaborator(rawCollaborator: CollaboratorDocument): Collaborator {
        const collaborator = new Collaborator();
    
        collaborator.id = rawCollaborator.id;
        collaborator.user = rawCollaborator.user;
        collaborator.skills = rawCollaborator.skills;
    
        return collaborator;
      }

    async updateManyByIdUser(user:User):Promise<void>{
        await this.collaboratorModel.updateMany(
            { 'user.id': user.id },
            { $set: { 'user': user } },
          );
    }

    async updateManyByIdSkill(skill:Skill):Promise<void>{
        await this.collaboratorModel.updateMany(
            { 'skills': { $elemMatch: { id: skill.id } } },
            { $set: { 'skills.$.title': skill.title, 'skills.$.description': skill.description } },
        );
    }
}