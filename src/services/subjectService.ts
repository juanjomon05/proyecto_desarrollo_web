import { useSubjectStore } from '@/stores/subjectStore'
import type { SubjectInterface } from '@/interfaces/SubjectInterface'
import type { CreateSubjectDTO } from '@/dtos/CreateSubjectDTO'
import type { UpdateSubjectDTO } from '@/dtos/UpdateSubjectDTO'

export class SubjectService {
  static getSubjects(): SubjectInterface[] {
    return useSubjectStore().subjects.map(subject => ({
      ...subject,
      credits: Number(subject.credits)
    }))
  }

  static getSubjectsByUser(userId: string): SubjectInterface[] {
    return this.getSubjects().filter(subject => subject.userId === userId)
  }

  static getSubjectById(id: string): SubjectInterface | null {
    return this.getSubjects().find(subject => subject.id === id) || null
  }

  static createSubject({ name, professor, credits, userId }: CreateSubjectDTO): SubjectInterface {
    const subject: SubjectInterface = {
      id: crypto.randomUUID(),
      name,
      professor,
      credits: Number(credits),
      userId
    }

    useSubjectStore().subjects.push(subject)
    return subject
  }

  static updateSubject(id: string, changes: UpdateSubjectDTO): SubjectInterface | null {
    const store = useSubjectStore()
    const index = store.subjects.findIndex(subject => subject.id === id)
    if (index === -1) return null

    const updatedSubject: SubjectInterface = {
      ...store.subjects[index],
      ...changes,
      credits: changes.credits === undefined ? store.subjects[index].credits : Number(changes.credits)
    }

    store.subjects[index] = updatedSubject
    return updatedSubject
  }

  static deleteSubject(id: string): void {
    const store = useSubjectStore()
    store.subjects = store.subjects.filter(subject => subject.id !== id)
  }
}

export function getAllSubjects(): SubjectInterface[] {
  return SubjectService.getSubjects()
}

export function getSubjectsByUser(userId: string): SubjectInterface[] {
  return SubjectService.getSubjectsByUser(userId)
}

export function getSubjectById(id: string): SubjectInterface | null {
  return SubjectService.getSubjectById(id)
}

export function createSubject(data: CreateSubjectDTO): SubjectInterface {
  return SubjectService.createSubject(data)
}

export function updateSubject(id: string, changes: UpdateSubjectDTO): SubjectInterface | null {
  return SubjectService.updateSubject(id, changes)
}

export function deleteSubject(id: string): void {
  SubjectService.deleteSubject(id)
}
