import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../service/user.s';
import { RegisterRequest } from '../dto/request/RegisterRequest.dto';
import { LoginRequest } from '../dto/request/LoginRequest.dto';
import { RegisterResponse } from '../dto/response/registerResponse.dto';
import { LoginResponse } from '../dto/response/loginResponse.dto';
import { User } from 'src/model/user.m';
import { ApiResponse } from 'src/dto/response/apiResponse';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() request: RegisterRequest): Promise<ApiResponse<RegisterResponse>> {
    const user: User = await this.userService.register(request);

    // Create a new RegisterResponse instance using the constructor
    const registerResponse = new RegisterResponse(user.id, user.email, user.createdAt);

    // Create the ApiResponse using the builder pattern
    const response: ApiResponse<RegisterResponse> = ApiResponse.builder<RegisterResponse>()
      .withStatusCode(201) // HTTP status code for created
      .withMessage('User registered successfully')
      .withData(registerResponse) // Pass the new RegisterResponse instance
      .build();

    return response;
  }

  @Post('login')
  async login(@Body() request: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    const user: User = await this.userService.login(request);

    // Create a new LoginResponse instance using the constructor
    const loginResponse = new LoginResponse(200, "Login successful");

    // Create the ApiResponse using the builder pattern
    const response: ApiResponse<LoginResponse> = ApiResponse.builder<LoginResponse>() // Ensure the type is passed
      .withStatusCode(200)
      .withMessage('Login successful')
      .withData(loginResponse) // Pass the new LoginResponse instance
      .build();

    return response;
  }
}
