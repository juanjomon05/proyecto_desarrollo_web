import { Repository } from 'typeorm';
import { DailyLog } from './entities/daily-log.entity.js';
import { CreateDailyLogDto } from './dto/create-daily-log.dto.js';
import { UpdateDailyLogDto } from './dto/update-daily-log.dto.js';
export declare class DailyLogsService {
    private dailyLogsRepository;
    constructor(dailyLogsRepository: Repository<DailyLog>);
    findAll(): Promise<DailyLog[]>;
    findByUserId(userId: number): Promise<DailyLog[]>;
    create(createDailyLogDto: CreateDailyLogDto): Promise<DailyLog>;
    update(id: number, updateDailyLogDto: UpdateDailyLogDto): Promise<DailyLog | null>;
    delete(id: number): Promise<void>;
}
