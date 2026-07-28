import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // State
  status: 'loading' | 'unauthorized' | 'error' = 'loading';

  // Mocking the ID retrieved from the Browser/SSO Environment
  currentUserId: string = 'ADMIN_USER';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  // Small tweak in home.component.ts
  ngOnInit() {
    if (this.router.url.includes('unauthorized')) {
      this.status = 'unauthorized';
    } else {
      this.checkAuthorization(); // Normal login flow
    }
  }

  checkAuthorization() {
    this.status = 'loading';

    // 1. Call the updated method in AuthService
    this.authService.fetchTokenAndAuthenticate(this.currentUserId).subscribe({
      next: (response) => {
        if (response.success) {
          // 2. Success: The session is already set inside the service's tap() operator,
          // so we just need to redirect the user.
          this.router.navigate(['/deploy']);
        } else {
          // 3. Failure: Show Access Denied UI
          this.status = 'unauthorized';
        }
      },
      error: () => {
        this.status = 'error';
      },
    });
  }

  // Optional: Retry button for error states
  retry() {
    this.checkAuthorization();
  }
}
