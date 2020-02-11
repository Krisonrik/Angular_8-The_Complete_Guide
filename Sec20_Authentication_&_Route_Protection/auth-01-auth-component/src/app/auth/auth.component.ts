import { Component } from "@angular/core";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html"
})
export class AuthComponent {
  isLoggedIn = true;

  onSwitchMode() {
    this.isLoggedIn = !this.isLoggedIn;
  }
}
