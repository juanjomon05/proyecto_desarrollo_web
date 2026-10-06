export class UpdateActivityDto {
  subjectId?: number;
  title?: string;
  type?: string;
  dueDate?: string;
  status?: string;
  grade?: number | null;
  weight?: number | null;
}
