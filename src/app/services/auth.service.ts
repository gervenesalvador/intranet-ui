import { Injectable, Inject, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HttpRequest, HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { APP_CONFIG } from '../app.config';
import { Auth } from '../models/auth.model';

@Injectable()
export class AuthService {
  public auth: Auth;
  authLogin = new Subject<any>();
  public error_list = {
    100: "Invalid Email and Password"
  }
  // authForgot = new Subject<any>();
  // authReset = new Subject<any>();
  // authResetPassword = new Subject<any>();

  constructor(
    // @Inject(APP_CONFIG) private appConfig, 
    private httpClient: HttpClient
  ) {

  }

  httpLogin(data: any) {
    const request = new HttpRequest('POST', APP_CONFIG.API_ENDPOINT + 'api/login', data);

    return this.httpClient.request<any>(request)
      .map((response: any) => {
        if (response.body && typeof response.body.status !== 'undefined') {
          return response.body;
        }
        return [];
      }).subscribe(
        (response: any) => {
        this.authLogin.next(response);
      },(response: any) => {
        this.authLogin.next({
          status: 'failed_request',
          error: {
            message: "Something went wrong, Please try again later. (" + response.name +")"
          }
        });
      }
    );
  }

  setAuthStorage(user: any) {
    localStorage.setItem('intranet_user', btoa(JSON.stringify(user)));
    this.auth = user;
  }

  getAuthStorage() {
    this.auth = JSON.parse(atob(localStorage.getItem('intranet_user')));
  }

  deleteStorage() {
    localStorage.clear();
    this.auth = null;
  }

  checkAuth() {
    var user = localStorage.getItem('intranet_user');

    if (user === null || typeof user === 'undefined' || user.trim() === '') {
      return false;
    }

    return true;
  }
}