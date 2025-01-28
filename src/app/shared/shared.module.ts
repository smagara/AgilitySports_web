import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrimDirective } from '../common/directives/trim.directive';

@NgModule({
  declarations: [TrimDirective],
  imports: [CommonModule],
  exports: [TrimDirective]
})
export class SharedModule { }