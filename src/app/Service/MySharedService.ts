import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class MySharedService {
    data: any;
    loginCredentials : any;
    // dataChange: Observable<any>;
  
    constructor(private cookieService: CookieService) {
    }
  
    setTokens(data:any) {
      this.cookieService.set( 'loginTokens', JSON.stringify(data) );
    }
    getTokens(){
        if(this.cookieService.get('loginTokens') == '' || this.cookieService.get('loginTokens') == undefined){
          return '';
        }
        else{
          return JSON.parse(this.cookieService.get('loginTokens'));
        }
    }

    setLoginCredentials(data:any){
      this.loginCredentials = data;
      this.cookieService.set( 'globals', JSON.stringify(data));
      this.cookieService.set('user', data.currentUser.username);
    }
    getLoginCredentials(){
      if(this.cookieService.get('globals') == '' || this.cookieService.get('globals') == undefined){
        return '';
      }
      else{
        return JSON.parse(this.cookieService.get('globals'));
      }
    }

    clearAllinfo(){
      this.cookieService.delete('globals');
      this.cookieService.delete('loginTokens');
      this.cookieService.deleteAll();
    }
  }