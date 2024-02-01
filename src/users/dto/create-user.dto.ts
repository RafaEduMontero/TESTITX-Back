import { IsString, IsNumber, IsNotEmpty, IsOptional, IsEmpty, MinLength, MaxLength, Matches } from 'class-validator';


export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    name:string;

    @IsString()
    @IsNotEmpty()
    surname:string;

    @IsString()
    @MinLength(6)
    @MaxLength(12)
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: "La contraseña debe tener letras mayúsculas, minúsculas y números",
      })
    password?:string;

    @IsNumber()
    @IsNotEmpty()
    age: number;

    @IsString()
    @IsNotEmpty()
    position:string;

    @IsOptional()
    isDeleted:boolean
}