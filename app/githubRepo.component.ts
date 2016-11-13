import { Component, EventEmitter, Input, Output, OnChanges, ViewEncapsulation } from '@angular/core';
import { GithubService } from './services/github.service';

@Component({
    moduleId: module.id,
    selector: 'github-repo',
    templateUrl: 'githubRepo.component.html',
    styles: ["github-repo { display: block; }"],
    encapsulation: ViewEncapsulation.None
})

export class GithubRepo implements OnChanges {
    @Input() repo: string;
    @Input() username: string;
    @Output('onRepoUpdated') onRepoUpdated: EventEmitter<any> = new EventEmitter();
    @Output('onReactorConfigStatus') onReactorConfigStatus: EventEmitter<any> = new EventEmitter();
    @Output('onError') onError: EventEmitter<any> = new EventEmitter();
    
    model: any;
    commits: any;
    contents: any;
    
    handleError(error: any) {
        this.onError.emit({
            response: error,
            sender: this
        });
    }
    
    ngOnChanges(changes: any) {
        if (changes.repo) this.repo = changes.repo.currentValue;
        if (changes.username) this.username = changes.username.currentValue;
        
        if (typeof this.repo === 'string' && typeof this.username === 'string') {
            this.model = null;
            this.commits = null;
            this.contents = null;
            
            this.github.getRepo(this.username, this.repo).subscribe(repo => {
                this.model = repo;
                
                console.log("Received repo ", repo);
                
                if (repo.size > 0) {
                    this.github.getCommits(this.username, this.repo).subscribe(commits => {
                        this.commits = commits.slice(0, Math.min(10, commits.length));
                        
                        console.log("Received repo commits ", commits);
                    }, error => this.handleError(error));
                    
                    this.github.getContents(this.username, this.repo).subscribe(contents => {
                        this.contents = contents;
                        
                        this.onReactorConfigStatus.emit(this.contents.filter(function (file) {
                            return file.name.toLowerCase() == ".reactor.yml";
                        }).length == 0 ? "requires" : "exists");
                        
                        console.log("Received repo contents ", contents);
                    }, error => this.handleError(error));
                } else {
                    console.log("Empty repo");
                    
                    this.onReactorConfigStatus.emit("requires");
                }
                
                this.onRepoUpdated.emit(repo);
            }, error => this.handleError(error));
        }
    }
    
    constructor(private github: GithubService) {
        
    }
}