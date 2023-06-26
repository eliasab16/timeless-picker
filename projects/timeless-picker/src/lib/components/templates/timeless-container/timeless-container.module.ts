import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TimelessContainerComponent} from "./timeless-container.component";



@NgModule({
  declarations: [TimelessContainerComponent],
  exports: [TimelessContainerComponent],
  imports: [CommonModule]
})
export class TimelessContainerModule { }
