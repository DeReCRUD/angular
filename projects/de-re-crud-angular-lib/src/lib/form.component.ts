import {
  Component,
  ViewChild,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  renderForm,
  Form,
  FormSubmissionCallback,
  FormChangeNotificationType,
  IFormChangeNotificationParams,
  ICollectionReferences
} from '@de-re-crud/core';
import { IButtonOptions } from '@de-re-crud/core/models/button-options';
import { IRendererOptions } from '@de-re-crud/core/models/renderer-options';
import { IErrors } from '@de-re-crud/core/models/errors';
import { FormHostDirective } from './form-host.directive';
import { FormSubmission } from './models/form-submission';
import { FormType } from '@de-re-crud/core/form/form.props';

@Component({
  selector: 'drc-form',
  template: `
    <div class="de-re-crud-form-angular" drcFormHost></div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnChanges {
  @ViewChild(FormHostDirective)
  formHost: FormHostDirective;

  @Input()
  type: FormType = 'create';

  @Input()
  cancelVisible: boolean;

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
  rendererOptions?: IRendererOptions;

  @Input()
  buttonOptions?: IButtonOptions;

  @Input()
  changeType?: FormChangeNotificationType;

  @Output()
  changed = new EventEmitter<IFormChangeNotificationParams>();

  @Output()
  canceled = new EventEmitter();

  @Output()
  submitted = new EventEmitter<FormSubmission>();

  constructor() {}

  ngOnChanges() {
    this.render();
  }

  onChange = (params: IFormChangeNotificationParams) => {
    this.changed.emit(params);
  };

  onCancel = () => {
    this.canceled.emit();
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
        type: this.type,
        className: this.cssClass,
        schema: this.schema,
        struct: this.struct,
        block: this.block,
        onCancel: this.cancelVisible ? this.onCancel : undefined,
        onChangeType: this.changeType,
        onChange: this.onChange,
        onSubmit: this.onSubmit,
        rendererOptions: this.rendererOptions,
        buttonOptions: this.buttonOptions,
        collectionReferences: this.collectionReferences,
        errors: this.errors,
        value: this.value
      },
      nativeElement
    );
  }
}
