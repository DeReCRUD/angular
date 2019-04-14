import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import {
  IFieldRenderer,
  FieldChangeEvent
} from '@de-re-crud/core/models/renderers';
import {
  FieldType,
  SimpleFieldValue,
  ICustomHints
} from '@de-re-crud/core/models/schema';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

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
  value?: string;

  @Input()
  required: boolean;

  @Input()
  busy: boolean;

  @Input()
  readOnly: boolean;

  @Input()
  disabled: boolean;

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

  @Input()
  hints: ICustomHints;

  get parsedValue() {
    if (!this.value) {
      return null;
    }

    const date = new Date(this.value);

    if (isNaN(date.valueOf())) {
      return null;
    }

    return {
      year: date.getFullYear(),
      day: date.getDate(),
      month: date.getMonth() + 1
    };
  }

  onDateSelect(e: NgbDate) {
    const date = new Date(e.year, e.month - 1, e.day);

    this.onValueChange(date.toISOString());
  }
}
