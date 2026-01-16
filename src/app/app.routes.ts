import { Routes } from '@angular/router';
import { DeploymentFormComponent } from './components/deployment-form/deployment-form.component';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { InformationComponent } from './components/information/information.component';

export const routes: Routes = [
  // Default path now redirects straight to deployment
  { path: '', redirectTo: 'deploy', pathMatch: 'full' },

  { path: 'deploy', component: DeploymentFormComponent },
  { path: 'auth', component: AuthorizationComponent },
  { path: 'info', component: InformationComponent },
];
