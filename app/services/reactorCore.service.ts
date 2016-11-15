import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { WebRequestService } from './WebRequestService';

declare function readCookie(name: string): string;

@Injectable()
export class ReactorCoreService extends WebRequestService
{
    // public static readonly REACTOR_URL: string = "http://localhost:8080";
    public static readonly REACTOR_URL: string = "http://api.nova-reactor.com:8080";
    
    constructor(http: Http) {
        super(http);
    }
    
    getBuilds(repo: string, commit?: string) {
        return this.get(ReactorCoreService.REACTOR_URL + "/builds/" + repo + (commit ? "/" + commit : ""))
    }
}