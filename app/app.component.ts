import { Component } from '@angular/core';

import { OAuthService } from 'angular2-oauth2/oauth-service';

import { GithubService } from './services/github.service';
import { Patterns } from './Patterns';
import { RepoResults } from './components/repoResults.component';

declare var hashParams: any;
declare var handler: any;
declare function getQueryString(hashParams: any): any;
declare function updateHash();

@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers: [GithubService, OAuthService]
})

export class AppComponent {
    repo = {
        url: {
            value: undefined,
            previousValue: undefined,
            valid: false,
            username: undefined,
            validPattern: Patterns.validRepoPattern
        },
        user: undefined,
        name: undefined,
        invalidName: false,
        username: undefined,
        invalidUsername: false,
        host: undefined,
        data: undefined,
        searching: false,
        requiresConfig: false,
        configError: false,
        validClassLocation: false,
        mainClassLocation: undefined,
        rateLimitResetTime: undefined,
        rateLimitResetTimeMessage: undefined
    };
    
    go: boolean = hashParams && hashParams.go == "true";
    
    myApiHandler() {
        console.log("being handled...");
    }
    
    constructor(private oauth: OAuthService, private github: GithubService) {
        if (hashParams) {
            if (hashParams.url) {
                this.repo.url.value = hashParams.url;
            }
            if (hashParams.go) {
                hashParams.go = undefined;
                
                updateHash();
            }
        }
        
        handler = this.myApiHandler;
    }
    
    searchRepo() {
        if (this.repo.url.value != this.repo.url.previousValue) {
            this.repo.searching = true;
            this.repo.invalidName = false;
            this.repo.invalidUsername = false;
            this.repo.rateLimitResetTime = undefined;
            this.repo.rateLimitResetTimeMessage = undefined;
            
            if (this.repo.data) {
                setTimeout(() => {
                    this.updateRepoDataFromUrl();
                }, 1000);
            } else {
                this.updateRepoDataFromUrl();
            }
        }
    }
    
    updateRepoDataFromUrl() {
        this.repo.url.previousValue = this.repo.url.value;
        
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
        
        this.updateRequiresReactorConfig(false);
    }
    
    validMainClassLocation(location: string) {
        return location && location.length > 0;
    }
    
    invalidMainClassLocation(location: string) {
        return typeof location === 'string' && !this.validMainClassLocation(location);
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
    
    repoDataReceived(data: any) {
        if (data.type == 'user') {
            this.repo.user = data.data;
        } else if (data.type == 'repo') {
            this.repo.data = data.data;
        } else {
            console.error("Invalid data type given '" + data.type + "'");
        }
        
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
    
    updateRequiresReactorConfig(requires: boolean) {
        this.repo.requiresConfig = requires;
    }
    
    validateMainClassLocation(location: string) {
        this.repo.validClassLocation = this.validMainClassLocation(location);
    }
    
    handleError(error: any) {
        var type = error.sender ? error.sender.constructor.name : error.type;
        
        if (error.response.status == 403) {
            var repo = this.repo;
            
            error.response.headers.forEach(function (value, key) {
                if (key.toLowerCase() == "x-ratelimit-reset") {
                    repo.rateLimitResetTime = parseFloat(value[0]);
                }
            });
            
            var minutes = ~~((this.repo.rateLimitResetTime - Date.now() / 1000) / 60);
            
            this.repo.rateLimitResetTimeMessage = minutes + " minute" + (minutes != 1 ? "s" : "");
        } else {
            switch (type) {
                case "GithubRepo":
                    this.repo.invalidName = true;
                    break;
                case "GithubUser":
                    this.repo.invalidUsername = true;
                    break;
                case "create-config":
                    this.repo.configError = true;
                    break;
            }
        }
        
        this.repo.searching = false;
    }
    
    authenticateGithub() {
        /*var pos = { x:200, y:200 };//screenCenterPos(800, 500);
        
        var signinWin = window.open("https://github.com/login/oauth/authorize?scope=repo&client_id=c8720bb8f589d74d6ad4",
            "SignIn",
            "width=780,height=410,toolbar=0,scrollbars=0,status=0,resizable=0,location=0,menuBar=0,left=" + pos.x + ",top=" + pos.y);
        
        signinWin.focus();*/
        
        /*this.github.writeFile(this.repo.user.login, this.repo.name, ".reactor.yml", ".reactor.yml", "Added .reactor.yml config file", "language: nova\nmainClassLocation: " + this.repo.mainClassLocation).subscribe(response => {
            console.log("Wrote: ", response);
        }, error => this.handleError({ response: error, type: "create-config" }));*/
    }
}