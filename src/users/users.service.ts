import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { USER_REPOSITORY, UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { COLLABORATOR_REPOSITORY, CollaboratorRepository } from 'src/collaborator/collaborator.repository';
import { MAILER_REPOSITORY, MailerRepository } from 'src/mailer/mailer.repository';
import { SendMailDto } from 'src/mailer/dto/email.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
     @Inject(MAILER_REPOSITORY) private readonly mailerRepository:MailerRepository,
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    @Inject(COLLABORATOR_REPOSITORY) private readonly collaboratorRepository: CollaboratorRepository,
  ) {}

  async findAll() {
    return this.userRepository.findAll();
  }

  async findById(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException(`User not found ${id}`);
    }

    return user;
  }

  async createUser(createUserDto: CreateUserDto) {
    this.logger.log('Creating user in the users service');
    return await this.userRepository.createUser(createUserDto);
  }

  async updateUser(updateUserDto: UpdateUserDto, id: string) {
    const user = await this.userRepository.updateUser(id,updateUserDto)
    await this.collaboratorRepository.updateManyByIdUser(user);
    const sendMaildto:SendMailDto ={
      recipients:[{name: `${user.name} ${user.surname}`,address: user.email }],
      subject: 'Actualización de Datos de Usuario',
      html: `<p><strong>Hola</strong></p>
      <p>${user.name} ${user.surname}. Te contamos que Actualizamos tus datos</p>`
    }
    await this.mailerRepository.sendMail(sendMaildto);
    return user;
  }

  async deleteById(id: string) {
    return await this.userRepository.deleteUser(id);
  }

  async removeById(id:string){
    return await this.userRepository.removeUser(id);
  }
}