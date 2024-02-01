import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

export const USER_REPOSITORY = 'UserRepository';

export interface UserRepository {
  findAll(): Promise<User[]>;
  findById(id:string): Promise<User>;
  createUser(createUserDto: CreateUserDto): Promise<User>;
  deleteUser(id:string): Promise<User>;
  removeUser(id:string): Promise<User>;
  updateUser(id:string,userUpdate:UpdateUserDto): Promise<User>;
}