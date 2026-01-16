import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-left-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './left-nav.component.html',
  styleUrl: './left-nav.component.css',
})
export class LeftNavComponent {}
