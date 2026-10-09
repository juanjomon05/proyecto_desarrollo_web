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
import { ActivitiesService } from './activities.service.js';
import { CreateActivityDto } from './dto/create-activity.dto.js';
import { UpdateActivityDto } from './dto/update-activity.dto.js';
let ActivitiesController = class ActivitiesController {
    activitiesService;
    constructor(activitiesService) {
        this.activitiesService = activitiesService;
    }
    findAll() {
        return this.activitiesService.findAll();
    }
    findBySubjectId(subjectId) {
        return this.activitiesService.findBySubjectId(subjectId);
    }
    findByUserId(userId) {
        return this.activitiesService.findByUserId(userId);
    }
    findOne(id) {
        return this.activitiesService.findOne(id);
    }
    create(createActivityDto) {
        return this.activitiesService.create(createActivityDto);
    }
    update(id, updateActivityDto) {
        return this.activitiesService.update(id, updateActivityDto);
    }
    delete(id) {
        return this.activitiesService.delete(id);
    }
};
__decorate([
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ActivitiesController.prototype, "findAll", null);
__decorate([
    Get('subject/:subjectId'),
    __param(0, Param('subjectId', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ActivitiesController.prototype, "findBySubjectId", null);
__decorate([
    Get('user/:userId'),
    __param(0, Param('userId', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ActivitiesController.prototype, "findByUserId", null);
__decorate([
    Get(':id'),
    __param(0, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ActivitiesController.prototype, "findOne", null);
__decorate([
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateActivityDto]),
    __metadata("design:returntype", Promise)
], ActivitiesController.prototype, "create", null);
__decorate([
    Patch(':id'),
    __param(0, Param('id', ParseIntPipe)),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdateActivityDto]),
    __metadata("design:returntype", Promise)
], ActivitiesController.prototype, "update", null);
__decorate([
    Delete(':id'),
    __param(0, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ActivitiesController.prototype, "delete", null);
ActivitiesController = __decorate([
    Controller('activities'),
    __metadata("design:paramtypes", [ActivitiesService])
], ActivitiesController);
export { ActivitiesController };
//# sourceMappingURL=activities.controller.js.map