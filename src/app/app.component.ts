import { Component } from '@angular/core';
import { AuthService, UserService } from './services';
import { Router } from '@angular/router';

import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'E-Commerce App';

  constructor (private authService: AuthService, private router: Router, private userService: UserService) {
    this.authService.user$.subscribe ((firebaseUser: firebase.User) => {
      if (firebaseUser) {
        console.log ('User has logged-in. Routing to original url');

        this.userService.update (firebaseUser);

        this.router.navigate ([localStorage.getItem ('returnUrl')]);
      }
    });
  }
}
