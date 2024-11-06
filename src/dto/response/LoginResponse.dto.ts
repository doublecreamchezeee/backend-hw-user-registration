export class LoginResponse {
    loginCode: number;
    message: string;
    token: string;
    email: string;

    constructor(loginCode: number, message: string, token: string, email: string) {
        this.loginCode = loginCode;
        this.message = message;
        this.token = token;
        this.email = email;
    }
}
