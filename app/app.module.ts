import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppComponent }  from './app.component';
// import { routing } from './app.routes';
import { UrlValidator } from './urlValidator.directive';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, UrlValidator ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }