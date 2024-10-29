import { Body, Controller, Post, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express'; 
import { UserService } from '../service/user.s';
import { RegisterRequest } from '../dto/request/RegisterRequest.dto';
import { LoginRequest } from '../dto/request/LoginRequest.dto';
import { RegisterResponse } from '../dto/response/registerResponse.dto';
import { LoginResponse } from '../dto/response/loginResponse.dto';
import { User } from '../model/user.m';
import { ApiResponse } from '../dto/response/apiResponse';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() request: RegisterRequest, @Res() res: Response): Promise<void> {
    try {
      const user = await this.userService.register(request);
      const registerResponse = new RegisterResponse(user.id, user.email, user.createdAt);

      const response: ApiResponse<RegisterResponse> = ApiResponse.builder<RegisterResponse>()
        .withStatusCode(HttpStatus.CREATED)
        .withMessage('User registered successfully')
        .withData(registerResponse)
        .build();

      res.status(HttpStatus.CREATED).json(response); 
    } catch (error) {
      const errorMessage = error.message || 'Registration failed';
      const errorResponse: ApiResponse<null> = ApiResponse.builder<null>()
        .withStatusCode(HttpStatus.BAD_REQUEST)
        .withMessage(errorMessage)
        .withData(null)
        .build();
      
      res.status(HttpStatus.BAD_REQUEST).json(errorResponse);
    }
  }

  @Post('login')
  async login(@Body() request: LoginRequest, @Res() res: Response): Promise<void> {
    try {
      const user: User = await this.userService.login(request);
  
      const loginResponse = new LoginResponse(200, "Login successful");
  
      const response: ApiResponse<LoginResponse> = ApiResponse.builder<LoginResponse>()
        .withStatusCode(HttpStatus.OK)
        .withMessage('Request api successful')
        .withData(loginResponse)
        .build();
  
      res.set('Access-Control-Allow-Origin', '*');
      res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
      res.set('Access-Control-Allow-Credentials', 'true');
  
      res.status(HttpStatus.OK).json(response); 
    } catch (error) {
      const errorMessage = error.message || 'Login failed';
      const loginResponse = new LoginResponse(HttpStatus.UNAUTHORIZED, errorMessage);
  
      const response: ApiResponse<LoginResponse> = ApiResponse.builder<LoginResponse>()
        .withStatusCode(HttpStatus.UNAUTHORIZED)
        .withMessage('Authentication failed')
        .withData(loginResponse)
        .build();
  
      res.set('Access-Control-Allow-Origin', '*');
      res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
      res.set('Access-Control-Allow-Credentials', 'true');
  
      res.status(HttpStatus.UNAUTHORIZED).json(response);
    }
  }
}
