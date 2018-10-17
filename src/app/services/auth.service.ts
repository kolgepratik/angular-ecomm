import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

import * as firebase from "firebase";
import { Observable } from 'rxjs';
import { User } from '../models';
import { UserService } from './user.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$: Observable<firebase.User>;

  public appUser$: Observable<User>;

  constructor(private router: Router, private angularFireAuth: AngularFireAuth, private route: ActivatedRoute, private userService: UserService) {
    this.user$ = angularFireAuth.authState;

    this.appUser$ = this.user$.pipe (
      switchMap ((firebaseUser: firebase.User) => {
        if (firebaseUser) {
          console.log ('In appUser switchMap');
          return this.userService.get$ (firebaseUser.uid);
        } else {
          return of (null);
        }
      })
    );
  }

  loginWithGoogle () {
    // Save redirectUrl in localStorage.
    localStorage.setItem ('returnUrl', this.route.snapshot.queryParams.returnUrl || '/');

    this.angularFireAuth.auth.signInWithRedirect (new firebase.auth.GoogleAuthProvider());
  }

  logout (redirectUrl: string) {
    this.angularFireAuth.auth.signOut ().then (() => {
      if (redirectUrl) {
        this.router.navigate ([redirectUrl]);
      }
    });
  }
}
