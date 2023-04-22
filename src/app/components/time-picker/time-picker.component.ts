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
  @Input() hourFormat: 'hours24' | 'hours12' = 'hours24';
  // simple: HH:ss:mm
  @Input() valueFormat: 'iso' | 'simple' = 'simple';
  @Input() showSeconds = false;
  @Input() visibleItemsCount = 7;
  @Input() startTime = '11:25:10';

  // Return the time in both ISO and simple format
  @Output() timeChangeIso = new EventEmitter<string>();
  @Output() timeChangeSimple = new EventEmitter<string>();

  pickerCategory = PickerCategory;
  selectedIndex: TimeIndex = {
    hours: 11,
    minutes: 25,
    seconds: 20,
    period: 0
  }

  // Input arrays to pass to the picker
  hours: string[] = hoursArray24;
  minutes: string[] = minutesArray;
  seconds: string[] = minutesArray;
  dayPeriods: string[] = periodsArray;

  ngOnInit() {
    this.hours = (this.hourFormat === 'hours24') ? hoursArray24 : hoursArray12;
    this.convertTimeToIndex(this.startTime, this.selectedIndex);
  }

  selectionChange(newIndex: number, type: string) {
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

    this.emitTimeChange(this.selectedIndex);
  }

  // The base picker component doesn't care what the value is, but it rather works with the
  // index within the input data array, so we must translate time to index (that matches the
  // predefined times constants).
  convertTimeToIndex(timeInput: string, selectedIndexes: TimeIndex) {
    let hoursInput: number;
    const timeDate = new Date(timeInput);
    // Determine if the input string is in ISO or simple HH:mm:ss format
    if (!isNaN(timeDate.getTime())) {
      selectedIndexes.minutes = timeDate.getMinutes();
      selectedIndexes.seconds = timeDate.getSeconds();
      hoursInput = timeDate.getHours();
    } else {
      const [hours, minutes, seconds=0] = timeInput.split(':').map(Number);
      selectedIndexes.minutes = minutes;
      selectedIndexes.seconds = seconds;
      hoursInput = hours;
    }

    if (this.hourFormat === 'hours24') {
      selectedIndexes.hours = hoursInput
    } else {
      const hours = hoursInput % 12;
      selectedIndexes.period = (hours >= 12) ? PeriodIndex.PM : PeriodIndex.AM;
      selectedIndexes.hours = (hours === 0) ? 12 : hours;
    }
  }

  emitTimeChange(selectedIndexes: TimeIndex) {
    // We have to convert the index back to time format (both ISO and simple)
    let hoursInput: number = this.selectedIndex.hours;
    if (this.hourFormat === 'hours12') {
      hoursInput = selectedIndexes.hours + (12 * selectedIndexes.period);
      hoursInput %= 24;
    }

    const hours = hoursInput.toString().padStart(2, '0')
    const minutes = selectedIndexes.minutes.toString().padStart(2, '0');
    const seconds = selectedIndexes.seconds.toString().padStart(2, '0');

    const timeSimple = `${hours}:${minutes}:${seconds}`;

    const currentDate = new Date();
    const timeIso = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      hoursInput,
      selectedIndexes.minutes,
      selectedIndexes.seconds
    )

    this.timeChangeSimple.emit(timeSimple);
    this.timeChangeIso.emit(timeIso.toISOString());
  }
}
