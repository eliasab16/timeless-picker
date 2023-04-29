import { NgModule } from '@angular/core';
import {BrowserModule, HammerModule} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasePickerComponent } from './components/pages/base-picker/base-picker.component';
import { TimePickerComponent } from './components/pages/time-picker/time-picker.component';
import {FormsModule} from "@angular/forms";
import { TimelessContainerComponent } from './components/templates/timeless-container/timeless-container.component';

@NgModule({
  declarations: [
    AppComponent,
    BasePickerComponent,
    TimePickerComponent,
    TimelessContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HammerModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
