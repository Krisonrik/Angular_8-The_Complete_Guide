import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs/Operators";

@Injectable({
  providedIn: "root"
})
export class PostsService {
  constructor(private http: HttpClient) {}

  createPost(title: string, content: string) {
    // Send Http request
    return this.http.post(
      "https://angulartcg-backend-f0612.firebaseio.com/posts.json",
      {
        title: title,
        content: content
      },
      {
        observe: "response"
      }
    );
  }

  retchPosts() {
    // Send Http request
    let searchParams = new HttpParams();
    searchParams = searchParams
      .append("print", "pretty")
      .append("custom", "key");

    return this.http
      .get("https://angulartcg-backend-f0612.firebaseio.com/posts.json", {
        params: searchParams
      })
      .pipe(
        map(res => {
          let posts = [];
          for (const key in res) {
            if (res.hasOwnProperty(key)) {
              posts.push({ ...res[key], id: key });
            }
          }
          return posts;
        })
      );
  }

  clearPosts() {
    // Send Http request
    return this.http.delete(
      "https://angulartcg-backend-f0612.firebaseio.com/posts.json"
    );
  }
}
