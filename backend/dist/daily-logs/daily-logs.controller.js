var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, } from '@nestjs/common';
import { DailyLogsService } from './daily-logs.service.js';
import { CreateDailyLogDto } from './dto/create-daily-log.dto.js';
import { UpdateDailyLogDto } from './dto/update-daily-log.dto.js';
let DailyLogsController = class DailyLogsController {
    dailyLogsService;
    constructor(dailyLogsService) {
        this.dailyLogsService = dailyLogsService;
    }
    findAll() {
        return this.dailyLogsService.findAll();
    }
    findByUserId(userId) {
        return this.dailyLogsService.findByUserId(userId);
    }
    create(createDailyLogDto) {
        return this.dailyLogsService.create(createDailyLogDto);
    }
    update(id, updateDailyLogDto) {
        return this.dailyLogsService.update(id, updateDailyLogDto);
    }
    delete(id) {
        return this.dailyLogsService.delete(id);
    }
};
__decorate([
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DailyLogsController.prototype, "findAll", null);
__decorate([
    Get('user/:userId'),
    __param(0, Param('userId', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DailyLogsController.prototype, "findByUserId", null);
__decorate([
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateDailyLogDto]),
    __metadata("design:returntype", Promise)
], DailyLogsController.prototype, "create", null);
__decorate([
    Patch(':id'),
    __param(0, Param('id', ParseIntPipe)),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdateDailyLogDto]),
    __metadata("design:returntype", Promise)
], DailyLogsController.prototype, "update", null);
__decorate([
    Delete(':id'),
    __param(0, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DailyLogsController.prototype, "delete", null);
DailyLogsController = __decorate([
    Controller('daily-logs'),
    __metadata("design:paramtypes", [DailyLogsService])
], DailyLogsController);
export { DailyLogsController };
//# sourceMappingURL=daily-logs.controller.js.map