import { User } from '../../model/user.m';

export class ProfileResponse {
    id: string;
    email: string;
    createdAt: Date;

    constructor(user: User) {
        this.id = user.id;
        this.email = user.email;
        this.createdAt = user.createdAt;
    }
}
