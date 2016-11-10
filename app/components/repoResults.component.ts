import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';

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
    
    constructor() {
        
    }
}