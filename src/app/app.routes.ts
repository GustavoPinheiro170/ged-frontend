import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {
  AuthGuardService as AuthGuard,
  AuthGuardHomeService as AuthGuardHome,
} from './services/auth/auth-guard.service';
import { DocumentsComponent } from './components/documents/documents.component';
import { NewDocumentComponent } from './components/documents/new-document/new-document.component';
import { DetailsDocumentComponent } from './components/documents/details-document/details-document.component';
export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuardHome],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DocumentsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'new-document',
        component: NewDocumentComponent,
        canActivate: [AuthGuard],
      },

       {
        path: 'detail/:id',
        component: DetailsDocumentComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];
