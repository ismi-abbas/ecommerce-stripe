import { Injectable, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  isLoggedIn: boolean = false;

  constructor(
    private fireauth: AngularFireAuth,
    private router: Router,
    public ngZone: NgZone
  ) {
    this.fireauth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  async login(email: string, password: string) {
    return this.fireauth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.setUserData(result.user);
        this.fireauth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['dashboard']);
          }
        });
        return result.user;
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  setUserData(user: any) {
    console.log('SetUserData', user);
  }

  get loggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    return user !== null;
  }

  async logout() {
    return this.fireauth.signOut().then(() => {
      this.isLoggedIn = false;
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }

  async register(email: string, password: string) {
    return this.fireauth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        console.log('Register ===>', result);
        this.setUserData(result.user);
        this.fireauth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['dashboard']);
          }
        });
        return result.user;
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
}
