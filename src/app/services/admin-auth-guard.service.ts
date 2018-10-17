import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from './user.service';
import { AuthService } from "./auth.service";
import { User } from '../models';
import { Observable } from 'rxjs';
import { switchMap, map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private router: Router, private authService: AuthService, private userService: UserService) {}

  canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.user$.pipe (
      switchMap((firebaseUser: firebase.User) => {
        console.log ('SwitchMap. First Observable');
        console.dir (firebaseUser);
        return this.userService.get$ (firebaseUser.uid);
      }),
      map((appUser: User) => {
        console.log ('SwitchMap. Inner Observable');
        console.dir (appUser);

        if (appUser.admin) {
          return true;
        } else {
          this.router.navigate (['/access-denied']);
          return false;
        }
      })
    );
  }
}
