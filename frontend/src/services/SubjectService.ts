// internal imports
import { useSubjectStore } from '@/stores/SubjectStore'
import type { SubjectInterface } from '@/interfaces/SubjectInterface'
import type { CreateSubjectDTO } from '@/dtos/CreateSubjectDTO'
import type { UpdateSubjectDTO } from '@/dtos/UpdateSubjectDTO'

export class SubjectService {
  static getSubjects(): SubjectInterface[] {
    return useSubjectStore().subjects
  }

  static getSubjectsByUser(userId: string): SubjectInterface[] {
    return this.getSubjects().filter(subject => subject.userId === userId)
  }

  static getSubjectById(id: string): SubjectInterface | null {
    return this.getSubjects().find(subject => subject.id === id) || null
  }

  static createSubject(subject: CreateSubjectDTO): SubjectInterface {
    const createdSubject: SubjectInterface = {
      id: crypto.randomUUID(),
      ...subject
    }

    useSubjectStore().subjects.push(createdSubject)
    return createdSubject
  }

  static updateSubject(id: string, changes: UpdateSubjectDTO): SubjectInterface | null {
    const store = useSubjectStore()
    const index = store.subjects.findIndex(subject => subject.id === id)
    if (index === -1) return null

    const updatedSubject: SubjectInterface = {
      ...store.subjects[index],
      ...changes
    }

    store.subjects[index] = updatedSubject
    return updatedSubject
  }

  static deleteSubject(id: string): void {
    const store = useSubjectStore()
    store.subjects = store.subjects.filter(subject => subject.id !== id)
  }
}
