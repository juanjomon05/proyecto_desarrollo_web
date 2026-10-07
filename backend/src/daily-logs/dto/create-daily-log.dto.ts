// external imports
import {
  IsInt,
  IsISO8601,
  IsNumber,
  Matches,
  Max,
  Min,
} from 'class-validator';

export class CreateDailyLogDto {
  @IsInt()
  userId: number;

  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'date must be in the format YYYY-MM-DD',
  })
  @IsISO8601({ strict: true })
  date: string;

  @IsNumber()
  @Min(0)
  @Max(24)
  studyHours: number;

  @IsNumber()
  @Min(0)
  @Max(24)
  sleepHours: number;
}