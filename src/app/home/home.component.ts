import { Component, OnInit } from '@angular/core';
import { LavaService } from '../lava.service';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public loading = false;
  constructor(
    private _lavaService: LavaService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadActivityFeeds();
  }

  loadActivityFeeds = function () {
    this.loading = true;
    this.topRules = [];
    this._lavaService.getHomeData().then(data => {
      console.log(data);

      this.momentstatus = data.rule_status;
      this.topRules = data.top_rules;
      this.emptyMoment = 4 - this.topRules.length;
      this.emptyMomentArray = [];
      for (let i = 0; i < this.emptyMoment; i++) {
        this.emptyMomentArray.push(i);
      }
      this.loading = false;
    },
      error => {
        console.log(error);

      });
    this._lavaService.getActivityFeed().then(data => {

      this.activityLists = data;
      this.loading = false;

    },
      error => {
        console.log(error);

      });
  }
  functionAlertMessage = function (text) {
    if (text == "alert") {
      this.showme = !this.showme;
      this.showmemessages = false;
      this.searchText = (this.showme == true) ? text : "";
    } else if (text == "message") {
      this.showmemessages = !this.showmemessages;
      this.showme = false;
      this.searchText = (this.showmemessages == true) ? text : "";
    }
  }

}
