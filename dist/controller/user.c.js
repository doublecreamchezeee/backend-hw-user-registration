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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_s_1 = require("../service/user.s");
const ApiResponse_dto_1 = require("../dto/response/ApiResponse.dto");
const ProfileResponse_dto_1 = require("../dto/response/ProfileResponse.dto");
const jwtAuth_guard_1 = require("../auth/jwtAuth.guard");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getProfile(userEmail, res) {
        if (!userEmail) {
            const errorResponse = ApiResponse_dto_1.ApiResponse.builder()
                .withStatusCode(common_1.HttpStatus.UNAUTHORIZED)
                .withMessage('User not authenticated')
                .withData(null)
                .build();
            res.status(common_1.HttpStatus.UNAUTHORIZED).json(errorResponse);
            return;
        }
        try {
            const user = await this.userService.findByEmail(userEmail);
            const profileResponse = new ProfileResponse_dto_1.ProfileResponse(user);
            const response = ApiResponse_dto_1.ApiResponse.builder()
                .withStatusCode(common_1.HttpStatus.OK)
                .withMessage('User profile retrieved successfully')
                .withData(profileResponse)
                .build();
            res.status(common_1.HttpStatus.OK).json(response);
        }
        catch (error) {
            const errorMessage = error.message || 'Failed to retrieve profile';
            const errorResponse = ApiResponse_dto_1.ApiResponse.builder()
                .withStatusCode(common_1.HttpStatus.BAD_REQUEST)
                .withMessage(errorMessage)
                .withData(null)
                .build();
            res.status(common_1.HttpStatus.BAD_REQUEST).json(errorResponse);
        }
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.UseGuards)(jwtAuth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Query)('email')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getProfile", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_s_1.UserService])
], UserController);
//# sourceMappingURL=user.c.js.map