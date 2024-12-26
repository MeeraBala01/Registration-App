import { SignUpPageComponent } from './sign-up/sign-up-page/sign-up-page.component';
import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './auth.guard';
import { accountGuard } from './account.guard';

export const routes: Routes = [
  {
    path: 'signup',
    component: SignUpPageComponent,
    canActivate: [accountGuard],
  },
  {
    path: '',
    pathMatch: 'full',
    component: MainPageComponent,
    canActivate: [accountGuard],
  },
  {
    path: 'exit',
    component: MainPageComponent,
  },
  {
    path: 'dash',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'logout',
    component: MainPageComponent,
  },
  {
    path: 'save',
    component: DashboardComponent,
  },
];
