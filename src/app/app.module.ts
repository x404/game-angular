import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ScoreComponent } from './score/score.component';
import { ErrorValuesPipe } from './pipes/error-values.pipe'
import { SuccessValuesPipe } from './pipes/success-values.pipe';
import { ModalComponent } from './modal/modal.component'
import { FormsModule } from '@angular/forms';
//import { DataService } from './services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    ScoreComponent,
    ErrorValuesPipe,
    SuccessValuesPipe,
    ModalComponent
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
