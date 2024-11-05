import { Controller, Get, Patch, Req, Res, Body, HttpStatus, UseGuards, Query } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from '../service/user.s';
import { ApiResponse } from '../dto/response/apiResponse';
import { ProfileResponse } from '../dto/response/ProfileResponse.dto';
import { User } from '../model/user.m';
import { JwtAuthGuard } from '../auth/jwtAuth.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Query('email') userEmail: string, @Res() res: Response): Promise<void> {
        if (!userEmail) {
          const errorResponse: ApiResponse<null> = ApiResponse.builder<null>()
          .withStatusCode(HttpStatus.UNAUTHORIZED)
          .withMessage('User not authenticated')
          .withData(null)
          .build();
      res.status(HttpStatus.UNAUTHORIZED).json(errorResponse);
      return;
        }

        try {
            const user: User = await this.userService.findByEmail(userEmail);
            const profileResponse = new ProfileResponse(user);

            const response: ApiResponse<ProfileResponse> = ApiResponse.builder<ProfileResponse>()
                .withStatusCode(HttpStatus.OK)
                .withMessage('User profile retrieved successfully')
                .withData(profileResponse)
                .build();

            res.status(HttpStatus.OK).json(response);
        } catch (error) {
            const errorMessage = error.message || 'Failed to retrieve profile';
            const errorResponse: ApiResponse<null> = ApiResponse.builder<null>()
                .withStatusCode(HttpStatus.BAD_REQUEST)
                .withMessage(errorMessage)
                .withData(null)
                .build();

            res.status(HttpStatus.BAD_REQUEST).json(errorResponse);
        }
    }
}
