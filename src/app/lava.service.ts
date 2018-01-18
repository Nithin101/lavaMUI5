import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { MySharedService } from './Service/MySharedService';


@Injectable()
export class LavaService {

  constructor(private http: Http,
              private _mySharedService : MySharedService ) {  }

    baseURL = 'https://devcc.lava.ai/LavaMarketer/api/v1/'; // service url  

    analyticID = 1;

    setHeaders(){
		let headers = new Headers({ 
			'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
            'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
            'Content-Type': 'application/json',
            'Lava-Authorization':'Bearer ee6308b0-1ed7-454d-9662-954ca175a4c4',
            'App-Id': 26
        });
        let options = new RequestOptions({ headers: headers });
                return options;
    }
    setHeadersWithToken(){
        let token = this._mySharedService.getData();
		let headers = new Headers({ 
			'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
            'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
            'Content-Type': 'application/json',
            'Lava-Authorization':'Bearer ee6308b0-1ed7-454d-9662-954ca175a4c4',
            'App-Id': 26,
            'Lava-User-Token': token.loginToken
        });
        let options = new RequestOptions({ headers: headers });
                return options;
    }

    doLogin(params) {
        return this.http.post(this.baseURL + 'login', params, this.setHeaders()) 
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    doLoginContinue(params) {
        return this.http.post(this.baseURL + 'login/continue', params, this.setHeadersWithToken()) 
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    getUserRole = function () {
        let token = this._mySharedService.getData();
        console.log(token);
        return this.http.get(this.baseURL + 'user/' + token.internalID, this.setHeadersWithToken()) 
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }


    private extractData(res: Response) {
		let body = res.json();
            return body || { };

	}

	private handleError (error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: {};
        try{
            errMsg = {
                msg: error.json(),
                code: error.status
            };
            console.log('object');
        }
        catch(e){
            console.log('string');
            errMsg = {
                msg: error._body,
                code: error.status
            };
            // errMsg = errMsg.json();
        }
        console.log(errMsg);
		console.error(errMsg);
		return Promise.reject(errMsg);
    }
    
}
