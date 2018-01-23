import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class MySharedService {
    data: any;
    loginCredentials : any;
    // dataChange: Observable<any>;
  
    constructor(private cookieService: CookieService) {
    //   this.dataChange = new Observable((observer:Observer) {
    //     this.dataChangeObserver = observer;
    //   });
    }
  
    setTokens(data:any) {
      this.cookieService.set( 'loginTokens', JSON.stringify(data) );
    //   this.dataChangeObserver.next(this.data);
    }
    getTokens(){
        return JSON.parse(this.cookieService.get('loginTokens'));
    }

    setLoginCredentials(data:any){
      this.loginCredentials = data;
      this.cookieService.set( 'globals', JSON.stringify(data));
      this.cookieService.set('user', data.currentUser.username);
    }
    getLoginCredentials(){
      return JSON.parse(this.cookieService.get('globals'));
    }
  }