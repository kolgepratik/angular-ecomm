import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

import { Router } from '@angular/router';

import { AuthService } from '../services';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent { 

  bgClass: string = environment.styles.navbar.bgClass;

  constructor(private router: Router, public authService: AuthService) { 
  }

}
