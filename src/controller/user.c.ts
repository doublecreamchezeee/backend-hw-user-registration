import { Body, Controller, Post, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express'; // Import Response for setting CORS headers
import { UserService } from '../service/user.s'; // Adjust import path as necessary
import { RegisterRequest } from '../dto/request/RegisterRequest.dto'; // Adjust import path as necessary
import { LoginRequest } from '../dto/request/LoginRequest.dto'; // Adjust import path as necessary
import { RegisterResponse } from '../dto/response/registerResponse.dto'; // Adjust import path as necessary
import { LoginResponse } from '../dto/response/loginResponse.dto'; // Adjust import path as necessary
import { User } from '../model/user.m'; // Adjust import path as necessary
import { ApiResponse } from '../dto/response/apiResponse'; // Adjust import path as necessary

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() request: RegisterRequest, @Res() res: Response): Promise<void> {
    try {
      const user: User = await this.userService.register(request);

      // Create a new RegisterResponse instance using the constructor
      const registerResponse = new RegisterResponse(user.id, user.email, user.createdAt);

      // Create the ApiResponse using the builder pattern
      const response: ApiResponse<RegisterResponse> = ApiResponse.builder<RegisterResponse>()
        .withStatusCode(HttpStatus.CREATED) // HTTP status code for created
        .withMessage('User registered successfully')
        .withData(registerResponse) // Pass the new RegisterResponse instance
        .build();

      // Set CORS headers
      res.set('Access-Control-Allow-Origin', '*');
      res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
      res.set('Access-Control-Allow-Credentials', 'true');

      // Send the response
      res.status(HttpStatus.CREATED).json(response); 
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }

  @Post('login')
  async login(@Body() request: LoginRequest, @Res() res: Response): Promise<void> {
    try {
      const user: User = await this.userService.login(request);

      // Create a new LoginResponse instance using the constructor
      const loginResponse = new LoginResponse(200, "Login successful");

      // Create the ApiResponse using the builder pattern
      const response: ApiResponse<LoginResponse> = ApiResponse.builder<LoginResponse>()
        .withStatusCode(HttpStatus.OK)
        .withMessage('Login successful')
        .withData(loginResponse) // Pass the new LoginResponse instance
        .build();

      // Set CORS headers
      res.set('Access-Control-Allow-Origin', '*');
      res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
      res.set('Access-Control-Allow-Credentials', 'true');

      // Send the response
      res.status(HttpStatus.OK).json(response); 
    } catch (error) {
      res.status(HttpStatus.UNAUTHORIZED).json({
        message: error.message,
      });
    }
  }
}
