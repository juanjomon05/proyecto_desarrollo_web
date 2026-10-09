var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, } from 'typeorm';
import { User } from '../../users/entities/user.entity.js';
let Subject = class Subject {
    id;
    name;
    professor;
    credits;
    userId;
    user;
    createdAt;
    updatedAt;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Subject.prototype, "id", void 0);
__decorate([
    Column({ length: 100 }),
    __metadata("design:type", String)
], Subject.prototype, "name", void 0);
__decorate([
    Column({ length: 100 }),
    __metadata("design:type", String)
], Subject.prototype, "professor", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Subject.prototype, "credits", void 0);
__decorate([
    Column({ type: 'integer', nullable: true }),
    __metadata("design:type", Object)
], Subject.prototype, "userId", void 0);
__decorate([
    ManyToOne(() => User, { onDelete: 'CASCADE' }),
    __metadata("design:type", User)
], Subject.prototype, "user", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Subject.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], Subject.prototype, "updatedAt", void 0);
Subject = __decorate([
    Entity('subjects')
], Subject);
export { Subject };
//# sourceMappingURL=subject.entity.js.map