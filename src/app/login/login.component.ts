import { Component, OnInit, OnDestroy } from '@angular/core';

import * as firebase from "firebase";

import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public authService: AuthService) {}

  login () {
    this.authService.loginWithGoogle ();
  }

  logout () {
    this.authService.logout ('/');
  }
}
