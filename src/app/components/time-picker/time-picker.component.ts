import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {hoursArray12, hoursArray24, minutesArray, periodsArray} from "../../constants/time";
import { PeriodIndex, PickerCategory, TimeIndex} from "../../constants/category";

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss']
})
export class TimePickerComponent implements OnInit{
  @Input() size: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' = 'medium';
  @Input() showSeconds = false;
  @Input() hourFormat: 'hours24' | 'hours12' = 'hours24';
  @Input() valueFormat: 'iso' | 'simplified' = 'simplified';
  @Input() visibleItemsCount = 7;
  @Input() startTime: string | Date = '11:25:00';

  @Output() timeChangeSimple = new EventEmitter<string>();
  @Output() timeChangeIso = new EventEmitter<Date>();


  pickerCategory = PickerCategory;
  selectedIndex: TimeIndex = {
    hours: 11,
    minutes: 25,
    seconds: 20,
    period: 0
  }

  hours: string[] = hoursArray24;
  minutes: string[] = minutesArray;
  seconds: string[] = minutesArray;
  dayPeriods: string[] = periodsArray;

  ngOnInit() {
    this.hours = (this.hourFormat === 'hours24') ? hoursArray24 : hoursArray12;
    this.convertTimeToIndex(this.startTime, this.selectedIndex);
  }

  indexChange(newIndex: number, type: string) {
    switch (type) {
      case this.pickerCategory.hours:
        this.selectedIndex.hours = newIndex;
        break;
      case this.pickerCategory.minutes:
        this.selectedIndex.minutes = newIndex;
        break;
      case this.pickerCategory.seconds:
        this.selectedIndex.seconds = newIndex;
        break;
      case this.pickerCategory.period:
        this.selectedIndex.period = newIndex;
    }
  }

  convertTimeToIndex(timeInput: string | Date, selectedIndex: TimeIndex) {
    const time = new Date(timeInput);
    if (this.hourFormat === 'hours24') {
      selectedIndex.hours = time.getHours()
    } else {
      const hours = time.getHours() % 12;
      selectedIndex.period = (hours >= 12) ? PeriodIndex.PM : PeriodIndex.AM;
      selectedIndex.hours = (hours === 0) ? 12 : hours;
    }
    selectedIndex.minutes = time.getMinutes();
    selectedIndex.seconds = time.getSeconds();
  }
}
