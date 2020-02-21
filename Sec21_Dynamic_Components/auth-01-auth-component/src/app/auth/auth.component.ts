import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { AuthResponseData } from "./auth-response-data";
import { Router } from "@angular/router";
import { take, map } from "rxjs/operators";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html"
})
export class AuthComponent implements OnInit {
  isLoggedIn = true;
  isLoading = false;
  hasError = false;
  errorMessage = "";

  constructor(private authManager: AuthService, private router: Router) {}

  ngOnInit() {
    this.authManager.user
      .pipe(
        take(1),
        map(user => {
          if (user && user.valid) {
            this.router.navigate(["/recipes"]);
          }
        })
      )
      .subscribe();
  }

  onSwitchMode() {
    this.isLoggedIn = !this.isLoggedIn;
  }

  onSubmit(form: NgForm) {
    this.isLoading = true;
    let authObs: Observable<AuthResponseData>;

    if (this.isLoggedIn) {
      authObs = this.authManager.login(form.value.email, form.value.password);
    } else {
      authObs = this.authManager.signup(form.value.email, form.value.password);
    }
    authObs.subscribe(
      res => {
        console.log(res);
        this.isLoading = false;
        this.router.navigate(["./recipes"]);
      },
      err => {
        this.hasError = true;
        console.log(err);

        this.errorMessage = err;
        this.isLoading = false;
      }
    );

    form.reset();
  }
  onCloseError() {
    this.hasError = false;
  }
}
