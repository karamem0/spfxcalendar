import { DateTime } from '../utils/DateTime';

export abstract class RecurrenceByDay {

  public month: number;
  public number: number;
  public day: number;

  constructor(data: any) {
    this.month = Number.parseInt(data.$.month) - 1;
    if (data.$.weekdayOfMonth == 'first') {
      this.number = 0;
    }
    if (data.$.weekdayOfMonth == 'second') {
      this.number = 1;
    }
    if (data.$.weekdayOfMonth == 'third') {
      this.number = 2;
    }
    if (data.$.weekdayOfMonth == 'fourth') {
      this.number = 3;
    }
    if (data.$.weekdayOfMonth == 'last') {
      this.number = 4;
    }
    if (data.$.hasOwnProperty('day')) {
      this.day = -1;
    }
    if (data.$.hasOwnProperty('weekday')) {
      this.day = -2;
    }
    if (data.$.hasOwnProperty('weekend_day')) {
      this.day = -3;
    }
    if (data.$.hasOwnProperty('su')) {
      this.day = 0;
    }
    if (data.$.hasOwnProperty('mo')) {
      this.day = 1;
    }
    if (data.$.hasOwnProperty('tu')) {
      this.day = 2;
    }
    if (data.$.hasOwnProperty('we')) {
      this.day = 3;
    }
    if (data.$.hasOwnProperty('th')) {
      this.day = 4;
    }
    if (data.$.hasOwnProperty('fr')) {
      this.day = 5;
    }
    if (data.$.hasOwnProperty('sa')) {
      this.day = 6;
    }
  }

  public toDate(year: number, month: number): Date {
    let date = new Date(year, month, 1);
    if (this.day >= 0) {
      date = new DateTime(date).beginOfWeek().toDate();
      date.setDate(date.getDate() + this.day);
      if (date.getMonth() < this.month) {
        date.setDate(date.getDate() + 7);
      }
      date.setDate(date.getDate() + 7 * this.number);
      if (date.getMonth() > this.month) {
        date.setDate(date.getDate() - 7);
      }
    }
    else if (this.day == -1) {
      if (this.number <= 3) {
        date.setDate(date.getDate() + this.number);
      }
      else {
        date = new DateTime(date).endOfMonth().toDate();
      }
    }
    else if (this.day == -2) {
      if (this.number <= 3) {
        DateTime.enumWeekdays(date, new DateTime(date).endOfMonth().toDate(), (enumIndex, enumDate) => {
          if (enumIndex < this.number) {
            return true;
          }
          date = new Date(enumDate);
          return false;
        });
      }
      else {
        date = new DateTime(date).endOfMonth().toDate();
        if (date.getDay() == 0) {
          date.setDate(date.getDate() - 2);
        }
        if (date.getDay() == 6) {
          date.setDate(date.getDate() - 1);
        }
      }
    }
    else if (this.day == -3) {
      if (this.number <= 3) {
        DateTime.enumWeekendDays(date, new DateTime(date).endOfMonth().toDate(), (enumIndex, enumDate) => {
          if (enumIndex < this.number) {
            return true;
          }
          date = new Date(enumDate);
          return false;
        });
      }
      else {
        date = new DateTime(date).endOfMonth().toDate();
        if (date.getDay() < 6) {
          date = new DateTime(date).beginOfWeek().toDate();
        }
      }
    }
    return date;
  }
  
}
