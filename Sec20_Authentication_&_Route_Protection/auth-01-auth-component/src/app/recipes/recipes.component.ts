import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";

@Component({
  selector: "app-recipes",
  templateUrl: "./recipes.component.html",
  styleUrls: ["./recipes.component.css"]
})
export class RecipesComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    //   this.auth.user
    //     .pipe(
    //       map(user => {
    //         if (!user || !user.valid) {
    //           this.router.navigate(["/auth"]);
    //         }
    //       })
    //     )
    //     .subscribe();
  }
}
