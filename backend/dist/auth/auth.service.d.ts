import { UsersService } from '../users/users.service.js';
import { User } from '../users/entities/user.entity.js';
import { LoginDto } from './dto/login.dto.js';
import { RegisterDto } from './dto/register.dto.js';
export declare class AuthService {
    private usersService;
    constructor(usersService: UsersService);
    login(loginDto: LoginDto): Promise<User>;
    register(registerDto: RegisterDto): Promise<User>;
}
