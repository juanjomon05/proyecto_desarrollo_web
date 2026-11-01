// internal imports
import { SubjectsService } from '../../subjects/subjects.service'

export default defineEventHandler(() => SubjectsService.findAll())