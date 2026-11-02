// internal imports
import { SubjectsService } from '../../subjects/subjects.service'
import { SubjectsValidator } from '../../subjects/subjects.validator'

export default defineEventHandler((event) => {
  const id = SubjectsValidator.parseId(getRouterParam(event, 'id'))
  return SubjectsService.findOne(id)
})
