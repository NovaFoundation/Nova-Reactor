import { Component, OnChanges, SimpleChanges, DoCheck, KeyValueDiffer, KeyValueDiffers } from '@angular/core';

import { OAuthService } from 'angular2-oauth2/oauth-service';

import { GithubService } from './services/github.service';
import { ReactorCoreService } from './services/reactorCore.service';
import { Patterns } from './Patterns';
import { RepoResults } from './components/repoResults.component';

declare var hashParams: any;
declare function getQueryString(hashParams: any): any;
declare function updateHash();
declare function readCookie(name: string): string;
declare function eraseCookie(name: string);

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  providers: [GithubService, ReactorCoreService, OAuthService]
})

export class AppComponent implements OnChanges, DoCheck {
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
        configStatus: undefined,
        configError: false,
        validClassLocation: false,
        mainClassLocation: undefined,
        rateLimitResetTime: undefined,
        rateLimitResetTimeMessage: undefined
    };
    
    loggedInUser = {
        name: undefined,
        url: undefined,
        data: undefined
    };
    
    hashParams: any = hashParams;
    waitingReply: boolean = false;
    loggedIn: boolean = readCookie('github_access_token') != null;
    go: boolean = this.hashParams && this.hashParams.go == "true";
    
    private differ: KeyValueDiffer;
    
    constructor(private differs: KeyValueDiffers, private oauth: OAuthService, private github: GithubService) {
        if (this.hashParams) {
            if (this.hashParams.url) {
                this.repo.url.value = this.hashParams.url;
            }
        }
        
        github.addLoginListener(() => this.setLoggedInInfo());
        github.addLogoutListener(() => this.logout());
        
        if (readCookie("github_access_token") != null) {
            this.setLoggedInInfo();
        }
        
        this.differ = differs.find({}).create(null);
    }
    
    ngOnChanges(changes: SimpleChanges) {
        console.log(changes);
    }
    
    ngDoCheck() {
        var changes = this.differ.diff(hashParams);
        
        if (changes) {
            updateHash();
        }
    }
    
    searchRepo() {
        this.hashParams.go = true;
        
        if (this.repo.url.value != this.repo.url.previousValue) {
            this.repo.searching = true;
            this.repo.invalidName = false;
            this.repo.invalidUsername = false;
            this.repo.rateLimitResetTime = undefined;
            this.repo.rateLimitResetTimeMessage = undefined;
            this.repo.configStatus = undefined;
            
            if (this.repo.data) {
                var url = this.repo.url.value;
                
                setTimeout(() => {
                    this.updateRepoDataFromUrl(url);
                }, 1000);
            } else {
                this.updateRepoDataFromUrl();
            }
        }
    }
    
    updateRepoDataFromUrl(url: string = this.repo.url.value) {
        if (!this.waitingReply) {
            this.repo.url.previousValue = url;
            
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
            
            this.waitingReply = true;
        }
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
        this.waitingReply = false;
    }
    
    urlUpdated(url: string) {
        if (url) {
            this.hashParams.url = url;
        } else {
            this.hashParams.url = undefined;
        }
    }
    
    updateReactorConfigStatus(status: string) {
        console.log("Received reactor config status \"" + status + "\"");
        
        this.repo.configStatus = status;
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
                    if (error.sender.model == null) {
                        this.repo.invalidName = true;
                    }
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
        this.waitingReply = false;
    }
    
    writeConfigFile() {
        var location = this.repo.mainClassLocation.trim()
        location += this.autoCompleteEnd(location, '.nova');
        
        this.github.writeFile(this.repo.user.login, this.repo.name, ".reactor.yml", ".reactor.yml", "Added .reactor.yml config file", "language: nova\nmainClassLocation: " + location).subscribe(response => {
            console.log("Wrote: ", response);
            
            this.repo.configStatus = "written";
        }, error => this.handleError({ response: error, type: "create-config" }));
    }
    
    autoCompleteEnd(value: string, end: string) {
        function endsWith(str, v) {
            var i = str.indexOf(v);
            
            return i >= 0 && i == str.length - v.length;
        }
        
        if (value) {
            for (var i = end.length; i > 0; i--) {
                if (endsWith(value, end.substring(0, i))) {
                    return end.substring(i);
                }
            }
        }
        
        return end;
    }
    
    private setLoggedInInfo() {
        this.github.getAuthenticatedUserInfo().subscribe(data => {
            this.loggedInUser = {
                name: data.name || data.login,
                url: data.html_url,
                data: data
            };
            
            console.log("Logged in as ", this.loggedInUser);
        }, error => {
            console.log("Unable to login: " + error.status + " (" + error.statusText + ")");
            
            this.logout();
        });
    }
    
    logout() {
        eraseCookie("github_access_token");
        
        this.loggedInUser = {
            name: undefined,
            url: undefined,
            data: undefined
        };
        
        this.github.updateHeaders();
    }
}