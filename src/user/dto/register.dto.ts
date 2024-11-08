import { IsString, IsEmail } from 'class-validator';

export class RegisterDto {
    @IsEmail()
    readonly email: string

    @IsString()
    readonly password: string
    
    @IsString()
    readonly name: string
}
