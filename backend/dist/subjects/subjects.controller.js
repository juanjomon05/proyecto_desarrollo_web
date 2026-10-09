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
import { SubjectsService } from './subjects.service.js';
import { CreateSubjectDto } from './dto/create-subject.dto.js';
import { UpdateSubjectDto } from './dto/update-subject.dto.js';
let SubjectsController = class SubjectsController {
    subjectsService;
    constructor(subjectsService) {
        this.subjectsService = subjectsService;
    }
    findAll() {
        return this.subjectsService.findAll();
    }
    findByUserId(userId) {
        return this.subjectsService.findByUserId(userId);
    }
    findOne(id) {
        return this.subjectsService.findOne(id);
    }
    create(createSubjectDto) {
        return this.subjectsService.create(createSubjectDto);
    }
    update(id, updateSubjectDto) {
        return this.subjectsService.update(id, updateSubjectDto);
    }
    delete(id) {
        return this.subjectsService.delete(id);
    }
};
__decorate([
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubjectsController.prototype, "findAll", null);
__decorate([
    Get('user/:userId'),
    __param(0, Param('userId', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SubjectsController.prototype, "findByUserId", null);
__decorate([
    Get(':id'),
    __param(0, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SubjectsController.prototype, "findOne", null);
__decorate([
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateSubjectDto]),
    __metadata("design:returntype", Promise)
], SubjectsController.prototype, "create", null);
__decorate([
    Patch(':id'),
    __param(0, Param('id', ParseIntPipe)),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdateSubjectDto]),
    __metadata("design:returntype", Promise)
], SubjectsController.prototype, "update", null);
__decorate([
    Delete(':id'),
    __param(0, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SubjectsController.prototype, "delete", null);
SubjectsController = __decorate([
    Controller('subjects'),
    __metadata("design:paramtypes", [SubjectsService])
], SubjectsController);
export { SubjectsController };
//# sourceMappingURL=subjects.controller.js.map