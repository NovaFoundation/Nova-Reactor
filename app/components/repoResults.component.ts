import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';

import { GithubService } from '../services/github.service';

@Component({
    moduleId: module.id,
    selector: 'repo-results',
    templateUrl: 'repoResults.component.html'
})

export class RepoResults implements OnChanges {
    @Input() repo: any;
    @Output('onDataReceived') onDataReceivedEmitter: EventEmitter<any> = new EventEmitter();
    @Output('onErrorReceived') onErrorReceivedEmitter: EventEmitter<any> = new EventEmitter();
    @Output('onConfigStatusReceived') onConfigStatusReceivedEmitter: EventEmitter<any> = new EventEmitter();
    
    constructor(private github: GithubService) {}
    
    dataReceived(data: any, type: string) {
        this.onDataReceivedEmitter.emit({
            data: data,
            type: type
        });
    }
    
    configStatusReceived(value: boolean) {
        this.onConfigStatusReceivedEmitter.emit(value);
    }
    
    handleError(error: any) {
        this.onErrorReceivedEmitter.emit(error);
    }
    
    ngOnChanges(changes: any) {
        
    }
    
    authenticateUser() {
        this.github.authenticateGithubUser(observer => {
            console.log("u r an authentic person");
        }, observer => {
            console.log("ur a fake");
        }).subscribe(value => {
            console.log("?");
        }, error => {
            console.log("uh oh");
        });
    }
}