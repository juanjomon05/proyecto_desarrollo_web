<script setup lang="ts">
// external imports
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// internal imports
import ActivityForm from '@/components/ActivityForm.vue'

// variables
const route = useRoute()
const router = useRouter()

// computed variables
const activityId = computed<number | undefined>(() =>
  typeof route.params.id === 'string' ? Number(route.params.id) : undefined
)

// handlers
function handleSaved(): void {
  router.push('/activities')
}
</script>

<template>
  <div class="page">
    <div class="page-header">
      <h1>{{ activityId ? 'Editar actividad' : 'Nueva actividad' }}</h1>
    </div>

    <div class="card form-card">
      <ActivityForm :activity-id="activityId" @saved="handleSaved" />
    </div>
  </div>
</template>

<style scoped>
.form-card {
  max-width: 480px;
}
</style>
