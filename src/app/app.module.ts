import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DeReCrudModule } from 'de-re-crud-angular-lib';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DeReCrudModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
