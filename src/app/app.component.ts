import { Component } from '@angular/core';
import {hours24} from "./constants/time";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'timeless-picker';
  hours: string[] = hours24;
  minutes: string[] = this.fillMinutes();

  fillMinutes() {
    const result: string[] = [];
    for (let i = 0; i <= 60; i++) {
      const minute = i < 10 ? `0${i}` : `${i}`;
      result.push(minute);
    }
    return result;
  }
}
