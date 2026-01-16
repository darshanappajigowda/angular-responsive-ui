import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // 1. BehaviorSubject holds the current value
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {}

  // 2. Expose it as an Observable for the template to subscribe to
  get isLoggedIn$(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  authorizeUser(userId: string): Observable<boolean> {
    // Mock logic: Only allow 'CO73227'
    const isValid = userId === 'CO73227';
    return of(isValid).pipe(delay(1500));
  }

  setSession(isValid: boolean) {
    this.loggedIn.next(isValid);
  }
}
