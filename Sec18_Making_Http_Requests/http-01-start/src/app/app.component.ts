import { Component, OnInit } from "@angular/core";
import { PostsService } from "./posts.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  isFetching = false;

  constructor(private postsManager: PostsService) {
    this.onFetchPosts();
  }

  ngOnInit() {}

  onCreatePost(form: NgForm) {
    // Send Http request
    this.postsManager
      .createPost(form.value.title, form.value.content)
      .subscribe(responseData => {
        console.log(responseData);

        this.onFetchPosts();
        form.resetForm();
      });
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;

    this.postsManager.fretchPosts().subscribe(posts => {
      this.loadedPosts = posts;
      this.isFetching = false;
    });
  }

  onClearPosts() {
    this.postsManager.clearPosts().subscribe(res => {
      this.onFetchPosts();
    });
  }
}
