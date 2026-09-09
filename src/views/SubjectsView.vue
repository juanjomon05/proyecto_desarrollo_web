<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { SubjectService } from '@/services/subjectService'
import Modal from '@/components/Modal.vue'
import SubjectForm from '@/components/SubjectForm.vue'
import type { SubjectInterface } from '@/interfaces/SubjectInterface'

const userStore = useUserStore()
const subjects = ref<SubjectInterface[]>([])
const isModalOpen = ref(false)

function loadSubjects(): void {
  if (userStore.currentUser) {
    subjects.value = SubjectService.getSubjectsByUser(userStore.currentUser.id)
  }
}

onMounted(loadSubjects)

function handleSaved(): void {
  isModalOpen.value = false
  loadSubjects()
}
</script>

<template>
  <div class="page">
    <div class="page-header">
      <h1>Mis materias</h1>
      <button type="button" class="btn btn-primary" @click="isModalOpen = true">+ Agregar materia</button>
    </div>

    <div v-if="subjects.length" class="grid grid-cards">
      <router-link
        v-for="subject in subjects"
        :key="subject.id"
        :to="`/subjects/${subject.id}`"
        class="subject-card card"
      >
        <h3>{{ subject.name }}</h3>
        <p>{{ subject.professor }}</p>
        <span class="subject-card__credits">{{ subject.credits }} créditos</span>
      </router-link>
    </div>

    <div v-else class="card empty-state">No tienes materias registradas todavía.</div>

    <Modal v-if="isModalOpen" title="Nueva materia" @close="isModalOpen = false">
      <SubjectForm @saved="handleSaved" />
    </Modal>
  </div>
</template>

<style scoped>
.subject-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-decoration: none;
  transition: transform 0.12s ease, box-shadow 0.12s ease;
}

.subject-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.subject-card h3 {
  font-size: 1.05rem;
  color: var(--color-text);
}

.subject-card__credits {
  margin-top: 8px;
  align-self: flex-start;
  background: var(--color-primary-light);
  color: var(--color-primary);
  font-size: 0.76rem;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 999px;
}
</style>
