// src/app/components/left-nav/left-nav.component.ts
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService, Role } from '../../services/auth.service';

@Component({
  selector: 'app-left-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './left-nav.component.html',
  styleUrl: './left-nav.component.css',
})
export class LeftNavComponent implements OnInit {
  userRole: Role = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Subscribe to role changes so the menu updates instantly on login/logout
    this.authService.userRole$.subscribe((role) => {
      this.userRole = role;
    });
  }
}
