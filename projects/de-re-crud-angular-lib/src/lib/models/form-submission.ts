import {
  FormSubmissionCallback,
  IFieldChangeNotificationParams,
  IFieldParentChangeNotificationParams
} from '@de-re-crud/core';
import {
  FieldChangeNotificationCallback,
  FieldParentChangeNotificationCallback
} from '@de-re-crud/core/form/form.props';

export interface IFormSubmission {
  value: any;
  onComplete: FormSubmissionCallback;
}

export interface IFieldChangeEvent {
  params: IFieldChangeNotificationParams;
  onComplete?: FieldChangeNotificationCallback;
}

export interface IFieldParentChangeEvent {
  params: IFieldParentChangeNotificationParams;
  onComplete?: FieldParentChangeNotificationCallback;
}
