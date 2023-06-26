import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TimePickerComponent} from "./time-picker.component";
import {BasePickerModule} from "../base-picker/base-picker.module";
import {
  TimelessContainerModule
} from "../../templates/timeless-container/timeless-container.module";



@NgModule({
  declarations: [
    TimePickerComponent,
  ],
  exports: [TimePickerComponent],
  imports: [
    CommonModule,
    BasePickerModule,
    TimelessContainerModule,
  ]
})
export class TimePickerModule { }
