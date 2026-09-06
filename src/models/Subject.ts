import { getItem, setItem } from '../services/storage'
import { KEYS } from '../services/storageKeys'
import type { SubjectData, SubjectRecord } from './types'

function getRecords(): SubjectRecord[] {
  return (getItem<SubjectRecord[]>(KEYS.subjects) || []).map(subject => ({
    ...subject,
    credits: Number(subject.credits)
  }))
}

function saveRecords(subjects: SubjectRecord[]): void {
  setItem(KEYS.subjects, subjects)
}

export class Subject implements SubjectData {
  id: string
  name: string
  professor: string
  credits: number

  constructor({ id = crypto.randomUUID(), name, professor, credits }: SubjectData) {
    this.id = id
    this.name = name
    this.professor = professor
    this.credits = Number(credits)
  }

  CRUD(): string[] {
    return ['create', 'read', 'update', 'delete']
  }

  getters(): Required<SubjectData> {
    return {
      id: this.id,
      name: this.name,
      professor: this.professor,
      credits: this.credits
    }
  }

  setters(changes: Partial<SubjectData>): Subject {
    if (changes.id !== undefined) this.id = changes.id
    if (changes.name !== undefined) this.name = changes.name
    if (changes.professor !== undefined) this.professor = changes.professor
    if (changes.credits !== undefined) this.credits = Number(changes.credits)
    return this
  }

  static from(data: SubjectData | null | undefined): Subject | null {
    return data ? new Subject(data) : null
  }

  static getAll(): Subject[] {
    return getRecords().map(subject => Subject.from(subject) as Subject)
  }

  static getByUser(userId: string): Subject[] {
    return getRecords()
      .filter(subject => !subject.userId || subject.userId === userId)
      .map(subject => Subject.from(subject) as Subject)
  }

  static getById(id: string): Subject | null {
    return Subject.getAll().find(subject => subject.id === id) || null
  }

  static create({ name, professor, credits, userId }: Pick<SubjectRecord, 'name' | 'professor' | 'credits'> & { userId?: string }): Subject {
    const subjects = getRecords()
    const newSubject = new Subject({ name, professor, credits })
    subjects.push({ ...newSubject.getters(), userId })
    saveRecords(subjects)
    return newSubject
  }

  static update(id: string, changes: Partial<SubjectRecord>): Subject | null {
    const subjects = getRecords()
    const index = subjects.findIndex(subject => subject.id === id)
    if (index === -1) return null

    const userId = changes.userId ?? subjects[index].userId
    const updatedSubject = new Subject({ ...subjects[index], ...changes })
    subjects[index] = { ...updatedSubject.getters(), userId }
    saveRecords(subjects)
    return updatedSubject
  }

  static delete(id: string): void {
    const subjects = getRecords().filter(subject => subject.id !== id)
    saveRecords(subjects)
  }
}
