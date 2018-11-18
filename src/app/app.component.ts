import { Component } from '@angular/core';
import { IFormSubmission } from 'de-re-crud-angular-lib';
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
}
