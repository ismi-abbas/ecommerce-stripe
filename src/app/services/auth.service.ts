import { Injectable, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable, from, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLoginSubject$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  userData: any;
  isLoggedIn: boolean = false;
  authState: any = null;

  constructor(
    private fireauth: AngularFireAuth,
    private router: Router,
    public ngZone: NgZone
  ) {
    this.authState = this.fireauth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
        this.isLoginSubject$.next(!!this.userData);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  login(email: string, password: string): Observable<any> {
    return from(this.fireauth.signInWithEmailAndPassword(email, password)).pipe(
      tap((result) => {
        this.setUserData(result.user);
        return result.user;
      })
    );
  }

  setUserData(user: any) {
    console.log('SetUserData', user);
  }

  get loggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    return user !== null;
  }

  logout(): Observable<any> {
    return from(this.fireauth.signOut()).pipe(
      tap(() => {
        this.isLoggedIn = false;
        localStorage.removeItem('user');
        this.router.navigate(['login']);
      })
    );
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
