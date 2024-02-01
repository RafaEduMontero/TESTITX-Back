import { Controller,Get,Post,Delete,Put,Body, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private userService:UsersService){}

    @Get()
    findAll(){
        return this.userService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id:string){
        return this.userService.findById(id);
    }

    @Post()
    create(@Body() body : CreateUserDto){
        return this.userService.createUser(body);
    }

    @Patch('delete/:id')
    delete(@Param('id') id:string){
        return this.userService.deleteById(id);
    }

    @Delete(':id')
    remove(@Param('id') id:string){
        return this.userService.removeById(id);
    }

    @Put(':id')
    update(@Param('id') id:string,@Body() body :UpdateUserDto){
        return this.userService.updateUser(body,id);
    }
}
