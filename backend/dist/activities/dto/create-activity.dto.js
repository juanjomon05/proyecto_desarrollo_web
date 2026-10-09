var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsIn, IsInt, IsISO8601, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, Max, MaxLength, Min, } from 'class-validator';
export class CreateActivityDto {
    subjectId;
    title;
    type;
    dueDate;
    weight;
}
__decorate([
    IsInt(),
    __metadata("design:type", Number)
], CreateActivityDto.prototype, "subjectId", void 0);
__decorate([
    IsString(),
    IsNotEmpty(),
    MaxLength(150),
    __metadata("design:type", String)
], CreateActivityDto.prototype, "title", void 0);
__decorate([
    IsIn(['tarea', 'quiz', 'examen', 'proyecto']),
    __metadata("design:type", String)
], CreateActivityDto.prototype, "type", void 0);
__decorate([
    Matches(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'dueDate must be in the format YYYY-MM-DD',
    }),
    IsISO8601({ strict: true }),
    __metadata("design:type", String)
], CreateActivityDto.prototype, "dueDate", void 0);
__decorate([
    IsOptional(),
    IsNumber(),
    Min(0),
    Max(100),
    __metadata("design:type", Object)
], CreateActivityDto.prototype, "weight", void 0);
//# sourceMappingURL=create-activity.dto.js.map