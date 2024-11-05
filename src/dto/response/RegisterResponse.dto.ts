export class RegisterResponse {
    id: string;
    email: string;
    createdAt: Date;

    constructor(id: string, email: string, createdAt: Date) {
        this.id = id;
        this.email = email;
        this.createdAt = createdAt;
    }
}
