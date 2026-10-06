// external imports
import axios from 'axios'

// internal imports
import type { SubjectInterface } from '@/interfaces/SubjectInterface'
import type { CreateSubjectDTO } from '@/dtos/CreateSubjectDTO'
import type { UpdateSubjectDTO } from '@/dtos/UpdateSubjectDTO'

export class SubjectService {
  private static readonly API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/subjects`

  static async getSubjects(): Promise<SubjectInterface[]> {
    const { data } = await axios.get<SubjectInterface[]>(this.API_URL)
    return data
  }

  static async getSubjectsByUser(userId: number): Promise<SubjectInterface[]> {
    const { data } = await axios.get<SubjectInterface[]>(`${this.API_URL}/user/${userId}`)
    return data
  }

  static async getSubjectById(id: number): Promise<SubjectInterface | null> {
    const { data } = await axios.get<SubjectInterface | null>(`${this.API_URL}/${id}`)
    return data || null
  }

  static async createSubject(subject: CreateSubjectDTO): Promise<SubjectInterface> {
    const { data } = await axios.post<SubjectInterface>(this.API_URL, subject)
    return data
  }

  static async updateSubject(id: number, changes: UpdateSubjectDTO): Promise<SubjectInterface | null> {
    const { data } = await axios.patch<SubjectInterface | null>(`${this.API_URL}/${id}`, changes)
    return data || null
  }

  static async deleteSubject(id: number): Promise<void> {
    await axios.delete(`${this.API_URL}/${id}`)
  }
}
