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
    @Output('requires-reactor-config') requiresReactorConfigEmitter: EventEmitter<any> = new EventEmitter();
    @Output('error') errorEmitter: EventEmitter<any> = new EventEmitter();
    
    model: any;
    commits: any;
    contents: any;
    
    handleError(error: any) {
        this.errorEmitter.emit({
            response: error,
            sender: this
        });
    }
    
    ngOnChanges(changes: any) {
        if (changes.repo) this.repo = changes.repo.currentValue;
        if (changes.username) this.username = changes.username.currentValue;
        
        if (typeof this.repo === 'string' && typeof this.username === 'string') {
            this.github.getRepo(this.username, this.repo).subscribe(repo => {
                this.model = repo;
                
                this.repoEmitter.emit(repo);
            }, error => this.handleError(error));
            
            this.github.getCommits(this.username, this.repo).subscribe(commits => {
                this.commits = commits.slice(0, Math.min(10, commits.length));
            }, error => this.handleError(error));
            
            this.github.getContents(this.username, this.repo).subscribe(contents => {
                this.contents = contents;
                
                this.requiresReactorConfigEmitter.emit(this.contents.filter(function (file) {
                    return file.name.toLowerCase() == ".reactor.yml";
                }).length == 0);
            }, error => this.handleError(error));
        }
    }
    
    constructor(private github: GithubService) {
        
    }
}