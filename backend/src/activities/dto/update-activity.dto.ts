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

export class UpdateActivityDto {
  @IsOptional()
  @IsInt()
  subjectId?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  title?: string;

  @IsOptional()
  @IsIn(['tarea', 'quiz', 'examen', 'proyecto'])
  type?: string;

  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'dueDate must be in the format YYYY-MM-DD',
  })
  @IsISO8601({ strict: true })
  dueDate?: string;

  @IsOptional()
  @IsIn(['pendiente', 'en progreso', 'completada'])
  status?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  grade?: number | null;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  weight?: number | null;
}