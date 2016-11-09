import { Component } from '@angular/core';
import { GithubService } from './services/github.service';
import { Patterns } from './Patterns';

declare var hashParams: any;
declare function getQueryString(hashParams: any): any;
declare function updateHash();

@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers: [GithubService]
})

export class AppComponent {
    repo = {
        url: {
            value: undefined,
            valid: false,
            username: undefined,
            validPattern: Patterns.validRepoPattern
        },
        user: undefined,
        name: undefined,
        username: undefined,
        host: undefined,
        data: undefined,
        searching: false
    };
    
    go: boolean = hashParams && hashParams.go == "true";
    
    constructor() {
        if (hashParams) {
            if (hashParams.url) {
                this.repo.url.value = hashParams.url;
            }
            if (hashParams.go) {
                hashParams.go = undefined;
                
                updateHash();
            }
        }
    }
    
    searchRepo() {
        var url = this.repo.url.value;
        
        if (url[url.length - 1] == '/') {
            url = url.substring(0, url.length - 1);
        }
        
        var repoStartIndex = url.lastIndexOf('/');
        
        this.repo.name = url.substring(repoStartIndex + 1);
        
        if (this.repo.name.toLowerCase().indexOf('.git') > 0) {
            this.repo.name = this.repo.name.substring(0, this.repo.name.length - 4);
        }
        
        var userStartIndex = url.substring(0, repoStartIndex - 1).lastIndexOf('/');
        
        this.repo.username = url.substring(userStartIndex + 1, repoStartIndex);
        
        var hostStartIndex = url.substring(0, userStartIndex - 1).lastIndexOf('/');
        
        this.repo.host = url.substring(hostStartIndex + 1, userStartIndex - 4);
        
        if (this.repo.host.toLowerCase().indexOf('www.') == 0) {
            this.repo.host = this.repo.host.substring(4);
        }
        
        this.repo.searching = true;
    }
    
    updateUrlComponents(url: string) {
        this.repo.url.value = url;
    }
    
    updateRepoUrlValid(valid: boolean) {
        this.repo.url.valid = valid;
        
        if (valid && this.go) {
            this.go = false;
            
            this.searchRepo();
        }
    }
    
    updateUser(user: any) {
        this.repo.user = user;
    }
    
    updateRepo(repo: any) {
        this.repo.data = repo;
        
        this.repo.searching = false;
    }
    
    urlUpdated(url: string) {
        if (url) {
            hashParams.url = url;
        } else {
            hashParams.url = undefined;
        }
        
        updateHash();
    }
}