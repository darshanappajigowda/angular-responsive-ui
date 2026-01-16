import { Routes } from '@angular/router';
import { DeploymentFormComponent } from './components/deployment-form/deployment-form.component';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { InformationComponent } from './components/information/information.component';
import { DomainComponent } from './components/domain/domain.component';
import { AdministrationComponent } from './components/administration/administration.component';
import { RoutingComponent } from './components/routing/routing.component';

export const routes: Routes = [
  // Default path now redirects straight to deployment
  { path: '', redirectTo: 'deploy', pathMatch: 'full' },

  { path: 'deploy', component: DeploymentFormComponent },
  { path: 'auth', component: AuthorizationComponent },
  { path: 'info', component: InformationComponent },
  { path: 'domain', component: DomainComponent },
  { path: 'admin', component: AdministrationComponent },
  { path: 'routing', component: RoutingComponent },
];
