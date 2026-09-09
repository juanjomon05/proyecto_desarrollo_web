// src/router/index.ts
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import SubjectsView from '@/views/SubjectsView.vue'
import SubjectDetailView from '@/views/SubjectDetailView.vue'
import ActivitiesView from '@/views/ActivitiesView.vue'
import ActivityFormView from '@/views/ActivityFormView.vue'
import TrackingView from '@/views/TrackingView.vue'
import AdminSubjectsView from '@/views/AdminSubjectsView.vue'
import AdminSubjectFormView from '@/views/AdminSubjectFormView.vue'
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
  { path: '/register', name: 'register', component: RegisterView },

  { path: '/subjects', name: 'subjects', component: SubjectsView, meta: { requiresAuth: true } },
  { path: '/subjects/:id', name: 'subject-detail', component: SubjectDetailView, meta: { requiresAuth: true } },

  { path: '/activities', name: 'activities', component: ActivitiesView, meta: { requiresAuth: true } },
  { path: '/activities/new', name: 'activity-new', component: ActivityFormView, meta: { requiresAuth: true } },
  { path: '/activities/:id/edit', name: 'activity-edit', component: ActivityFormView, meta: { requiresAuth: true } },

  { path: '/tracking', name: 'tracking', component: TrackingView, meta: { requiresAuth: true } },

  { path: '/admin/subjects', name: 'admin-subjects', component: AdminSubjectsView, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/admin/subjects/new', name: 'admin-subject-new', component: AdminSubjectFormView, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/admin/subjects/:id/edit', name: 'admin-subject-edit', component: AdminSubjectFormView, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/admin/dashboard', name: 'admin-dashboard', component: AdminDashboardView, meta: { requiresAuth: true, requiresAdmin: true } }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  const userStore = useUserStore()
  const currentUser = userStore.currentUser

  if (to.meta.requiresAuth && !currentUser) {
    return { name: 'login' }
  }

  if (to.meta.requiresAdmin && currentUser?.role !== 'admin') {
    return { name: 'home' }
  }
})

export default router
