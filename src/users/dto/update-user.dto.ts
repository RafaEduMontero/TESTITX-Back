import { IsNumber, IsString, IsOptional } from "class-validator";

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    name?:string;

    @IsString()
    @IsOptional()
    surname?:string;

    @IsNumber()
    @IsOptional()
    age?: number;

    @IsString()
    @IsOptional()
    position?:string;
}