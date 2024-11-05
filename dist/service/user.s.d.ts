import { Model } from 'mongoose';
import { User } from '../model/user.m';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<User>);
    create(userData: {
        email: string;
        password: string;
    }): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    getProfile(userId: string): Promise<User>;
}
