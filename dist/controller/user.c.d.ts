import { Response } from 'express';
import { UserService } from '../service/user.s';
import { RegisterRequest } from '../dto/request/RegisterRequest.dto';
import { LoginRequest } from '../dto/request/LoginRequest.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(request: RegisterRequest, res: Response): Promise<void>;
    login(request: LoginRequest, res: Response): Promise<void>;
}
