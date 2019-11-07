import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';

import { AuthGuard } from '../services/auth-guard.service';

const routes: Routes = [
  { path: 'admin', canActivate: [AuthGuard], children: [
    { path: 'dashboard', component: AdminComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
