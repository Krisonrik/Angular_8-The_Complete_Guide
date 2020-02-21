import { Component, OnInit, OnDestroy } from "@angular/core";

import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html"
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private authManager: AuthService
  ) {}

  ngOnInit() {
    this.userSub = this.authManager.user.subscribe(res => {
      this.isAuthenticated = res && res.valid;
      this.onFetchData();
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authManager.logout();
    this.isAuthenticated = false;
  }
}
