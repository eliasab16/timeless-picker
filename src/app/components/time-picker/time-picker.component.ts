import {Component, Input, OnInit} from '@angular/core';
import {
  hoursArray12,
  hoursArray24,
  minutesArray, periodsArray
} from "../../constants/time";

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss']
})
export class TimePickerComponent implements OnInit{
  @Input() size: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' = 'medium';
  @Input() includeSeconds = false;
  @Input() hourFormat: 'hours24' | 'hours12' = 'hours24';
  @Input() valueFormat: 'iso' | 'simplified' = 'simplified';
  @Input() visibleItemsCount = 7;

  hours: string[] = hoursArray24;
  minutes: string[] = minutesArray;
  seconds: string[] = minutesArray;
  dayPeriods: string[] = periodsArray;

  ngOnInit() {
    this.hours = (this.hourFormat === 'hours24') ? hoursArray24 : hoursArray12;
  }
}
