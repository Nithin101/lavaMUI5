import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LavaService } from '../lava.service';
// import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private cookieService: CookieService,
               private _lavaService : LavaService ) { }

  username = '';
  password = '';

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
                    },
                    error => {
                      console.log(error);
                        // console.clear();
                    //     if (error.msg.status === 606) {
                    //         this.loginError = false;
                    //         this.continueLogin(error, loginData);
                    //     } else {
                    //         this.loginError = true;
                    //         this.loginMessage = error.msg.data;
                    //     }
                    });
    
            // } else {
                //display error message if user have enter invalid data
            //     this.loginError = true;
            //     this.loginMessage = "All fields are mandatory.";
            // }
    
        };

}
