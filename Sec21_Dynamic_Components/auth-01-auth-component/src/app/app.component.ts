import { Component, OnInit } from "@angular/core";
import { AuthService } from "./auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  loadedFeature = "recipe";

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.auth.autoLogin()) {
      this.router.navigate(["/recipes"]);
    }
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
