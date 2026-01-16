import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { FlatpickrDirective } from 'angularx-flatpickr';

@Component({
  selector: 'app-deployment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FlatpickrDirective],
  templateUrl: './deployment-form.component.html',
  styleUrls: ['./deployment-form.component.css'],
})
export class DeploymentFormComponent implements OnInit {
  // --- FORM DEFINITION ---
  // We explicitly define every control to match your HTML fields
  deploymentForm = new FormGroup({
    action: new FormControl('install'),
    deploymentSource: new FormControl('', Validators.required),
    build: new FormControl('', Validators.required),
    environment: new FormControl('', Validators.required),
    domainValue: new FormControl('', Validators.required), // Matches 'domainValue' in your HTML
    deploymentTarget: new FormControl('', Validators.required),
    deploymentTime: new FormControl<Date | null>(null),
  });

  // Display-only variables (Not part of the form validation)
  fortifyStatus: string = 'Valid';

  // UI States
  isSubmitted: boolean = false;
  showConfirmation: boolean = false;

  // Toast State
  toastVisible: boolean = false;
  toastMessage: string = '';
  toastType: 'success' | 'error' = 'success';
  toastTimeout: any;

  ngOnInit() {
    // Simulate loading external status
    setTimeout(() => {
      this.fortifyStatus = 'Error fetching status';
    }, 5000);
  }

  // Helper to set time programmatically
  setToNow() {
    this.deploymentForm.patchValue({
      deploymentTime: new Date(),
    });
  }

  // Helper getter to keep HTML cleaner (optional, but good practice)
  get f() {
    return this.deploymentForm.controls;
  }

  deploy() {
    this.isSubmitted = true;

    if (this.deploymentForm.valid) {
      this.showConfirmation = true;
    } else {
      this.showToast('Please fill in all required fields.', 'error', true);
    }
  }

  confirmDeployment() {
    this.showConfirmation = false;

    // --- SIMULATING API CALL ---
    const isSuccess = false; // Toggle this to test success/fail

    if (isSuccess) {
      const build = this.deploymentForm.get('build')?.value;
      const env = this.deploymentForm.get('environment')?.value;

      this.showToast(
        `Deployment initiated: ${build} to ${env}`,
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

  cancelDeployment() {
    this.showConfirmation = false;
  }

  resetForm() {
    this.isSubmitted = false;
    this.deploymentForm.reset({
      action: 'install',
      deploymentSource: '',
      build: '',
      environment: '',
      domainValue: '',
      deploymentTarget: '',
      deploymentTime: null,
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
