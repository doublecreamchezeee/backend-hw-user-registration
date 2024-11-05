import { JwtService } from '@nestjs/jwt';
import { UserService } from '../service/user.s';
import { RegisterRequest } from '../dto/request/RegisterRequest.dto';
import { LoginRequest } from '../dto/request/LoginRequest.dto';
import { LoginResponse } from '../dto/response/LoginResponse.dto';
import { RegisterResponse } from '../dto/response/RegisterResponse.dto';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    register(request: RegisterRequest): Promise<RegisterResponse>;
    login(request: LoginRequest): Promise<LoginResponse>;
}
