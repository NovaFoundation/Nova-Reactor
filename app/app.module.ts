import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { AppComponent }  from './app.component';
// import { routing } from './app.routes';
import { HighlightDirective } from './validInput.directive';

@NgModule({
  imports:      [ BrowserModule, ReactiveFormsModule ],
  declarations: [ AppComponent, HighlightDirective ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }