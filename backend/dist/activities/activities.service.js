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
import { Activity } from './entities/activity.entity.js';
let ActivitiesService = class ActivitiesService {
    activitiesRepository;
    constructor(activitiesRepository) {
        this.activitiesRepository = activitiesRepository;
    }
    findAll() {
        return this.activitiesRepository.find();
    }
    findBySubjectId(subjectId) {
        return this.activitiesRepository.findBy({ subjectId });
    }
    findByUserId(userId) {
        return this.activitiesRepository.findBy({ subject: { userId } });
    }
    findOne(id) {
        return this.activitiesRepository.findOneBy({ id });
    }
    create(createActivityDto) {
        const activity = this.activitiesRepository.create(createActivityDto);
        return this.activitiesRepository.save(activity);
    }
    async update(id, updateActivityDto) {
        const activity = await this.activitiesRepository.findOneBy({ id });
        if (!activity) {
            return null;
        }
        this.activitiesRepository.merge(activity, updateActivityDto);
        return this.activitiesRepository.save(activity);
    }
    async delete(id) {
        await this.activitiesRepository.delete(id);
    }
};
ActivitiesService = __decorate([
    Injectable(),
    __param(0, InjectRepository(Activity)),
    __metadata("design:paramtypes", [Repository])
], ActivitiesService);
export { ActivitiesService };
//# sourceMappingURL=activities.service.js.map