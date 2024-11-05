import { Response } from 'express';
import { UserService } from '../service/user.s';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getProfile(userEmail: string, res: Response): Promise<void>;
}
