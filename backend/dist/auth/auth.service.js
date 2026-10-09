var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ConflictException, Injectable, UnauthorizedException, } from '@nestjs/common';
import { verifyPassword } from '../common/password.js';
import { UsersService } from '../users/users.service.js';
let AuthService = class AuthService {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    async login(loginDto) {
        const user = await this.usersService.findOneByEmail(loginDto.email);
        if (!user || !(await verifyPassword(loginDto.password, user.password))) {
            throw new UnauthorizedException('Correo o contraseña incorrectos.');
        }
        return user;
    }
    async register(registerDto) {
        const existingUser = await this.usersService.findOneByEmail(registerDto.email);
        if (existingUser) {
            throw new ConflictException('Ese correo ya está registrado.');
        }
        return this.usersService.create({
            name: registerDto.name,
            email: registerDto.email,
            password: registerDto.password,
            role: 'student',
        });
    }
};
AuthService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [UsersService])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map