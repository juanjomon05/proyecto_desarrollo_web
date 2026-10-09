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
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DailyLog } from './entities/daily-log.entity.js';
let DailyLogsService = class DailyLogsService {
    dailyLogsRepository;
    constructor(dailyLogsRepository) {
        this.dailyLogsRepository = dailyLogsRepository;
    }
    findAll() {
        return this.dailyLogsRepository.find();
    }
    findByUserId(userId) {
        return this.dailyLogsRepository.find({
            where: { userId },
            order: { date: 'ASC' },
        });
    }
    create(createDailyLogDto) {
        const dailyLog = this.dailyLogsRepository.create(createDailyLogDto);
        return this.dailyLogsRepository.save(dailyLog);
    }
    async update(id, updateDailyLogDto) {
        const dailyLog = await this.dailyLogsRepository.findOneBy({ id });
        if (!dailyLog) {
            return null;
        }
        this.dailyLogsRepository.merge(dailyLog, updateDailyLogDto);
        return this.dailyLogsRepository.save(dailyLog);
    }
    async delete(id) {
        await this.dailyLogsRepository.delete(id);
    }
};
DailyLogsService = __decorate([
    Injectable(),
    __param(0, InjectRepository(DailyLog)),
    __metadata("design:paramtypes", [Repository])
], DailyLogsService);
export { DailyLogsService };
//# sourceMappingURL=daily-logs.service.js.map