import {
  FormSubmissionCallback,
  IFieldParentChangeNotificationParams
} from '@de-re-crud/core';
import { FieldParentChangeNotificationCallback } from '@de-re-crud/core/form/form.props';

export interface IFormSubmission {
  value: any;
  onComplete: FormSubmissionCallback;
}

export interface IFieldParentChangeEvent {
  params: IFieldParentChangeNotificationParams;
  onComplete?: FieldParentChangeNotificationCallback;
}
