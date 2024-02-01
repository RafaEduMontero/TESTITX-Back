import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { UserDocument, UserModel } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserMongoRepository implements UserRepository {
  constructor(
    @InjectModel(User.name) private userModel: UserModel
    ) {}

  async findAll() {
    const users = await this.userModel.find();
    return users.map((user) => this.mapToUser(user));
  }

  async findById(id:string){
      try{
        const userRecord = await this.userModel.findById(id.trim()).exec();

      if(!userRecord || userRecord.isDeleted){
        throw new NotFoundException("Registro no encontrado");
      }

      return this.mapToUser(userRecord);
      }catch(error){
        throw new BadRequestException(error.message);
      }
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try{
      const userCreated = await this.userModel.create(createUserDto);
      return this.mapToUser(userCreated);
    }catch(error){
      if(error.code === 11000){
        throw new Error('Ya existe un usuario con el mismo email.');
      } else {
        // Otras excepciones, manejar según sea necesario
        throw error;
      }
    }
  }

  async deleteUser(id:string){
    const userRecord = await this.findById(id);
    const userDeleted = await this.userModel.findByIdAndUpdate(userRecord.id,{$set: {isDeleted: !userRecord.isDeleted}},{new:true,runValidators:true});
    return this.mapToUser(userDeleted);
  }

  async removeUser(id:string){
    const userRemove = await this.userModel.findByIdAndDelete(id);
    return this.mapToUser(userRemove);
  }

  async updateUser(id:string, userUpdate:UpdateUserDto){
    const userUpdateOK = await this.userModel.findByIdAndUpdate(id,userUpdate,{new:true});
    return this.mapToUser(userUpdateOK);
  }

  private mapToUser(rawUser: UserDocument): User {
    const user = new User();

    user.id = rawUser.id;
    user.email = rawUser.email;
    user.name = rawUser.name;
    user.surname = rawUser.surname;
    user.age = rawUser.age;
    user.position = rawUser.position;
    user.createdAt = rawUser.createdAt;
    user.updatedAt = rawUser.updatedAt;
    user.isDeleted = rawUser.isDeleted;

    return user;
  }
}