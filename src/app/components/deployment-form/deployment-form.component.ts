import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlatpickrDirective } from 'angularx-flatpickr';

@Component({
  selector: 'app-deployment-form',
  standalone: true,
  imports: [CommonModule, FormsModule, FlatpickrDirective],
  templateUrl: './deployment-form.component.html',
  styleUrls: ['./deployment-form.component.css'],
})
export class DeploymentFormComponent implements OnInit {
  // Form Values
  action: string = 'install';
  deploymentSource: string = '';
  build: string = '';
  environment: string = '';
  domainValue: string = '';
  deploymentTarget: string = '';
  fortifyStatus: string = 'Valid';
  deploymentTime: Date | undefined;

  // States
  isSubmitted: boolean = false;
  showConfirmation: boolean = false;

  // Toast State
  toastVisible: boolean = false;
  toastMessage: string = '';
  toastType: 'success' | 'error' = 'success';
  toastTimeout: any;

  ngOnInit() {
    setTimeout(() => {
      this.fortifyStatus = 'Valid';
    }, 1000);
  }

  setToNow() {
    this.deploymentTime = new Date();
  }

  deploy() {
    this.isSubmitted = true;
    if (this.isValid()) {
      this.showConfirmation = true;
    } else {
      // VALIDATION ERROR: Auto-closes after 3 seconds (pass 'true')
      this.showToast('Please fill in all required fields.', 'error', true);
    }
  }

  isValid(): boolean {
    return !!(
      this.deploymentSource &&
      this.build &&
      this.environment &&
      this.domainValue &&
      this.deploymentTarget
    );
  }

  confirmDeployment() {
    this.showConfirmation = false;

    // --- SIMULATING API CALL (Random Success or Failure) ---
    // In real app, put this inside your API .subscribe(error => ...)
    const isSuccess = false;

    if (isSuccess) {
      // SUCCESS: Persists until closed
      this.showToast(
        `Deployment initiated: ${this.build} to ${this.environment}`,
        'success',
        false
      );
      this.resetForm();
    } else {
      // TECHNICAL ERROR: Persists until closed
      this.showToast(
        'A technical error occurred while performing the action, please try again later. If the issue persists, please contact Consultancy team.',
        'error',
        false
      );
    }
  }

  cancelDeployment() {
    this.showConfirmation = false;
  }

  resetForm() {
    this.isSubmitted = false;
    this.deploymentSource = '';
    this.build = '';
    this.environment = '';
    this.domainValue = '';
    this.deploymentTarget = '';
    this.deploymentTime = undefined;
    this.action = 'install';
  }

  // --- UPDATED TOAST LOGIC ---
  // Added 'autoClose' parameter (defaults to false)
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

    // Animation handling
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
