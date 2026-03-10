import { Routes } from '@angular/router';
import { AlertsComponent } from './features/alerts/alerts.component';
import { BranchesComponent } from './features/branches/branches.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { OperationsComponent } from './features/operations/operations.component';
import { RevenueComponent } from './features/revenue/revenue.component';

export const appRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'revenue', component: RevenueComponent },
  { path: 'operations', component: OperationsComponent },
  { path: 'alerts', component: AlertsComponent },
  { path: 'branches', component: BranchesComponent },
  { path: '**', redirectTo: 'dashboard' }
];
