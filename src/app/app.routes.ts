// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { DeploymentFormComponent } from './components/deployment-form/deployment-form.component';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { InformationComponent } from './components/information/information.component';
import { DomainComponent } from './components/domain/domain.component';
import { AdministrationComponent } from './components/administration/administration.component';
import { RoutingComponent } from './components/routing/routing.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },

  { path: 'unauthorized', component: HomeComponent },

  // Dev & Admin routes (3 routes)
  {
    path: 'deploy',
    component: DeploymentFormComponent,
    canActivate: [authGuard],
    data: { roles: ['dev', 'admin'] },
  },
  {
    path: 'info',
    component: InformationComponent,
    canActivate: [authGuard],
    data: { roles: ['dev', 'admin'] },
  },
  {
    path: 'admin',
    component: AdministrationComponent,
    canActivate: [authGuard],
    data: { roles: ['dev', 'admin'] },
  },

  // Admin ONLY routes (3 routes)
  {
    path: 'auth',
    component: AuthorizationComponent,
    canActivate: [authGuard],
    data: { roles: ['admin'] },
  },
  {
    path: 'domain',
    component: DomainComponent,
    canActivate: [authGuard],
    data: { roles: ['admin'] },
  },
  {
    path: 'routing',
    component: RoutingComponent,
    canActivate: [authGuard],
    data: { roles: ['admin'] },
  },
];
