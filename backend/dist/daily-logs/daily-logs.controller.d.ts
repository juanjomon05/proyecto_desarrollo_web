import { DailyLogsService } from './daily-logs.service.js';
import { DailyLog } from './entities/daily-log.entity.js';
import { CreateDailyLogDto } from './dto/create-daily-log.dto.js';
import { UpdateDailyLogDto } from './dto/update-daily-log.dto.js';
export declare class DailyLogsController {
    private readonly dailyLogsService;
    constructor(dailyLogsService: DailyLogsService);
    findAll(): Promise<DailyLog[]>;
    findByUserId(userId: number): Promise<DailyLog[]>;
    create(createDailyLogDto: CreateDailyLogDto): Promise<DailyLog>;
    update(id: number, updateDailyLogDto: UpdateDailyLogDto): Promise<DailyLog | null>;
    delete(id: number): Promise<void>;
}
