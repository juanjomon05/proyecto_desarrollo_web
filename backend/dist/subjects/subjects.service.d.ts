import { Repository } from 'typeorm';
import { Subject } from './entities/subject.entity.js';
import { CreateSubjectDto } from './dto/create-subject.dto.js';
import { UpdateSubjectDto } from './dto/update-subject.dto.js';
export declare class SubjectsService {
    private subjectsRepository;
    constructor(subjectsRepository: Repository<Subject>);
    findAll(): Promise<Subject[]>;
    findByUserId(userId: number): Promise<Subject[]>;
    findOne(id: number): Promise<Subject | null>;
    create(createSubjectDto: CreateSubjectDto): Promise<Subject>;
    update(id: number, updateSubjectDto: UpdateSubjectDto): Promise<Subject | null>;
    delete(id: number): Promise<void>;
}
