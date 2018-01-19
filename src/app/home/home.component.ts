import { Component, OnInit } from '@angular/core';
import { LavaService } from '../lava.service';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private _lavaService: LavaService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadActivityFeeds();
  }

  loadActivityFeeds = function () {
    this._lavaService.getHomeData().then(data => {

      this.momentstatus = data.rule_status;
      this.topRules = data.top_rules;
      let emptyMoment = 4 - this.topRules.length;
      this.emptyMomentArray = [];
      for (let i = 0; i < emptyMoment; i++) {
        this.emptyMomentArray.push(i);
      }
    },
      error => {
        console.log(error);

      });
    this._lavaService.getActivityFeed().then(data => {

      this.activityLists = data;
      // $rootScope.loginToken = data.token;
      // $rootScope.internalID = data.user.internalId;
      // this.getUserData();
    },
      error => {
        console.log(error);

      });
  }
  functionAlert = function () {
    this.showme = !this.showme;
    this.showmemessages = false;
    this.searchText = (this.showme == true) ? "alert" : "";

  }
  functionMessages = function () {
    this.showmemessages = !this.showmemessages;
    this.showme = false;
    this.searchText = (this.showmemessages == true) ? "message" : "";
  }




}
