import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';

@Component({
  selector: 'app-administration',
  standalone: true,
  imports: [CommonModule, FormsModule, FlatpickrModule],
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css'],
})
export class AdministrationComponent {
  // ... existing form values ...
  action: string = 'Stop';
  environment: string = '';
  domain: string = '';
  adminTarget: string = '';
  adminTime: Date | undefined;

  isSubmitted: boolean = false;

  // Toast State
  toastVisible: boolean = false;
  toastMessage: string = '';
  toastType: 'success' | 'error' = 'success';
  toastTimeout: any; // Added for auto-close timer

  showConfirmation = false;

  setToNow() {
    this.adminTime = new Date();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.environment && this.domain && this.adminTarget) {
      this.showConfirmation = true; // Open modal instead of performing action
    } else {
      this.showToast('Please fill in all required fields.', 'error', true);
    }
  }

  performAction() {
    const isSuccess = Math.random() > 0.5;

    if (isSuccess) {
      const actionLower = this.action.toLowerCase();
      // SUCCESS: Persists until closed (autoClose = false)
      this.showToast(
        `Action '${actionLower}' completed successfully.`,
        'success',
        false
      );
      this.resetForm();
    } else {
      // TECHNICAL ERROR: Persists until closed (autoClose = false)
      this.showToast(
        'A technical error occurred while performing the action, please try again later. If the issue persists, please contact Consultancy team.',
        'error',
        false
      );
    }
  }

  resetForm() {
    this.isSubmitted = false;
    this.environment = '';
    this.domain = '';
    this.adminTarget = '';
    this.adminTime = undefined;
  }

  // UPDATED TOAST LOGIC
  showToast(
    message: string,
    type: 'success' | 'error',
    autoClose: boolean = false
  ) {
    // 1. Clear any existing timer
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
      this.toastTimeout = null;
    }

    const display = () => {
      this.toastMessage = message;
      this.toastType = type;
      this.toastVisible = true;

      // 2. Only set timer if autoClose is TRUE
      if (autoClose) {
        this.toastTimeout = setTimeout(() => {
          this.closeToast();
        }, 3000);
      }
    };

    if (this.toastVisible) {
      this.toastVisible = false;
      setTimeout(() => display(), 350);
    } else {
      display();
    }
  }

  closeToast() {
    this.toastVisible = false;
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
      this.toastTimeout = null;
    }
  }

  confirmAction() {
    this.showConfirmation = false;
    this.performAction(); // Your existing logic to call the API
  }

  cancelAction() {
    this.showConfirmation = false;
  }
}
