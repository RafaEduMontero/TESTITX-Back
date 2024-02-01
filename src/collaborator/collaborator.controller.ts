import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { CollaboratorService } from './collaborator.service';
import { CollaboratorDto } from './dto/collaborator.dto';

@Controller('collaborator')
export class CollaboratorController {
    constructor(private collaboratorService:CollaboratorService){}

    @Get()
    findAll(){
        return this.collaboratorService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id:string){
        return this.collaboratorService.findById(id);
    }

    @Post()
    create(@Body() body : CollaboratorDto){
        return this.collaboratorService.createCollaborator(body);
    }

    @Patch('delete/:id')
    delete(@Param('id') id:string){
        try{
            return this.collaboratorService.deleteById(id);
        }catch(error)
        {
            console.log(error)
        }
    }

    @Delete(':id')
    remove(@Param('id') id:string){
        return this.collaboratorService.removeById(id);
    }

    @Put(':id')
    update(@Param('id') id:string,@Body() body :CollaboratorDto){
        return this.collaboratorService.updateCollaborator(body,id);
    }
}
