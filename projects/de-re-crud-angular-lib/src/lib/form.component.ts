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
  FieldChangeNotificationType,
  IFieldChangeNotificationParams,
  IFieldParentChangeNotificationParams,
  ICollectionReferences
} from '@de-re-crud/core';
import { IButtonOptions } from '@de-re-crud/core/models/button-options';
import { IRendererOptions } from '@de-re-crud/core/models/renderer-options';
import { IErrors } from '@de-re-crud/core/models/errors';
import { FormHostDirective } from './form-host.directive';
import {
  IFieldParentChangeEvent,
  IFormSubmission
} from './models/form-submission';
import {
  FormType,
  FieldParentChangeNotificationCallback
} from '@de-re-crud/core/form/form.props';

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
  type?: FormType;

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
  initialValue?: any;

  @Input()
  collectionReferences?: ICollectionReferences;

  @Input()
  rendererOptions?: IRendererOptions;

  @Input()
  buttonOptions?: IButtonOptions;

  @Input()
  fieldChangeType?: FieldChangeNotificationType;

  @Output()
  fieldChanged = new EventEmitter<IFieldChangeNotificationParams>();

  @Input()
  asyncFieldParentChanges = false;

  @Output()
  fieldParentChanged = new EventEmitter<IFieldParentChangeEvent>();

  @Output()
  canceled = new EventEmitter();

  @Output()
  submitted = new EventEmitter<IFormSubmission>();

  constructor() {}

  ngOnChanges() {
    this.render();
  }

  onFieldChange = (params: IFieldChangeNotificationParams) => {
    this.fieldChanged.emit(params);
  };

  onFieldParentChange = (
    params: IFieldParentChangeNotificationParams,
    cb?: FieldParentChangeNotificationCallback
  ) => {
    const event: IFieldParentChangeEvent = {
      params
    };

    if (this.asyncFieldParentChanges) {
      event.onComplete = cb;
    } else {
      cb();
    }

    this.fieldParentChanged.emit(event);
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
        onFieldChangeType: this.fieldChangeType,
        onFieldChange: this.onFieldChange,
        onFieldParentChange: this.onFieldParentChange,
        onSubmit: this.onSubmit,
        rendererOptions: this.rendererOptions,
        buttonOptions: this.buttonOptions,
        collectionReferences: this.collectionReferences,
        errors: this.errors,
        initialValue: this.initialValue
      },
      nativeElement
    );
  }
}
