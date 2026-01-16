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
  currentUserId: string = 'CO73227';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.checkAuthorization();
  }

  checkAuthorization() {
    this.status = 'loading';

    // 1. Pass User ID to Service
    this.authService.authorizeUser(this.currentUserId).subscribe({
      next: (isAuthorized) => {
        if (isAuthorized) {
          // 2. Success: Set Session & Redirect
          this.authService.setSession(true);
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
