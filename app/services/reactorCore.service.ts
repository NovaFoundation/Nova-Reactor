import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

declare function readCookie(name: string): string;

@Injectable()
export class ReactorCoreService
{
    private static headers: Headers = new Headers({ 'Accept': 'application/json' });
    
    constructor(private http: Http) {
        this.updateHeaders();
    }
    
    updateHeaders() {
        var accessToken = readCookie('github_access_token');
        
        if (accessToken != null) {
            if (ReactorCoreService.headers.has('Authorization')) {
                ReactorCoreService.headers.set('Authorization', 'token ' + accessToken);
            } else {
                ReactorCoreService.headers.append('Authorization', 'token ' + accessToken);
            }
        }
    }
    
    getBuilds(repo: string, commit?: string) {
        return this.http.get("http://api.nova-reactor.com:8080/builds/" + repo + (commit ? "/" + commit : ""), new RequestOptions({ headers: ReactorCoreService.headers })).map(res => res.json())
    }
}