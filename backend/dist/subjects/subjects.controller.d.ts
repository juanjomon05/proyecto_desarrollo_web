import { SubjectsService } from './subjects.service.js';
import { Subject } from './entities/subject.entity.js';
import { CreateSubjectDto } from './dto/create-subject.dto.js';
import { UpdateSubjectDto } from './dto/update-subject.dto.js';
export declare class SubjectsController {
    private readonly subjectsService;
    constructor(subjectsService: SubjectsService);
    findAll(): Promise<Subject[]>;
    findByUserId(userId: number): Promise<Subject[]>;
    findOne(id: number): Promise<Subject | null>;
    create(createSubjectDto: CreateSubjectDto): Promise<Subject>;
    update(id: number, updateSubjectDto: UpdateSubjectDto): Promise<Subject | null>;
    delete(id: number): Promise<void>;
}
