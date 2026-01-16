import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { FlatpickrDirective } from 'angularx-flatpickr';

@Component({
  selector: 'app-administration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FlatpickrDirective],
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css'],
})
export class AdministrationComponent {
  // --- FORM DEFINITION ---
  adminForm = new FormGroup({
    action: new FormControl('Stop'),
    environment: new FormControl('', Validators.required),
    domain: new FormControl('', Validators.required),
    adminTarget: new FormControl('', Validators.required),
    adminTime: new FormControl<Date | null>(null),
  });

  // UI States
  isSubmitted: boolean = false;
  showConfirmation: boolean = false;

  // Toast State
  toastVisible: boolean = false;
  toastMessage: string = '';
  toastType: 'success' | 'error' = 'success';
  toastTimeout: any;

  // Helper to set time programmatically
  setToNow() {
    this.adminForm.patchValue({
      adminTime: new Date(),
    });
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.adminForm.valid) {
      this.showConfirmation = true; // Open modal
    } else {
      this.showToast('Please fill in all required fields.', 'error', true);
    }
  }

  confirmAction() {
    this.showConfirmation = false;
    this.performAction();
  }

  performAction() {
    // Simulate API Call
    const isSuccess = Math.random() > 0.5;

    if (isSuccess) {
      const actionVal = this.adminForm.get('action')?.value || '';
      const actionLower = actionVal.toLowerCase();

      this.showToast(
        `Action '${actionLower}' completed successfully.`,
        'success',
        false
      );
      this.resetForm();
    } else {
      this.showToast(
        'A technical error occurred while performing the action, please try again later. If the issue persists, please contact Consultancy team.',
        'error',
        false
      );
    }
  }

  cancelAction() {
    this.showConfirmation = false;
  }

  resetForm() {
    this.isSubmitted = false;
    this.adminForm.reset({
      action: 'Stop',
      environment: '',
      domain: '',
      adminTarget: '',
      adminTime: null,
    });
  }

  // --- TOAST LOGIC ---
  showToast(
    message: string,
    type: 'success' | 'error',
    autoClose: boolean = false
  ) {
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
      this.toastTimeout = null;
    }

    const display = () => {
      this.toastMessage = message;
      this.toastType = type;
      this.toastVisible = true;

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
}
