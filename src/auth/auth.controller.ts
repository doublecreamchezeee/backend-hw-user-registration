import { Body, Controller, Post, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterRequest } from '../dto/request/RegisterRequest.dto';
import { LoginRequest } from '../dto/request/LoginRequest.dto';
import { RegisterResponse } from '../dto/response/RegisterResponse.dto';
import { LoginResponse } from '../dto/response/LoginResponse.dto';
import { ApiResponse } from '../dto/response/ApiResponse.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() request: RegisterRequest, @Res() res: Response): Promise<void> {
        try {
            const user = await this.authService.register(request);
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
            const { token, email } = await this.authService.login(request);
            const loginResponse = new LoginResponse(200, "Login successful", token, email);

            const response: ApiResponse<LoginResponse> = ApiResponse.builder<LoginResponse>()
                .withStatusCode(HttpStatus.OK)
                .withMessage('Login successful')
                .withData(loginResponse)
                .build();

            res.status(HttpStatus.OK).json(response);
        } catch (error) {
            const errorMessage = error.message || 'Login failed';
            const loginResponse = new LoginResponse(HttpStatus.UNAUTHORIZED, errorMessage, '', '');

            const response: ApiResponse<LoginResponse> = ApiResponse.builder<LoginResponse>()
                .withStatusCode(HttpStatus.UNAUTHORIZED)
                .withMessage('Authentication failed')
                .withData(loginResponse)
                .build();

            res.status(HttpStatus.UNAUTHORIZED).json(response);
        }
    }
}
