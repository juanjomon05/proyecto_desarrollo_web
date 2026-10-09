var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsISO8601, IsNumber, IsOptional, Matches, Max, Min, } from 'class-validator';
export class UpdateDailyLogDto {
    date;
    studyHours;
    sleepHours;
}
__decorate([
    IsOptional(),
    Matches(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'date must be in the format YYYY-MM-DD',
    }),
    IsISO8601({ strict: true }),
    __metadata("design:type", String)
], UpdateDailyLogDto.prototype, "date", void 0);
__decorate([
    IsOptional(),
    IsNumber(),
    Min(0),
    Max(24),
    __metadata("design:type", Number)
], UpdateDailyLogDto.prototype, "studyHours", void 0);
__decorate([
    IsOptional(),
    IsNumber(),
    Min(0),
    Max(24),
    __metadata("design:type", Number)
], UpdateDailyLogDto.prototype, "sleepHours", void 0);
//# sourceMappingURL=update-daily-log.dto.js.map