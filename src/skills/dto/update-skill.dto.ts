import { IsOptional, IsString } from "class-validator";

export class UpdateSkillDto {

    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?:string;

    @IsString()
    @IsOptional()
    state?:string;
}