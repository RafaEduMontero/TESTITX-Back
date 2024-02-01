import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { COLLABORATOR_REPOSITORY, CollaboratorRepository } from './collaborator.repository';
import { CollaboratorDto } from './dto/collaborator.dto';
import { MAILER_REPOSITORY, MailerRepository } from 'src/mailer/mailer.repository';
import { SendMailDto } from 'src/mailer/dto/email.dto';

@Injectable()
export class CollaboratorService {
    private readonly logger = new Logger(CollaboratorService.name);

    constructor(
        @Inject(MAILER_REPOSITORY) private readonly mailerRepository:MailerRepository,
        @Inject(COLLABORATOR_REPOSITORY) private readonly collaboratorRepository:CollaboratorRepository
    ){}

    async findAll() {
        return this.collaboratorRepository.findAll();
      }
    
      async findById(id: string) {
        const Collaborator = await this.collaboratorRepository.findById(id);
    
        if (!Collaborator) {
          throw new NotFoundException(`Collaborator not found ${id}`);
        }
    
        return Collaborator;
      }
    
      async createCollaborator(createCollaboratorDto: CollaboratorDto) {
        this.logger.log('Creating Collaborator in the Collaborators service');
        return await this.collaboratorRepository.createCollaborator(createCollaboratorDto);
      }
    
      async updateCollaborator(updateCollaboratorDto: CollaboratorDto, id: string) {
        const collaborator = await this.collaboratorRepository.updateCollaborator(id,updateCollaboratorDto)
        const sendMaildto:SendMailDto ={
          recipients:[{name: `${collaborator.user.name} ${collaborator.user.surname}`,address: collaborator.user.email }],
          subject: 'Actualización de Colaborador',
          html: `<p><strong>Hola</strong></p>
          <p>${collaborator.user.name} ${collaborator.user.surname}. Te contamos que actualizamos el estado de tus habilidades</p>`
        }
        await this.mailerRepository.sendMail(sendMaildto);
        return collaborator;
      }
    
      async deleteById(id: string) {
        return await this.collaboratorRepository.deleteCollaborator(id);
      }
    
      async removeById(id:string){
        return await this.collaboratorRepository.removeCollaborator(id);
      }
}
