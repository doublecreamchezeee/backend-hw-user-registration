import { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterRequest } from '../dto/request/RegisterRequest.dto';
import { LoginRequest } from '../dto/request/LoginRequest.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(request: RegisterRequest, res: Response): Promise<void>;
    login(request: LoginRequest, res: Response): Promise<void>;
}
