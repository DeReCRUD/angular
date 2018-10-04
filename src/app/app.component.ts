import { Component } from '@angular/core';
import { DeReCrudOptions } from '@de-re-crud/core';
import { Bootstrap4RendererOptions } from '@de-re-crud/renderer-bootstrap4';
import {
  IFormSubmission,
  IFieldParentChangeEvent
} from 'de-re-crud-angular-lib';
import schemaJson from '../schema.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  schema = schemaJson;
  struct = 'person';

  onSubmit = (e: IFormSubmission) => {
    e.onComplete();
  };

  constructor() {
    DeReCrudOptions.setDefaults({
      rendererOptions: Bootstrap4RendererOptions
    });
  }
}
