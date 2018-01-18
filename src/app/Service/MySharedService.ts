import { Injectable } from '@angular/core';

@Injectable()
export class MySharedService {
    data: any;
    loginCredentials : any;
    // dataChange: Observable<any>;
  
    constructor() {
    //   this.dataChange = new Observable((observer:Observer) {
    //     this.dataChangeObserver = observer;
    //   });
    }
  
    setData(data:any) {
      console.log('setdata', data);
      this.data = data;
      console.log(this.data);
    //   this.dataChangeObserver.next(this.data);
    }
    getData(){
      console.log('return', this.data);
        return this.data;
    }

    setLoginCredentials(data:any){
      this.loginCredentials = data;
    }
    getLoginCredentials(){
      return this.loginCredentials;
    }
  }