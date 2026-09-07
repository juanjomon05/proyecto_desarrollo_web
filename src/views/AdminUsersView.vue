<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAllUsers, deleteUser, updateUserRole } from '@/services/userService'
import DataTable from '@/components/DataTable.vue'
import type { User } from '@/models/User'
import type { UserRole } from '@/models/types'

const users = ref<User[]>([])

const columns = [
  { key: 'name', label: 'Nombre' },
  { key: 'email', label: 'Correo' },
  { key: 'role', label: 'Rol' }
]

onMounted(loadUsers)

function loadUsers(): void {
  users.value = getAllUsers()
}

function handleDelete(user: User): void {
  if (user.role === 'admin') return
  if (confirm(`¿Eliminar la cuenta de ${user.name}?`)) {
    deleteUser(user.id)
    loadUsers()
  }
}

function handleRoleChange(user: User, role: UserRole): void {
  if (user.role === 'admin') return
  updateUserRole(user.id, role)
  loadUsers()
}
</script>

<template>
  <div class="page">
    <div class="page-header">
      <h1>Administrar usuarios</h1>
    </div>

    <div class="card">
      <DataTable :columns="columns" :rows="users" row-key="id" empty-text="No hay usuarios registrados.">
        <template #cell-role="{ row }">
          <select
            class="input role-select"
            :value="row.role"
            :disabled="row.role === 'admin'"
            @change="handleRoleChange(row, ($event.target as HTMLSelectElement).value as UserRole)"
          >
            <option value="student">Estudiante</option>
            <option value="admin">Administrador</option>
          </select>
        </template>

        <template #actions="{ row }">
          <div class="actions-row">
            <button
              type="button"
              class="btn btn-danger btn-sm"
              :disabled="row.role === 'admin'"
              @click="handleDelete(row)"
            >
              Eliminar
            </button>
          </div>
        </template>
      </DataTable>
    </div>
  </div>
</template>

<style scoped>
.actions-row {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.role-select {
  padding: 6px 10px;
  font-size: 0.85rem;
}
</style>
