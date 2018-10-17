import { Injectable } from '@angular/core';

import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

import { map } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.user$.pipe (
      map((user) => {
        if (user) {
          // logged in so return true
          
          return true;
        } else {
          // not logged in so redirect to login page with the return url

          this.router.navigate (['/login'], { queryParams: { returnUrl: state.url }});
          return false;
        }
      })
    )
  }
}
