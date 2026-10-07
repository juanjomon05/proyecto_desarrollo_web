// external imports
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateSubjectDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  professor: string;

  @IsInt()
  @Min(1)
  @Max(20)
  credits: number;

  @IsOptional()
  @IsInt()
  userId?: number;
}