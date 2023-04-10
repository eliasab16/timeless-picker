import { NgModule } from '@angular/core';
import {BrowserModule, HammerModule} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PickerComponent } from './components/picker/picker.component';

@NgModule({
  declarations: [
    AppComponent,
    PickerComponent
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
