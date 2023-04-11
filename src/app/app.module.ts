import { NgModule } from '@angular/core';
import {BrowserModule, HammerModule} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PickerComponent } from './components/wheel-picker/picker.component';
import { TimePickerComponent } from './components/time-picker/time-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    PickerComponent,
    TimePickerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HammerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
