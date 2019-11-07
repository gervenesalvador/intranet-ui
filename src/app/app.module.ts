import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_CONFIG } from './app.config';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
// import { AdminComponent } from './admin/admin.component';
import { AdminModule } from './admin/admin.module';
// import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    // AdminSidebarComponent,
    // AdminComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AdminModule
  ],
  providers: [
    AuthService,
    { provide: APP_CONFIG, useValue: APP_CONFIG },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
