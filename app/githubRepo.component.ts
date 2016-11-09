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
    commits: any;
    
    ngOnChanges(changes: any) {
        if (changes.repo) this.repo = changes.repo.currentValue;
        if (changes.username) this.username = changes.username.currentValue;
        
        if (typeof this.repo === 'string' && typeof this.username === 'string') {
            this.github.getRepo(this.username, this.repo).subscribe(repo => {
                this.model = repo;
                
                this.repoEmitter.emit(repo);
            });
            this.github.getCommits(this.username, this.repo).subscribe(commits => {
                this.commits = commits.slice(0, Math.min(10, commits.length));
            });
        }
    }
    
    constructor(private github: GithubService) {
        
    }
}