import { Injectable, Inject, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HttpParams, HttpRequest, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { APP_CONFIG } from '../app.config';
import { Auth } from '../models/auth.model';

// import { Auth } from '../models/auth.model';

// import * as jwt_decode from 'jwt-decode';

@Injectable()
export class AuthService {
    public auth: Auth;
    authLogin = new Subject<any>();
    authForgot = new Subject<any>();
    authReset = new Subject<any>();
    authResetPassword = new Subject<any>();

    constructor(@Inject(APP_CONFIG) private appConfig, private httpClient: HttpClient) {}

    httpLogin(data: any) {
        const req = new HttpRequest(
            'POST',
            this.appConfig.API_ENDPOINT + '/auth/login',
            data
        );

        return this.httpClient.request<any>(req)
        .map(
            (response: any) => {
            if (response.body) {
                if ( typeof response.body.status !== 'undefined') {
                    return response.body;
                }
            }

            return [];
            }
        )
        .subscribe(
            (response: any) => {
                this.authLogin.next(response);
            },
            (response: any) => {
                this.authLogin.next(response.error);
            }
        );
    }

    setAuthStorage(auth: any) {
        if ( typeof auth.data !== 'undefined' ) {
            localStorage.setItem('otp_user', btoa(JSON.stringify(auth.data)));
        } else {
            localStorage.setItem('otp_user', btoa(JSON.stringify(auth)));
        }
        this.auth = auth;
    }

    getAuthStorage() {
        let auth: Auth;
        let user;
        if ( localStorage.getItem('otp_account_type') ) {
            user = JSON.parse(atob(localStorage.getItem('otp_user')));
        } else {
            user = JSON.parse(atob(localStorage.getItem('otp_user')));
        }

        auth = {
            user: user
        };

        this.auth = auth;
    }

    deleteStorage() {
        localStorage.clear();
        this.auth = null;
    }

    checkAuth() {
        const user = localStorage.getItem('otp_user');

        if (user === null || typeof user === 'undefined' || user.trim() === '') {
            return false;
        }

        return true;
    }
}