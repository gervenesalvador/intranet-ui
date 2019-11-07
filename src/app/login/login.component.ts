import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  subscriptionLogin: Subscription;
  loading = false;
  authorize = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    let is_authorize = this.route.snapshot.queryParamMap.get('authorize');
    if (is_authorize !== null && is_authorize === 'failed') {
      this.authorize = true;
    }

    if ( this.authService.checkAuth() ) {
      this.router.navigate(['/admin/dashboard']);
    }
  }

  ngOnInit() {
    const _this = this;

    this.subscriptionLogin = this.authService.authLogin.subscribe(
      (response: any) => {
        
        if (typeof response === 'undefined') {
          Swal('Invalid Account', 'Something went wrong', 'error');
          this.loading = false;
        }

        if (response.status === 'failed') {
          Swal('Invalid Account', _this.authService.error_list[response.error.code], 'error');
          this.loading = false;
        }

        if (response.status === 'failed_request') {
          Swal('Error!', response.error.message, 'error');
          this.loading = false;
        }

        if (response.status === 'success') {
          _this.authService.setAuthStorage(response.user);
          if ( _this.authService.checkAuth() ) {
            _this.router.navigate(['/admin/dashboard']);
          }
        }
      }
    );
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onLogin() {
    var loginValues = this.loginForm.value;
    // console.log(loginValues)
    if (this.loginForm.valid) {
      this.loading = true;
      this.authService.httpLogin(loginValues);
    }
  }
  
  openDialog() {
    Swal(
      'Invalid Account',
      'Please check your credentials and try to login again.',
      'error'
    );
  }
}
