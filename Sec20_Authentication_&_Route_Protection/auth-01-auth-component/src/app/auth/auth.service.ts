import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, catchError, tap } from "rxjs/operators";
import { AuthResponseData } from "./auth-response-data";
import { Observable, throwError, BehaviorSubject } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCiHgJ5yvITHYv1CNStocpmyJG2Uvj2Fg0",
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(err => {
          if (!err.error || !err.error.error) {
            return throwError(err);
          }
          let errMsg = "An unknown error has occurred!";
          switch (err.error.error.message) {
            case "EMAIL_EXISTS":
              errMsg = "Email already exist!";
          }
          return throwError(errMsg);
        }),
        tap(res => {
          this.handleAuthenticateUser(
            res.email,
            res.localId,
            res.idToken,
            +res.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCiHgJ5yvITHYv1CNStocpmyJG2Uvj2Fg0",
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(err => {
          if (!err.error || !err.error.error) {
            return throwError(err);
          }
          let errMsg = "An unknown error has occurred!";
          switch (err.error.error.message) {
            case "EMAIL_NOT_FOUND":
              errMsg = "Email doesn't exist!";
              break;
            case "INVALID_PASSWORD":
              errMsg = "Wrong password!";
              break;

            case "USER_DISABLED":
              errMsg = "Account disabled";
              break;
          }
          return throwError(errMsg);
        }),
        tap(res => {
          this.handleAuthenticateUser(
            res.email,
            res.localId,
            res.idToken,
            +res.expiresIn
          );
        })
      );
  }

  autoLogin() {
    let userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem("userAuthInfo"));

    if (userData) {
      let user = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );
      if (user.valid) {
        this.user.next(user);
        let timerDuration =
          new Date(userData._tokenExpirationDate).getTime() -
          new Date().getTime();
        this.autoLogout(timerDuration);
        return true;
      }
    }
    return false;
  }

  logout() {
    this.user.next(null);
    this.router.navigate(["/auth"]);
    localStorage.removeItem("userAuthInfo");
    clearTimeout(this.tokenExpirationTimer);
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
      this.autoLogout(expirationDuration);
    }

    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthenticateUser(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    let expDate = new Date(new Date().getTime() + +expiresIn * 1000);

    let user = new User(email, userId, token, expDate);
    this.user.next(user);
    localStorage.setItem("userAuthInfo", JSON.stringify(user));
    this.autoLogout(+expiresIn * 1000);
  }
}
