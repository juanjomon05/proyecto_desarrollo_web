<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ActivityForm from '@/components/ActivityForm.vue'
import type { Activity } from '@/models/Activity'

const route = useRoute()
const router = useRouter()

const activityId = computed<string | undefined>(() =>
  typeof route.params.id === 'string' ? route.params.id : undefined
)

function handleSaved(_activity: Activity): void {
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
