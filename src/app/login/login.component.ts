import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LavaService } from '../lava.service';
import { RouterModule, Routes, Router } from '@angular/router';


 declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  constructor( private cookieService: CookieService,
               private _lavaService : LavaService,
               private router : Router
            //    private _confirmation: ConfirmationService
             ) { }

  username = '';
  password = '';
  settings = {
    overlay: true,
    overlayClickToClose: true,
    showCloseButton: true,
    confirmText: 'Yes',
    declineText: 'No'
  };
  placements: string[] = ['top', 'left', 'right', 'bottom'];
  popoverTitle: string;
  popoverMessage: string;
  confirmText: string;
  cancelText: string;
  confirmClicked: boolean = false;
  cancelClicked: boolean = false;

  ngOnInit() {
  }

  logIn = function () {
    
            // if (!this.isUndefinedOrNull(this.username) && !this.isUndefinedOrNull(this.password)) {
                var loginData = {
                    "externalId": this.username,
                    "password": this.password,
                    "domain": "web",
                    "externalSystem": "email"
                }
    
                this._lavaService.doLogin(loginData).then(data => {
                  console.log(data);
                        // $rootScope.loginToken = data.token;
                        // $rootScope.internalID = data.user.internalId;
                        // this.getUserData();
                        this.router.navigate(['home']);
                    },
                    error => {
                      console.log(error);
                        // console.clear();
                        if (error.code === 606) {
                            this.loginError = false;
                            this.continueLogin(error, loginData);
                        } else {
                            this.loginError = true;
                            this.loginMessage = error.msg.data;
                            alert(error.msg);
                        }
                    });
    
            // } else {
            //     display error message if user have enter invalid data
            //     this.loginError = true;
            //     this.loginMessage = "All fields are mandatory.";
            // }
    
        };
        continueLogin = function(error, loginData) {
            alert(error.msg.messageBean.message);
            this.popoverTitle = 'Are you sure?';
            this.popoverMessage = 'Are you really <b>sure</b> you want to do this?';
            this.confirmText = 'Yes <i class="glyphicon glyphicon-ok"></i>';
            this.cancelText = 'No <i class="glyphicon glyphicon-remove"></i>';
            this.confirmClicked = false;
            this.cancelClicked = false;
            setTimeout(() => {
                $('#confirm-popup').click();
            }, 3000);
            

            // this.router.navigate(['home']);
            // setTimeout(function() {
            //     $('.modal').keypress(function (e) {
            //         let key = e.which;
            //          if(key == 13 && $('.modal').has('#confirm-button').length != 0)  // the enter key code
            //           {
            //             $('#confirm-button').click();
            //           }
            //     });
            // }, 500);
            // this._confirmation.create('Warning', 'User account already logged in. Are you sure you want to continue?', this.settings);
            // $confirm({
            //     text: 'User account already logged in. Are you sure you want to continue?',
            //     title: 'Warning',
            //     ok: 'Yes',
            //     cancel: 'Cancel',
            //     action: 'modal-warning'
            // }).then(function () {
    
            //     this._lavaService.doLoginContinue(loginData).then(function (data) {
            //             $rootScope.loginToken = data.token;
            //             $rootScope.internalID = data.user.internalId;
            //             $scope.getUserData();
            //         },
            //         function (error) {
            //             //error
            //             $scope.loginError = true;
            //             $scope.loginMessage = error.msg.data;
            //         });
    
            // }).catch(function () {
            //     // console.log('error');
            // }).finally(function () {
            //     // console.log("finally");
            // });
        }
        
        

}

