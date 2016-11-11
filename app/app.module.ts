import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }   from '@angular/http';

import { OAuthService} from 'angular2-oauth2/oauth-service';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { AppComponent }  from './app.component';
import { GithubUser } from './githubUser.component';
import { GithubRepo } from './githubRepo.component';
import { RepoResults } from './components/repoResults.component';
// import { routing } from './app.routes';
import { UrlValidator } from './urlValidator.directive';
import { Tooltip } from './directives/tooltip.directive';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, ChartsModule ],
  declarations: [ AppComponent, UrlValidator, GithubUser, GithubRepo, RepoResults, Tooltip ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }