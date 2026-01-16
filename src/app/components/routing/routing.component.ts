import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';

@Component({
  selector: 'app-routing',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FlatpickrModule],
  templateUrl: './routing.component.html',
  styleUrls: ['./routing.component.css'],
})
export class RoutingComponent {
  // --- FORM DEFINITION ---
  routingForm = new FormGroup({
    action: new FormControl('Switch'),
    environment: new FormControl('', Validators.required),
    switchingTarget: new FormControl('', Validators.required),
    domain: new FormControl('', Validators.required),
    peerDomain: new FormControl('', Validators.required),
    routingTime: new FormControl<Date | null>(null),
  });

  showConfirmation = false;

  // UI States
  isSubmitted: boolean = false;
  toastVisible: boolean = false;
  toastMessage: string = '';
  toastType: 'success' | 'error' = 'success';
  toastTimeout: any;

  setToNow() {
    this.routingForm.patchValue({
      routingTime: new Date(),
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.routingForm.valid) {
      this.showConfirmation = true;
    } else {
      this.showToast('Please fill in all required fields.', 'error', true);
    }
  }

  confirmRouting() {
    this.showConfirmation = false;
    this.performRoutingAction();
  }

  cancelRouting() {
    this.showConfirmation = false;
  }

  performRoutingAction() {
    const isSuccess = Math.random() > 0.5;

    if (isSuccess) {
      const actionVal = this.routingForm.get('action')?.value || '';
      this.showToast(
        `Action '${actionVal.toLowerCase()}' completed successfully.`,
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

  resetForm() {
    this.isSubmitted = false;
    this.routingForm.reset({
      action: 'Switch',
      environment: '',
      switchingTarget: '',
      domain: '',
      peerDomain: '',
      routingTime: null,
    });
  }

  showToast(message: string, type: 'success' | 'error', autoClose: boolean) {
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }

    const display = () => {
      this.toastMessage = message;
      this.toastType = type;
      this.toastVisible = true;

      if (autoClose) {
        this.toastTimeout = setTimeout(() => this.closeToast(), 3000);
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
  }
}
