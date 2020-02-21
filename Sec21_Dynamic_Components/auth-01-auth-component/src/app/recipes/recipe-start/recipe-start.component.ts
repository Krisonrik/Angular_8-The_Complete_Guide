import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";
import { take, map } from "rxjs/operators";

@Component({
  selector: "app-recipe-start",
  templateUrl: "./recipe-start.component.html",
  styleUrls: ["./recipe-start.component.css"]
})
export class RecipeStartComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.auth.user
      .pipe(
        take(1),
        map(user => {
          if (!user || !user.valid) {
            this.router.navigate(["/auth"]);
          }
        })
      )
      .subscribe();
  }
}
