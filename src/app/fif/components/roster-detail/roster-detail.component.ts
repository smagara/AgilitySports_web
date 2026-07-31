import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'sports-roster-detail',
  templateUrl: './roster-detail.component.html',
})
export class RosterDetailComponent implements OnInit {
  @Input() fifForm!: FormGroup;
  @Input() display: boolean = false;
  @Input() isAdding: boolean = false;
  @Input() isSubmitted: boolean = false;
  @Input() errMessage: string = '';
  @Output() hideDialog = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();
  @Output() add = new EventEmitter<void>();

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
    return this.isSubmitted && this.fifForm.invalid;
  }
}
