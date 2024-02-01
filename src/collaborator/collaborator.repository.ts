import { Collaborator } from './entities/collaborator.entity';
import { CollaboratorDto } from './dto/collaborator.dto';
import { User } from 'src/users/entities/user.entity';
export const COLLABORATOR_REPOSITORY = 'CollaboratorRepository';

export interface CollaboratorRepository {
  findAll(): Promise<Collaborator[]>;
  findById(id:string): Promise<Collaborator>;
  createCollaborator(createCollaboratorDto: CollaboratorDto): Promise<Collaborator>;
  deleteCollaborator(id:string): Promise<Collaborator>;
  removeCollaborator(id:string): Promise<Collaborator>;
  updateCollaborator(id:string,CollaboratorUpdate:CollaboratorDto): Promise<Collaborator>;
  updateManyByIdUser(user:User):Promise<void>;
}