import { Injectable } from '@angular/core';

import { AngularFireDatabase } from "@angular/fire/database";

import * as firebase from 'firebase';
import { User } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor (private angularFireDatabase: AngularFireDatabase) {}
  
  get$ (uid: string): Observable<User> {
    return this.angularFireDatabase.object<User> ('/user/' + uid).valueChanges ();
  }
  
  list$ (): Observable<User[]> {
    return this.angularFireDatabase.list<User> ('/user/').valueChanges ();
  }

  update (firebaseUser: firebase.User) {
    this.angularFireDatabase.object ('/user/' + firebaseUser.uid).update (
      firebaseUser.providerData [0]
    );
  }
}
