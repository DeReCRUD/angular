import { FormSubmissionCallback } from '@de-re-crud/core';

export interface FormSubmission {
  value: any;
  onComplete: FormSubmissionCallback;
}
