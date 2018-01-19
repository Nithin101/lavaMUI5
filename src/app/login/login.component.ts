import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LavaService } from '../lava.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { MySharedService } from '../Service/MySharedService';

 declare var $: any;
 
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  constructor( private cookieService: CookieService,
               private _lavaService : LavaService,
               private router : Router,
               private _mySharedService : MySharedService
             ) { }

  username = '';
  password = '';
  loginError: boolean = false;
  loginMessage = '';
  loginToken = '';
  internalID = '' ;
  loginData = {};
  ownerName = '';
  popoverTitle: string;
  popoverMessage: string;
  confirmText: string;
  cancelText: string;
  confirmClicked: boolean;
  cancelClicked: boolean;
  isOpen = false;

  ngOnInit() {
    this.popoverTitle = 'Warning';
    this.popoverMessage = 'User account already logged in. Are you sure you want to continue?';
    this.confirmText = 'Yes <i class="glyphicon glyphicon-ok"></i>';
    this.cancelText = 'No <i class="glyphicon glyphicon-remove"></i>';
  }

  logIn = function () {
    
            if (!(this.username == '' || this.username == undefined ) && !(this.password == '' || this.username == this.password )) {
                this.loginData = {
                    "externalId": this.username,
                    "password": this.password,
                    "domain": "web",
                    "externalSystem": "email"
                }
    
                this._lavaService.doLogin(this.loginData).then(data => {
                  console.log(data);
                        this.loginToken = data.token;
                        this.internalID = data.user.internalId;
                        this.getUserData();
                        let loginId = {
                        loginToken : data.token,
                        internalID : data.user.internalId
                        }
                        this._mySharedService.setData(loginId);
                        // this.router.navigate(['home']);
                    },
                    error => {
                        if (error.code === 606) {
                            this.loginError = false;    
                           console.log(error);
                           this.loginToken = error.msg.token;
                           this.internalID = error.msg.user.internalId;
                           let loginId ={
                            loginToken : error.msg.token,
                            internalID : error.msg.user.internalId
                            }
                            this._mySharedService.setData(loginId);

                            this.continueLogin(error, this.loginData);
                        } else {
                            this.loginError = true;
                            this.loginMessage = error.msg;
                        }
                    });
    
            } else {
                // display error message if user have enter invalid data
                this.loginError = true;
                this.loginMessage = "All fields are mandatory.";
            }
    
        };
        continueLogin = function(error, loginData) {
            this.popoverTitle = 'Warning';
            // this.popoverMessage = error.msg.messageBean.message;
            this.popoverMessage = 'User account already logged in. Are you sure you want to continue?';
            this.confirmText = 'Yes <i class="glyphicon glyphicon-ok"></i>';
            this.cancelText = 'No <i class="glyphicon glyphicon-remove"></i>';
            this.isOpen = true;
            // console.log(this.cancelClicked);

            // console.log(isOpen); 
            
  
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
        continueWithLogin() {
            console.log('continue with login', this.loginData);
            // this.router.navigate(['home']);
            this.isOpen = false;
            this._lavaService.doLoginContinue(this.loginData).then(data => {
                console.log(data);
                this.loginToken = data.token;
                this.internalID = data.user.internalId; 
                let loginId = {
                    loginToken: data.token,
                    internalID: data.user.internalId
                }
                this._mySharedService.setData(loginId);
                this.getUserData();
            },
                error => {
                    console.log(error);
                    //error
                    this.loginError = true;
                    this.loginMessage = error.msg.data;
                });
        }
        cancelLogin(){
            this.isOpen = false;
        }
        close() {
            this.loginError = false;
        };

        getUserData = function () {
            this._lavaService.getUserRole().then(prof=> {
    
                    if (prof.lava == undefined) {
                        this.loginError = true;
                        this.loginMessage = "User profile doesn't exist";
                    } else {
    
                        if (!(prof.lava.first_name == null || prof.lava.first_name == undefined)) {
                            this.ownerName = prof.lava.first_name;
                        } else {
                            this.ownerName = "";
                        }
    
                        if (!(prof.lava.last_name == null || prof.lava.last_name == undefined )) {
                            this.ownerName = this.ownerName + " " + prof.lava.last_name;
                        }
    
                        this.SetCredentials(this.username, this.ownerName, prof.lava.user_roles, this.loginToken, this.internalID);
    
                        // if (this.ownerName == null || this.ownerName == undefined) {
                        //     window.location.href = baseUrl + "#/user-settings?redirect";
                        // } else if ($rootScope.originalPaths.length > 0) {
                        //     for (var j = 0; j < $rootScope.originalPaths.length; j++) {
    
                        //         if (angular.equals($rootScope.originalPaths[j], '/forgot')) {
                        //             window.location.href = baseUrl + "#/" + $scope.landingPage;
                        //         } else if (!angular.equals($rootScope.originalPaths[j], '/')) {
                        //             window.location.href = baseUrl + "#" + $rootScope.originalPaths[j];
                        //         }
    
                        //     }
                        // } else {
                            // window.location.href = baseUrl + "#/" + $scope.landingPage;
                        // }
                        this.router.navigate(['home']);
                    }
                },
                error=> {
                    console.log('error',error);
                    //error
                    this.loginError = true;
                    this.loginMessage = error.msg.data;
                });
        }
        SetCredentials = function (username, ownername, role, usertoken, internalid) { 
            if (role.length == 0) {
                role.push('marketer');
            }
            console.log('set credentials');
            let globals = {
                currentUser: {
                    username: username,
                    ownername: ownername,
                    usertoken: usertoken,
                    role: role,
                    internalid: internalid
                }
            };
            this._mySharedService.setLoginCredentials(globals);
            this.cookieService.set( 'globals',globals );
            this.cookieService.set('user', globals.currentUser.username);
        };

}

