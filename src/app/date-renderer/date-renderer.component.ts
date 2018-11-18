import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import {
  IFieldRenderer,
  FieldChangeEvent
} from '@de-re-crud/core/models/renderers';
import {
  FieldType,
  FieldValue,
  SimpleFieldValue
} from '@de-re-crud/core/models/schema';

@Component({
  selector: 'app-date-renderer',
  templateUrl: './date-renderer.component.html',
  styleUrls: ['./date-renderer.component.css']
})
export class DateRendererComponent implements IFieldRenderer {
  @Input()
  label: string;

  @Input()
  placeholder?: string;

  @Input()
  fieldName: string;

  @Input()
  fieldType: FieldType;

  @Input()
  fieldDescription?: string;

  @Input()
  errors: string[];

  @Input()
  value?: FieldValue;

  @Input()
  required: boolean;

  @Input()
  readOnly: boolean;

  @Input()
  onFocus: (e: FocusEvent) => void;

  @Input()
  onBlur: (e: FocusEvent) => void;

  @Input()
  onChange: (e: FieldChangeEvent) => void;

  @Input()
  onValueChange: (e: SimpleFieldValue) => void;

  @Input()
  rendererId: string;
}
