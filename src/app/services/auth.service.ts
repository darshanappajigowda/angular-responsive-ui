// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

export type Role = 'dev' | 'admin' | null;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private userRole = new BehaviorSubject<Role>(null);

  get isLoggedIn$(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  get userRole$(): Observable<Role> {
    return this.userRole.asObservable();
  }

  get currentRole(): Role {
    return this.userRole.value;
  }

  constructor() {
    // When the app loads (e.g., user hits a URL directly), check if a token exists
    this.loadTokenFromStorage();
  }

  // Simulated method to fetch and decode token
  fetchTokenAndAuthenticate(
    userId: string
  ): Observable<{ success: boolean; role: Role }> {
    // Mock API simulation: Replace this with your actual API call
    let role: Role = null;
    let success = false;

    if (userId === 'ADMIN_USER') {
      role = 'admin';
      success = true;
    } else if (userId === 'DEV_USER') {
      role = 'dev';
      success = true;
    }

    return of({ success, role }).pipe(
      delay(1000), // Simulate network latency
      tap((response) => {
        if (response.success && response.role) {
          this.setSession(true, response.role, 'mock-jwt-token-string');
        } else {
          this.clearSession();
        }
      })
    );
  }

  setSession(isValid: boolean, role: Role, token: string) {
    this.loggedIn.next(isValid);
    this.userRole.next(role);
    if (token && role) {
      localStorage.setItem('authToken', token);
      localStorage.setItem('userRole', role); // In a real app, decode this from the JWT instead
    }
  }

  clearSession() {
    this.loggedIn.next(false);
    this.userRole.next(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
  }

  loadTokenFromStorage() {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole') as Role;

    if (token && role) {
      // In a real application, you would validate token expiration here
      this.loggedIn.next(true);
      this.userRole.next(role);
    }
  }
}
