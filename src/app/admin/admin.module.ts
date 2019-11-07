import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AuthGuard } from '../services/auth-guard.service';
import { AdminHeaderComponent } from './admin-header/admin-header.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminHeaderComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  providers: [
    AuthGuard
  ]
})
export class AdminModule { }
