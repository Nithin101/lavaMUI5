import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { MySharedService } from './MySharedService';
import { ConfigService } from '../config/config.service';


@Injectable()
export class LavaService {

    constructor(private http: Http,
        private _mySharedService: MySharedService,
        private _global: ConfigService) { }
    //baseURL = this._global.GENERAL_CONFIG.SERVICE_URL; 
    baseURL = this._global.config_data.GENERAL_CONFIG.SERVICE_URL; // service url  


    analyticID = 1;

    setHeaders() {
        let headers = new Headers({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
            'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
            'Content-Type': 'application/json',
            'Lava-Authorization': 'Bearer ee6308b0-1ed7-454d-9662-954ca175a4c4',
            'App-Id': 26
        });
        let options = new RequestOptions({ headers: headers });
        return options;
    }
    setHeadersWithToken() {
        let token = this._mySharedService.getTokens();
        let headers = new Headers({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
            'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
            'Content-Type': 'application/json',
            'Lava-Authorization': 'Bearer ee6308b0-1ed7-454d-9662-954ca175a4c4',
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
        let token = this._mySharedService.getTokens();
        console.log(token);
        return this.http.get(this.baseURL + 'user/' + token.internalID, this.setHeadersWithToken())
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    postUserRole = function (params) {
        return this.http.post(this.baseURL + 'user', params, this.setHeadersWithToken())
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    };

    doLogout = function () {
        let token = this._mySharedService.getTokens();
        var logoutData = {
            "internalId": token.internalID,
            "domain": "web"
        };

        return this.http.post(this.baseURL + 'logout', logoutData, this.setHeadersWithToken())
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    };


    private extractData(res: Response) {
        let body = res.json();
        return body || {};

    }

    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: {};
        try {
            errMsg = {
                msg: error.json(),
                code: error.status
            };
            console.log('object');
        }
        catch (e) {
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
    // Home dashboard
    getHomeData() {
        return this.http.get(this.baseURL + 'rules/ruleStatistics/', this.setHeaders())
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }
    getActivityFeed() {
        return this.http.get(this.baseURL + 'rules/activityFeed/', this.setHeaders())
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    // Broadcast dashboard
    getInstantBroadcast(appId) {
        return this.http.get(this.baseURL + 'instantbroadcast/' + appId, this.setHeaders())
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

}
