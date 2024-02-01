import { IsEmpty, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateSkillDto {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description:string;

    @IsOptional()
    isDeleted:boolean
}