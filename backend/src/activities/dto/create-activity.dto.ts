// external imports
import {
  IsIn,
  IsInt,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateActivityDto {
  @IsInt()
  subjectId: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  title: string;

  @IsIn(['tarea', 'quiz', 'examen', 'proyecto'])
  type: string;

  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'dueDate must be in the format YYYY-MM-DD',
  })
  @IsISO8601({ strict: true })
  dueDate: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  weight: number | null;
}