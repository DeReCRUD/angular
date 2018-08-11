import {
  Component,
  ViewChild,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  SimpleChanges
} from '@angular/core';
import { renderForm, Form, FormSubmissionCallback } from '@de-re-crud/core';
import { FormHostDirective } from './form-host.directive';
import { FormSubmission } from './models/form-submission';

@Component({
  selector: 'drc-form',
  template: `
    <div class="de-re-crud-form-angular" drcFormHost></div>
  `,
  styles: []
})
export class FormComponent implements OnChanges {
  @ViewChild(FormHostDirective)
  formHost: FormHostDirective;

  @Input()
  schema: any;

  @Input()
  struct: string;

  @Output()
  submitForm = new EventEmitter<FormSubmission>();

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    this.render();
  }

  onSubmit = (value: any, cb: FormSubmissionCallback) => {
    this.submitForm.emit({
      value,
      onComplete: cb
    });
  }

  render() {
    const nativeElement = this.formHost.viewContainerRef.element.nativeElement;

    renderForm(Form, {
      schema: this.schema,
      struct: this.struct,
      onSubmit: this.onSubmit
    }, nativeElement);
  }
}
