import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {
  clock = "--:-- --";

  constructor() {

  }

  ngOnInit() {
    this.time();
  }

  time(): void {
    setInterval(() => {
      var today = new Date(),
      hours = today.getHours(),
      clocklabel = (hours >= 12) ? 'pm' : 'am';
      this.clock = this.checkTime(hours) + ":" + this.checkTime(today.getMinutes()) + ":" + this.checkTime(today.getSeconds()) + " " + clocklabel;
    }, 1000);
  }

  checkTime(i) {
    return (i < 10) ?  "0" + i :  i;
  }
}
