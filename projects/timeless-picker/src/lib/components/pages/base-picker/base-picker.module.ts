import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasePickerComponent } from "./base-picker.component";



@NgModule({
  declarations: [BasePickerComponent],
  exports: [BasePickerComponent],
  imports: [CommonModule]
})
export class BasePickerModule { }
