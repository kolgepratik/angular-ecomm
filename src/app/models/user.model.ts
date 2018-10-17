
import * as firebase from 'firebase';

export interface User extends firebase.UserInfo {
    admin: boolean
}