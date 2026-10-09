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
let DailyLog = class DailyLog {
    id;
    userId;
    user;
    date;
    studyHours;
    sleepHours;
    createdAt;
    updatedAt;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], DailyLog.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], DailyLog.prototype, "userId", void 0);
__decorate([
    ManyToOne(() => User, { onDelete: 'CASCADE' }),
    __metadata("design:type", User)
], DailyLog.prototype, "user", void 0);
__decorate([
    Column({ type: 'varchar', length: 10 }),
    __metadata("design:type", String)
], DailyLog.prototype, "date", void 0);
__decorate([
    Column({ type: 'real' }),
    __metadata("design:type", Number)
], DailyLog.prototype, "studyHours", void 0);
__decorate([
    Column({ type: 'real' }),
    __metadata("design:type", Number)
], DailyLog.prototype, "sleepHours", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], DailyLog.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], DailyLog.prototype, "updatedAt", void 0);
DailyLog = __decorate([
    Entity('daily_logs')
], DailyLog);
export { DailyLog };
//# sourceMappingURL=daily-log.entity.js.map