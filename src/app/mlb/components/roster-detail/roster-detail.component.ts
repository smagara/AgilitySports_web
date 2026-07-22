import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'sports-roster-detail',
  templateUrl: './roster-detail.component.html',
})
export class RosterDetailComponent implements OnInit {
  @Input() mlbForm!: FormGroup;
  @Input() display: boolean = false;
  @Input() isAdding: boolean = false;
  @Input() isSubmitted: boolean = false;
  @Input() errMessage: string = '';
  @Output() hideDialog = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();
  @Output() add = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void { }

  onHideDialog() {
    this.hideDialog.emit();
  }

  onSave() {
    this.save.emit();
  }

  onAdd() {
    this.add.emit();
  }

  shouldValidate() {
    return this.isSubmitted && this.mlbForm.invalid;
  }

  hasError(controlName: string, errorCode?: string): boolean {
    const control = this.mlbForm.get(controlName);
    if (!control) {
      return false;
    }

    const shouldShow = control.touched || this.isSubmitted;
    if (!shouldShow) {
      return false;
    }

    return errorCode ? !!control.errors?.[errorCode] : control.invalid;
  }
}
