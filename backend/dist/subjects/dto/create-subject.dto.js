var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsInt, IsNotEmpty, IsOptional, IsString, Max, MaxLength, Min, } from 'class-validator';
export class CreateSubjectDto {
    name;
    professor;
    credits;
    userId;
}
__decorate([
    IsString(),
    IsNotEmpty(),
    MaxLength(100),
    __metadata("design:type", String)
], CreateSubjectDto.prototype, "name", void 0);
__decorate([
    IsString(),
    IsNotEmpty(),
    MaxLength(100),
    __metadata("design:type", String)
], CreateSubjectDto.prototype, "professor", void 0);
__decorate([
    IsInt(),
    Min(1),
    Max(20),
    __metadata("design:type", Number)
], CreateSubjectDto.prototype, "credits", void 0);
__decorate([
    IsOptional(),
    IsInt(),
    __metadata("design:type", Number)
], CreateSubjectDto.prototype, "userId", void 0);
//# sourceMappingURL=create-subject.dto.js.map