// external imports
import {
  IsISO8601,
  IsNumber,
  IsOptional,
  Matches,
  Max,
  Min,
} from 'class-validator';

export class UpdateDailyLogDto {
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'date must be in the format YYYY-MM-DD',
  })
  @IsISO8601({ strict: true })
  date?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(24)
  studyHours?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(24)
  sleepHours?: number;
}