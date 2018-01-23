import { Component, OnInit, } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { MySharedService } from '../Service/MySharedService';
import { LavaService } from '../lava.service'

@Component({
  selector: 'app-usersetting',
  templateUrl: './usersetting.component.html',
  styleUrls: ['./usersetting.component.css']
})
export class UsersettingComponent implements OnInit {

  constructor(
    private _lavaService: LavaService,
    private router: Router,
    private _mySharedService: MySharedService
  ) { }

  first_name_errorMessage = '';
  last_name_errorMessage = '';
  email_errorMessage = '';
  ownerName = '';
  user_role_errorMessage = '';
  user_role = '';
  loginTokens = this._mySharedService.getTokens();
  form = {
    "lava": {
      "first_name": "",
      "last_name": "",
      "email": ""
    },
    "user_id": this.loginTokens.internalID,
  }

  ngOnInit() {
    let that = this;
    this._lavaService.getUserRole().then(function (prof) {

      if (prof.lava != undefined) {

        if (prof.lava.email) {
          that.form.lava.email = prof.lava.email;
        } else {
          that.form.lava.email = '';
        }

        if (prof.lava.first_name) {
          that.form.lava.first_name = prof.lava.first_name;
        } else {
          that.form.lava.first_name = '';
        }

        if (prof.lava.last_name) {
          that.form.lava.last_name = prof.lava.last_name;
        } else {
          that.form.lava.last_name = '';
        }

        that.user_role = prof.lava.user_roles.join(", ");

      }
      // $rootScope.spinner.off();
    }, error => {
      // $rootScope.spinner.off();
    });

  }

  // var redirectFlag = $location.search();
  // if (redirectFlag.redirect) {
  //     $rootScope.redirect = false;
  // } else {
  //     $rootScope.redirect = true;
  // }

  // $rootScope.internalID = $rootScope.globals.currentUser.internalid;
  // $rootScope.loginToken = $rootScope.globals.currentUser.usertoken;

  // $rootScope.spinner.on();
  updateProfile = function () {
    console.log('update');
    let flagCount = 0;
    if (this.form.lava.first_name == '' || (this.form.lava.first_name == undefined) || this.form.lava.first_name == null) {
      this.first_name_errorMessage = 'Please enter first name.';
      return;
    } else {
      this.first_name_errorMessage = '';
      flagCount++;
    }

    if (this.form.lava.last_name == '' || this.form.lava.last_name == undefined || this.form.lava.last_name == null) {
      this.last_name_errorMessage = 'Please enter last name.';
      return;
    } else {
      this.last_name_errorMessage = '';
      flagCount++;
    }
    if (this.form.lava.email == '' || this.form.lava.email == undefined || this.form.lava.email == null) {
      this.email_errorMessage = 'Please enter email.';
      return;
    } else {
      if (!this.validateEmail(this.form.lava.email)) {
        this.email_errorMessage = 'Please enter valid email.';
        return;
      } else {
        this.email_errorMessage = '';
        flagCount++;
      }
    }

    if (flagCount == 3) {
      // $rootScope.spinner.on();
      let that = this;
      this._lavaService.postUserRole(this.form).then(function (prof) {
        // $rootScope.spinner.off();
        console.log('success', prof);
        that.ownerName = that.form.lava.first_name + " " + that.form.lava.last_name;

        let globals = that._mySharedService.getLoginCredentials();
        globals.currentUser.ownername = that.ownerName;
        that._mySharedService.setLoginCredentials(globals);
        // $rootScope.redirect = true;
      },
        error => {
          console.log(error);
          // $rootScope.spinner.off();
        });
    }
  };

  validateEmail(x) {
    let atpos = x.indexOf("@");
    let dotpos = x.lastIndexOf(".");
    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
      return false;
    } else {
      return true;
    }
  }

  // $rootScope.$on('$routeChangeStart', function(event, next, current) {
  //     // check if user is login if not then prevent default action
  //     // and redirect user to login page
  //     if (!$rootScope.redirect) {
  //         event.preventDefault();
  //         $confirm({
  //             text: 'Please complete the profile data.',
  //             title: 'Warning',
  //             ok: '',
  //             action: 'modal-warning'
  //         }).then(function handleResolve() {});
  //     }
  // });

}
