import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { GithubService } from './services/github.service';

@Component({
    moduleId: module.id,
    selector: 'github-user',
    templateUrl: 'githubUser.component.html'
})

export class GithubUser implements OnChanges {
    @Input() username: string;
    @Output('user-updated') userEmitter: EventEmitter<any> = new EventEmitter();
    
    model: any;
    
    ngOnChanges(changes: any) {
        this.username = changes.username.currentValue;
        
        if (typeof this.username === 'string') {
            this.github.getUser(this.username).subscribe(user => {
                this.model = user;
                
                this.userEmitter.emit(user);
            });
        }
    }
    
    constructor(private github: GithubService) {
        
    }
}