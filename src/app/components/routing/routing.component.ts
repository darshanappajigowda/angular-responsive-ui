import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';

@Component({
  selector: 'app-routing',
  standalone: true,
  imports: [CommonModule, FormsModule, FlatpickrModule],
  templateUrl: './routing.component.html',
  styleUrls: ['./routing.component.css'],
})
export class RoutingComponent {
  // Form Values based on IMG_8158.JPG
  action: string = 'Switch';
  environment: string = '';
  switchingTarget: string = '';
  domain: string = '';
  peerDomain: string = '';
  routingTime: Date | undefined;
  showConfirmation = false;

  // UI States
  isSubmitted: boolean = false;
  toastVisible: boolean = false;
  toastMessage: string = '';
  toastType: 'success' | 'error' = 'success';
  toastTimeout: any;

  setToNow() {
    this.routingTime = new Date();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (
      this.environment &&
      this.switchingTarget &&
      this.domain &&
      this.peerDomain
    ) {
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
    // Simulate API call result
    const isSuccess = Math.random() > 0.5;

    if (isSuccess) {
      // Success Result (Persistent)
      this.showToast(
        `Action '${this.action.toLowerCase()}' completed successfully.`,
        'success',
        false
      );
      this.resetForm();
    } else {
      // Technical Error (Persistent)
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
    this.switchingTarget = '';
    this.domain = '';
    this.peerDomain = '';
    this.routingTime = undefined;
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
