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
import { Subject } from '../../subjects/entities/subject.entity.js';
let Activity = class Activity {
    id;
    subjectId;
    subject;
    title;
    type;
    dueDate;
    status;
    grade;
    weight;
    createdAt;
    updatedAt;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Activity.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Activity.prototype, "subjectId", void 0);
__decorate([
    ManyToOne(() => Subject, { onDelete: 'CASCADE' }),
    __metadata("design:type", Subject)
], Activity.prototype, "subject", void 0);
__decorate([
    Column({ length: 150 }),
    __metadata("design:type", String)
], Activity.prototype, "title", void 0);
__decorate([
    Column({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], Activity.prototype, "type", void 0);
__decorate([
    Column({ type: 'varchar', length: 10 }),
    __metadata("design:type", String)
], Activity.prototype, "dueDate", void 0);
__decorate([
    Column({
        type: 'varchar',
        length: 20,
        default: 'pendiente',
    }),
    __metadata("design:type", String)
], Activity.prototype, "status", void 0);
__decorate([
    Column({ type: 'real', nullable: true }),
    __metadata("design:type", Object)
], Activity.prototype, "grade", void 0);
__decorate([
    Column({ type: 'real', nullable: true }),
    __metadata("design:type", Object)
], Activity.prototype, "weight", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Activity.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], Activity.prototype, "updatedAt", void 0);
Activity = __decorate([
    Entity('activities')
], Activity);
export { Activity };
//# sourceMappingURL=activity.entity.js.map