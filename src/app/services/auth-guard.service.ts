import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.checkAuth()) {
      return true;
    }

    this.authService.deleteStorage();
    this.router.navigate(['/admin', {queryParams: {authorize: 'failed'}}]);

    return false;
  }
}
