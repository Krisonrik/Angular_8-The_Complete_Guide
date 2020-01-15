import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  enableCreation = false;
  serverCreationStatus = "No server was created.";
  constructor() {
    setTimeout(() => {
      this.enableCreation = true;
    }, 200);
  }

  ngOnInit() {
  }
  onServerCreation() {
    this.serverCreationStatus = "New server was created!";
  }

}
