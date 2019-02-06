import { NgModule, Injector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DeReCrudOptions } from '@de-re-crud/core';
import { Bootstrap4RendererOptions } from '@de-re-crud/renderer-bootstrap4';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { DeReCrudModule, wrapNgComponent } from 'de-re-crud-angular-lib';
import { AppComponent } from './app.component';
import { DateRendererComponent } from './date-renderer/date-renderer.component';

@NgModule({
  declarations: [AppComponent, DateRendererComponent],
  imports: [BrowserModule, FormsModule, DeReCrudModule, NgbDatepickerModule],
  entryComponents: [DateRendererComponent],
  exports: [DateRendererComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(injector: Injector) {
    DeReCrudOptions.setDefaults({
      renderers: {
        dateField: wrapNgComponent(injector, DateRendererComponent)
      },
      rendererOptions: Bootstrap4RendererOptions
    });
  }
}
