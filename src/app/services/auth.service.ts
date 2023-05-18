import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable, from, tap } from 'rxjs';
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  getAuth,
  signInWithPopup,
} from '@angular/fire/auth';
import { NzMessageService } from 'ng-zorro-antd/message';

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
    public ngZone: NgZone,
    private message: NzMessageService
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

  setUserData(user: any) {}

  get loggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    return user !== null;
  }

  logout(): Observable<any> {
    return from(this.fireauth.signOut()).pipe(
      tap((res) => {
        this.isLoggedIn = false;
        localStorage.removeItem('user');
        return res;
      })
    );
  }

  async register(email: string, password: string) {
    return this.fireauth
      .createUserWithEmailAndPassword(email, password)
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

  sendEmailVerification(): Observable<any> {
    return from(
      this.fireauth.currentUser.then((u) => u?.sendEmailVerification())
    );
  }

  forgotPassword(passwordResetEmail: string): Observable<any> {
    return from(this.fireauth.sendPasswordResetEmail(passwordResetEmail));
  }

  async socialLogin(social: 'google' | 'facebook' | 'twitter') {
    const auth = getAuth();
    let provider: any;

    if (social === 'google') {
      provider = new GoogleAuthProvider();
    } else if (social === 'facebook') {
      provider = new FacebookAuthProvider();
    } else if (social === 'twitter') {
      provider = new TwitterAuthProvider();
    }

    signInWithPopup(auth, provider)
      .then((result) => {
        let credential: any;

        if (social === 'google') {
          credential = GoogleAuthProvider.credentialFromResult(result);
        } else if (social === 'facebook') {
          credential = FacebookAuthProvider.credentialFromResult(result);
        } else if (social === 'twitter') {
          credential = TwitterAuthProvider.credentialFromResult(result);
        }

        const token = credential?.accessToken;
        const user = result.user;

        this.isLoginSubject$.next(!!user);

        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token!);

        this.router.navigate(['/dashboard']);

        return result;
      })
      .catch((error) => {
        this.message.error(error.message, {
          nzDuration: 5000,
          nzAnimate: true,
        });
        console.log(error);
      });
  }
}
