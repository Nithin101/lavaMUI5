import { Component, OnInit } from '@angular/core';
import { MySharedService } from '../Service/MySharedService';
import { RouterModule, Routes, Router } from '@angular/router';
import { LavaService } from '../lava.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _mySharedService : MySharedService,
              private router : Router,
              private _lavaService : LavaService,) { }

  ngOnInit() {
    let loginTokens = this._mySharedService.getTokens();
    let loginCredentials = this._mySharedService.getLoginCredentials();
    if((loginTokens == undefined || loginTokens == '') || (loginCredentials == undefined || loginCredentials == ''))
    {
      this._mySharedService.clearAllinfo();
      this.router.navigate(['/login']);
    }
  }
  logout(){
    let that = this;
    this._lavaService.doLogout().then(function(data) {
      that._mySharedService.clearAllinfo();
      that.router.navigate(['/login']);
  }, function(error) {
      if (error.code == 605) {
          that._mySharedService.clearAllinfo();
          that.router.navigate(['/login']);
      }
  });
  }

}
