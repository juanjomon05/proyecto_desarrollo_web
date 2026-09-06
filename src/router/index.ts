// src/router/index.ts
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import SubjectsView from '@/views/SubjectsView.vue'
import SubjectDetailView from '@/views/SubjectDetailView.vue'
import ActivitiesView from '@/views/ActivitiesView.vue'
import ActivityFormView from '@/views/ActivityFormView.vue'
import TrackingView from '@/views/TrackingView.vue'
import AdminSubjectsView from '@/views/AdminSubjectsView.vue'
import AdminDashboardView from '@/views/AdminDashboardView.vue'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    requiresAdmin?: boolean
  }
}

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/login', name: 'login', component: LoginView },

  { path: '/subjects', name: 'subjects', component: SubjectsView, meta: { requiresAuth: true } },
  { path: '/subjects/:id', name: 'subject-detail', component: SubjectDetailView, meta: { requiresAuth: true } },

  { path: '/activities', name: 'activities', component: ActivitiesView, meta: { requiresAuth: true } },
  { path: '/activities/new', name: 'activity-new', component: ActivityFormView, meta: { requiresAuth: true } },
  { path: '/activities/:id/edit', name: 'activity-edit', component: ActivityFormView, meta: { requiresAuth: true } },

  { path: '/tracking', name: 'tracking', component: TrackingView, meta: { requiresAuth: true } },

  { path: '/admin/subjects', name: 'admin-subjects', component: AdminSubjectsView, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/admin/dashboard', name: 'admin-dashboard', component: AdminDashboardView, meta: { requiresAuth: true, requiresAdmin: true } }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  const userStore = useUserStore()

  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    return { name: 'login' }
  }

  if (to.meta.requiresAdmin && !userStore.isAdmin) {
    return { name: 'home' }
  }
})

export default router
