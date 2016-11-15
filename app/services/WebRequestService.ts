import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

declare function readCookie(name: string): string;

@Injectable()
export class WebRequestService
{
    private static headers: Headers = new Headers({ 'Accept': 'application/json' });
    
    constructor(private http: Http) {
        this.updateHeaders();
    }
    
    updateHeaders() {
        var accessToken = readCookie('github_access_token');
        
        if (accessToken != null) {
            if (WebRequestService.headers.has('Authorization')) {
                WebRequestService.headers.set('Authorization', 'token ' + accessToken);
            } else {
                WebRequestService.headers.append('Authorization', 'token ' + accessToken);
            }
        }
    }
    
    get(url: string) {
        return this.request(url, "get");
    }
    
    delete(url: string) {
        return this.request(url, "delete");
    }
    
    post(url: string, data: any = undefined) {
        return this.request(url, "post", data);
    }
    
    put(url: string, data: any = undefined) {
        return this.request(url, "put", data);
    }
    
    request(url: string, method: string, data: any = undefined) {
        return this.http[method](url, new RequestOptions({ headers: WebRequestService.headers }), data).map(res => res.json()).catch(error => {
            return Observable.throw(error)
        });
    }
}