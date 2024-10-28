import { Model } from 'mongoose';
import { User } from '../model/user.m';
import { RegisterRequest } from '../dto/request/RegisterRequest.dto';
import { LoginRequest } from '../dto/request/LoginRequest.dto';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<User>);
    register(request: RegisterRequest): Promise<User>;
    login(request: LoginRequest): Promise<User>;
}
