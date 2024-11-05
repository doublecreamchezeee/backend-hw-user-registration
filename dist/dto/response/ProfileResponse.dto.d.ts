import { User } from '../../model/user.m';
export declare class ProfileResponse {
    id: string;
    email: string;
    createdAt: Date;
    constructor(user: User);
}
