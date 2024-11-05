// src/auth/auth.service.ts
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../service/user.s';
import { RegisterRequest } from '../dto/request/RegisterRequest.dto';
import { LoginRequest } from '../dto/request/LoginRequest.dto';
import { LoginResponse } from '../dto/response/LoginResponse.dto';
import { RegisterResponse } from '../dto/response/RegisterResponse.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(request: RegisterRequest): Promise<RegisterResponse> {
    const { email, password } = request;
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userService.create({ email, password: hashedPassword });

    // const payload = { username: newUser.email, sub: newUser.id };
    // const token = this.jwtService.sign(payload);

    return new RegisterResponse(newUser.id, newUser.email, newUser.createdAt);
  }

  async login(request: LoginRequest): Promise<LoginResponse> {
    const { email, password } = request;
    const user = await this.userService.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);

    return new LoginResponse(200, 'Login successful', token);
  }
}
