import { NgModule } from '@angular/core';
import { BasePickerModule } from "./components/pages/base-picker/base-picker.module";
import { TimePickerComponent } from "./components/pages/time-picker/time-picker.component";
import { TimePickerModule } from "./components/pages/time-picker/time-picker.module";
import {
  TimelessContainerModule
} from "./components/templates/timeless-container/timeless-container.module";
import { BasePickerComponent } from "./components/pages/base-picker/base-picker.component";
import {
  TimelessContainerComponent
} from "./components/templates/timeless-container/timeless-container.component";
import {CommonModule} from "@angular/common";


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    BasePickerModule,
    TimePickerModule,
    TimelessContainerModule,
  ],
  exports: [
    BasePickerModule,
    BasePickerComponent,
    TimePickerModule,
    TimePickerComponent,
    TimelessContainerModule,
    TimelessContainerComponent,
  ]
})
export class TimelessPickerModule { }
