// loginResponse.dto.ts
export class LoginResponse {
    loginCode: number;
    message: string;

    constructor(loginCode: number, message: string) {
        this.loginCode = loginCode;
        this.message = message;
    }
}
