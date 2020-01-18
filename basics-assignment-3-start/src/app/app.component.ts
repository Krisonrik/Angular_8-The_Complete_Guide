import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  display = false;
  clickCount = 0;
  clickLog = [];
  date = new Date();

  toggleDisplay() {
    this.display = !this.display;
    this.clickLog.push({ display: this.display, time: this.date.getTime(), idx: this.clickCount });
    this.clickCount++;
    console.log(this.clickCount);
  }
  setColor(elm) {
    return elm.idx > 4 ? "blue" : "white";
  }
}
