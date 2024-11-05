export class LoginResponse {
    loginCode: number;
    message: string;
    token: string;

    constructor(loginCode: number, message: string, token: string) {
        this.loginCode = loginCode;
        this.message = message;
        this.token = token;
    }
}
