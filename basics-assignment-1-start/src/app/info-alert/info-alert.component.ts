import { Component, OnInit } from '@angular/core';

@Component({
  selector: '.app-info-alert',
  templateUrl: './info-alert.component.html',
  styles: [`h3{
    color: green;
  }`]
})
export class InfoAlertComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
