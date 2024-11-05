import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class ProfileRequest {
    @IsOptional()
    @IsEmail()
    email: string;
}
