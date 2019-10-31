import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';

import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  subscriptionLogin: Subscription;

  constructor(
    private authService: AuthService,
  ) { 

  }

  ngOnInit() {
    // const _this = this;

    this.subscriptionLogin = this.authService.authLogin.subscribe(
      (auth: any) => {
        console.log(auth);
        // if (typeof auth !== 'undefined' && auth.status === 'notfound') {
        //   // Swal(
        //   //   'Invalid Account',
        //   //   'Please check your credentials and try to login again.',
        //   //   'error'
        //   // );
        // }

        // if (typeof auth !== 'undefined' && auth.status === 'success') {
        //   _this.authService.setAuthStorage(auth);

        //   if ( this.authService.checkAuth() ) {
        //     // Swal({
        //     //   title: 'Preparing this device...',
        //     //   timer: 2000,
        //     //   onOpen: function () {
        //     //     Swal.showLoading();
        //     //   }
        //     // }).then(
        //     //   function () {
        //     //       _this.router.navigate(['/']);
        //     //   }
        //     // ).catch(Swal.noop);
        //   }
        // }
      }
    );

    this.initLoginForm();
    console.log("test");
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
