// src/app/guards/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Ensure session is loaded if user accessed URL directly
  if (!authService.currentRole) {
    authService.loadTokenFromStorage();
  }

  const userRole = authService.currentRole;

  // 1. If not logged in at all, send to unauthorized (or a login page)
  if (!userRole) {
    return router.parseUrl('/unauthorized');
  }

  // 2. Check if the user's role matches the required roles for this route
  const requiredRoles = route.data['roles'] as string[];
  if (requiredRoles && requiredRoles.includes(userRole)) {
    return true; // Access granted
  }

  // 3. User is logged in but doesn't have permission for this specific route
  return router.parseUrl('/unauthorized');
};
