import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterRequest {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
