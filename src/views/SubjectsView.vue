<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { getSubjectsByUser } from '@/services/subjectService'
import type { Subject } from '@/models/Subject'

const userStore = useUserStore()
const subjects = ref<Subject[]>([])

onMounted(() => {
  if (userStore.currentUser) {
    subjects.value = getSubjectsByUser(userStore.currentUser.id)
  }
})
</script>

<template>
  <div class="page">
    <div class="page-header">
      <h1>Mis materias</h1>
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
