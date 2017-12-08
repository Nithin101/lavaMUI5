import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';


@Injectable()
export class LavaService {

  constructor(private http: Http) {  }

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

    doLogin(params) {
        return this.http.post(this.baseURL + 'login', params, this.setHeaders()) 
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
        console.log('json', error.json());
        // console.log(typeof(error._body));

       
        if( typeof(error._body) == 'string'){
            console.log('string');
            errMsg = {
                msg: error._body,
                code: error.status
            };
        }
        else{
            // console.log(error.json());
            // const body = error.json()
            errMsg = {
                msg: error._body.json(),
                code: error.status
            };
        }
        console.log(errMsg);
		// if (error instanceof Response) {
		// 	const body = error.json() || '';
		// 	const err = body.error || JSON.stringify(body);
		// 	errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		// } else {
		// 	errMsg = error.message ? error.message : error.toString();
		// }

		console.error(errMsg);
		return Promise.reject(errMsg);
    }
    
}
