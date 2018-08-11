import {
  Component,
  ViewChild,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  SimpleChanges
} from '@angular/core';
import {
  renderForm,
  Form,
  FormSubmissionCallback,
  FormChangeNotificationType,
  IFormChangeNotificationParams,
  ICollectionReferences
} from '@de-re-crud/core';
import { RendererOptions, IErrors } from '@de-re-crud/core/models';
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
  cssClass?: string;

  @Input()
  schema: any;

  @Input()
  struct: string;

  @Input()
  block?: string;

  @Input()
  errors?: IErrors;

  @Input()
  value?: any;

  @Input()
  collectionReferences?: ICollectionReferences;

  @Input()
  rendererOptions?: RendererOptions;

  @Input()
  changeType?: FormChangeNotificationType;

  @Output()
  changed = new EventEmitter<IFormChangeNotificationParams>();

  @Output()
  submitted = new EventEmitter<FormSubmission>();

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    this.render();
  }

  onChange = (params: IFormChangeNotificationParams) => {
    this.changed.emit(params);
  };

  onSubmit = (value: any, cb: FormSubmissionCallback) => {
    this.submitted.emit({
      value,
      onComplete: cb
    });
  };

  render() {
    const nativeElement = this.formHost.viewContainerRef.element.nativeElement;

    renderForm(
      Form,
      {
        className: this.cssClass,
        schema: this.schema,
        struct: this.struct,
        block: this.block,
        onChangeType: this.changeType,
        onChange: this.onChange,
        onSubmit: this.onSubmit,
        rendererOptions: this.rendererOptions,
        collectionReferences: this.collectionReferences,
        errors: this.errors,
        value: this.value
      },
      nativeElement
    );
  }
}
