import {Component, Input, OnInit} from '@angular/core';
import {
  hoursArray12,
  hoursArray24,
  minutesArray, periodsArray
} from "../../constants/time";
import { PickerCategory } from "../../constants/category";

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

  pickerCategory = PickerCategory;
  hoursSelectedIndex = 8;
  minutesSelectedIndex = 26;
  secondsSelectedIndex = 20;
  periodSelectedIndex = 0;

  hours: string[] = hoursArray24;
  minutes: string[] = minutesArray;
  seconds: string[] = minutesArray;
  dayPeriods: string[] = periodsArray;

  ngOnInit() {
    this.hours = (this.hourFormat === 'hours24') ? hoursArray24 : hoursArray12;
  }

  indexChange(newIndex: number, type: string) {
    switch (type) {
      case this.pickerCategory.hours:
        this.hoursSelectedIndex = newIndex;
        break;
      case this.pickerCategory.minutes:
        this.minutesSelectedIndex = newIndex;
        break;
      case this.pickerCategory.seconds:
        this.secondsSelectedIndex = newIndex;
        break;
      case this.pickerCategory.period:
        this.periodSelectedIndex = newIndex;
    }
    console.log(this.hoursSelectedIndex, this.minutesSelectedIndex, this.secondsSelectedIndex, this.periodSelectedIndex)
  }
}
