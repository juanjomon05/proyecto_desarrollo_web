// external imports
import type { Router } from 'vue-router'

// internal imports
import { AuthService } from '@/services/authService'

export function configureRouterGuards(router: Router): void {
  router.beforeEach((to) => {
    if (to.meta.requiresAuth && !AuthService.isLoggedIn()) {
      return { name: 'login' }
    }

    if (to.meta.requiresAdmin && !AuthService.isAdmin()) {
      return { name: 'home' }
    }
  })
}
