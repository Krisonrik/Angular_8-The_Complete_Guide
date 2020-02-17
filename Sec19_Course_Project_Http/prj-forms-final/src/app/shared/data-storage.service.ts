import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";

import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class DataStorageService {
  constructor(private http: HttpClient, private recipeManager: RecipeService) {}

  storeRecipes() {
    let recipes = this.recipeManager.getRecipes();
    console.log(recipes);
    this.http
      .put(
        "https://atcg-course-recipe-book.firebaseio.com/recipes.json",
        recipes
      )
      .subscribe();
  }
  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        "https://atcg-course-recipe-book.firebaseio.com/recipes.json"
      )
      .pipe(
        map(res => {
          return res.map(res => {
            return {
              ...res,
              ingredients: res.ingredients ? res.ingredients : []
            };
          });
        })
      )
      .subscribe(res => {
        this.recipeManager.setRecipes(res);
      });
  }
}
