"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const RegisterRequest_dto_1 = require("../dto/request/RegisterRequest.dto");
const LoginRequest_dto_1 = require("../dto/request/LoginRequest.dto");
const registerResponse_dto_1 = require("../dto/response/registerResponse.dto");
const loginResponse_dto_1 = require("../dto/response/loginResponse.dto");
const apiResponse_1 = require("../dto/response/apiResponse");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async register(request, res) {
        try {
            const user = await this.authService.register(request);
            const registerResponse = new registerResponse_dto_1.RegisterResponse(user.id, user.email, user.createdAt);
            const response = apiResponse_1.ApiResponse.builder()
                .withStatusCode(common_1.HttpStatus.CREATED)
                .withMessage('User registered successfully')
                .withData(registerResponse)
                .build();
            res.status(common_1.HttpStatus.CREATED).json(response);
        }
        catch (error) {
            const errorMessage = error.message || 'Registration failed';
            const errorResponse = apiResponse_1.ApiResponse.builder()
                .withStatusCode(common_1.HttpStatus.BAD_REQUEST)
                .withMessage(errorMessage)
                .withData(null)
                .build();
            res.status(common_1.HttpStatus.BAD_REQUEST).json(errorResponse);
        }
    }
    async login(request, res) {
        try {
            const { token } = await this.authService.login(request);
            const loginResponse = new loginResponse_dto_1.LoginResponse(200, "Login successful", token);
            const response = apiResponse_1.ApiResponse.builder()
                .withStatusCode(common_1.HttpStatus.OK)
                .withMessage('Login successful')
                .withData(loginResponse)
                .build();
            res.status(common_1.HttpStatus.OK).json(response);
        }
        catch (error) {
            const errorMessage = error.message || 'Login failed';
            const loginResponse = new loginResponse_dto_1.LoginResponse(common_1.HttpStatus.UNAUTHORIZED, errorMessage, '');
            const response = apiResponse_1.ApiResponse.builder()
                .withStatusCode(common_1.HttpStatus.UNAUTHORIZED)
                .withMessage('Authentication failed')
                .withData(loginResponse)
                .build();
            res.status(common_1.HttpStatus.UNAUTHORIZED).json(response);
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RegisterRequest_dto_1.RegisterRequest, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginRequest_dto_1.LoginRequest, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map