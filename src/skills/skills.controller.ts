import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';

@Controller('skills')
export class SkillsController {
    constructor(private skillService:SkillsService){}

    @Get()
    findAll(){
        return this.skillService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id:string){
        return this.skillService.findById(id);
    }

    @Post()
    create(@Body() body : CreateSkillDto){
        return this.skillService.createSkill(body);
    }

    @Patch('delete/:id')
    delete(@Param('id') id:string){
        return this.skillService.deleteById(id);
    }

    @Delete(':id')
    remove(@Param('id') id:string){
        return this.skillService.removeById(id);
    }

    @Put(':id')
    update(@Param('id') id:string,@Body() body :UpdateSkillDto){
        return this.skillService.updateSkill(body,id);
    }
}
