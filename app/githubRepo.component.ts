import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { GithubService } from './services/github.service';

@Component({
    moduleId: module.id,
    selector: 'github-repo',
    templateUrl: 'githubRepo.component.html'
})

export class GithubRepo implements OnChanges {
    @Input() repo: string;
    @Input() username: string;
    @Output('repo-updated') repoEmitter: EventEmitter<any> = new EventEmitter();
    
    model: any;
    
    ngOnChanges(changes: any) {
        this.repo = changes.repo.currentValue;
        this.username = changes.username.currentValue;
        
        if (typeof this.repo === 'string' && typeof this.username === 'string') {
            this.github.getRepo(this.username, this.repo).subscribe(repo => {
                this.model = repo;
                
                this.repoEmitter.emit(repo);
            });
        }
    }
    
    constructor(private github: GithubService) {
        
    }
}