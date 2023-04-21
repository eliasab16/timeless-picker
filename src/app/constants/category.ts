export enum PickerCategory {
  hours= 'hours',
  minutes= 'minutes',
  seconds= 'seconds',
  period= 'period'
}

export interface TimeIndex {
  hours: number,
  minutes: number,
  seconds: number,
  period: number
}

export enum PeriodIndex {
  AM = 0,
  PM = 1,
}
