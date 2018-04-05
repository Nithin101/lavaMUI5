import { Component, OnInit } from '@angular/core';
import { LavaService } from '../Service/lava.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { ConfigService } from '../config/config.service';
import { setDefaultService } from 'selenium-webdriver/chrome';

@Component({
  selector: 'app-broadcast',
  templateUrl: './broadcast.component.html',
  styleUrls: ['./broadcast.component.css'],
  providers: [ConfigService]
})
export class BroadcastComponent implements OnInit {

  public loading = false;
  constructor(
    private _lavaService: LavaService,
    private router: Router,
    private _global: ConfigService
  ) { }
  selectAppList: any = {}

  ngOnInit() {
    this.selectAppList = this._global.APP_CONFIG;
    if (Object.keys(this.selectAppList).length > 1) {
      // angular.element('#app-modal').modal('show');
      //  angular.element('#app-modal').modal('show');
    } else {
      setTimeout(() => {
        this.getInstantBroadcast();
      }, 2000);

    }
  }




  getInstantBroadcast = function () {
    console.log("hit");

    // this._lavaService.getInstantBroadcast().then(data => {
    //   this.momentstatus = data.rule_status;
    //   this.topRules = data.top_rules;
    //   this.emptyMoment = 4 - this.topRules.length;
    //   this.emptyMomentArray = [];
    //   for (let i = 0; i < this.emptyMoment; i++) {
    //     this.emptyMomentArray.push(i);
    //   }
    //   this.loading = false;
    // },
    //   error => {
    //     console.log(error);
    //   });
  }

  clearSubscriptions = function (segmentDesign, event) {
    console.log(event);
    console.log(event.target.checked);
  }
}
