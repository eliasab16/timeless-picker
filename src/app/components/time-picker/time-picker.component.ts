import {Component, Input} from '@angular/core';
import {
  hoursArray12,
  hoursArray24,
  minutesArray
} from "../../constants/time";

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss']
})
export class TimePickerComponent {
  @Input() includeSeconds: boolean = false;
  @Input() hourFormat: 'hours24' | 'hours12' = 'hours24';
  @Input() valueFormat: 'iso' | 'simplified' = 'simplified';

  hours: string[] = hoursArray24;
  minutes: string[] = minutesArray;
  seconds: string[] = minutesArray;
  dayPeriods: string[] = ['', '', '1', '2', '3', '4', '5','',''];

  constructor() {
    this.hours = (this.hourFormat === 'hours24') ? hoursArray24 : hoursArray12;
  }
}
