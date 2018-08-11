import { Component } from '@angular/core';
import { DeReCrudOptions } from '@de-re-crud/core';
import { Bootstrap3RendererOptions } from '@de-re-crud/renderer-bootstrap3';
import { FormSubmission } from 'de-re-crud-angular-lib';
import schemaJson from '../schema.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  schema = schemaJson;
  struct = 'user';

  onSubmit = (e: FormSubmission) => {
    e.onComplete();
  };

  constructor() {
    DeReCrudOptions.setDefaults({
      rendererOptions: Bootstrap3RendererOptions
    });
  }
}
