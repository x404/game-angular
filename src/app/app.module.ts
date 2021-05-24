import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ScoreComponent } from './score/score.component';
import { ErrorValuesPipe } from './pipes/error-values.pipe'
import { SuccessValuesPipe } from './pipes/success-values.pipe'

@NgModule({
  declarations: [
    AppComponent,
    ScoreComponent,
    ErrorValuesPipe,
    SuccessValuesPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
