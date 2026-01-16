import {
  Component,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Output() menuToggle = new EventEmitter<void>();

  isToolsOpen = false;

  constructor(private elementRef: ElementRef) {}

  toggleTools() {
    this.isToolsOpen = !this.isToolsOpen;
  }

  closeTools() {
    this.isToolsOpen = false;
  }

  // LISTEN FOR CLICKS ANYWHERE IN THE DOCUMENT
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    // If the menu is closed, we don't need to do anything
    if (!this.isToolsOpen) return;

    // Get the target element that was clicked
    const target = event.target as HTMLElement;

    // Check if the click happened inside the "header-right" section
    // (We assume 'header-right' is the container for both the button and the menu)
    const clickedInside = target.closest('.header-right');

    // If the click was NOT inside the header-right section, close the menu
    if (!clickedInside) {
      this.isToolsOpen = false;
    }
  }
}
