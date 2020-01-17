import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  display = false;
  clickLog = [];
  date = new Date();

  toggleDisplay() {
    this.display = !this.display;
    this.clickLog.push({ display: this.display, time: this.date.getTime() });
  }
}
