import { AuthService } from './auth.service.js';
import { User } from '../users/entities/user.entity.js';
import { LoginDto } from './dto/login.dto.js';
import { RegisterDto } from './dto/register.dto.js';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<User>;
    register(registerDto: RegisterDto): Promise<User>;
}
