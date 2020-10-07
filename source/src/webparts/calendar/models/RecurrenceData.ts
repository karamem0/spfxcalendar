import * as xml2js from 'xml2js';

import { DateTime } from '../utils/DateTime';

export class RecurrenceDataByDay {

  public month: number;
  public number: number;
  public day: number;

  constructor(data: any) {
    if (data.hasOwnProperty('$')) {
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
    } else {
      this.month = data.month;
      if (data.number == 'first') {
        this.number = 0;
      }
      if (data.number == 'second') {
        this.number = 1;
      }
      if (data.number == 'third') {
        this.number = 2;
      }
      if (data.number == 'fourth') {
        this.number = 3;
      }
      if (data.number == 'last') {
        this.number = 4;
      }
      if (data.day == 'day') {
        this.day = -1;
      }
      if (data.day == 'weekday') {
        this.day = -2;
      }
      if (data.day == 'weekend_day') {
        this.day = -3;
      }
      if (data.day == 'su') {
        this.day = 0;
      }
      if (data.day == 'mo') {
        this.day = 1;
      }
      if (data.day == 'tu') {
        this.day = 2;
      }
      if (data.day == 'we') {
        this.day = 3;
      }
      if (data.day == 'th') {
        this.day = 4;
      }
      if (data.day == 'fr') {
        this.day = 5;
      }
      if (data.day == 'sa') {
        this.day = 6;
      }
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
    } else if (this.day == -1) {
      if (this.number <= 3) {
        date.setDate(date.getDate() + this.number);
      } else {
        date = new DateTime(date).endOfMonth().toDate();
      }
    } else if (this.day == -2) {
      if (this.number <= 3) {
        DateTime.enumWeekdays(date, new DateTime(date).endOfMonth().toDate(), (enumIndex, enumDate) => {
          if (enumIndex < this.number) {
            return true;
          }
          date = new Date(enumDate);
          return false;
        });
      } else {
        date = new DateTime(date).endOfMonth().toDate();
        if (date.getDay() == 0) {
          date.setDate(date.getDate() - 2);
        }
        if (date.getDay() == 6) {
          date.setDate(date.getDate() - 1);
        }
      }
    } else if (this.day == -3) {
      if (this.number <= 3) {
        DateTime.enumWeekendDays(date, new DateTime(date).endOfMonth().toDate(), (enumIndex, enumDate) => {
          if (enumIndex < this.number) {
            return true;
          }
          date = new Date(enumDate);
          return false;
        });
      } else {
        date = new DateTime(date).endOfMonth().toDate();
        if (date.getDay() < 6) {
          date = new DateTime(date).beginOfWeek().toDate();
        }
      }
    }
    return date;
  }

}

class RecurrenceDataYearly {

  public frequency: number;
  public month: number;
  public date: number;

  constructor(data: any) {
    this.frequency = Number.parseInt(data.$.yearFrequency);
    this.month = Number.parseInt(data.$.month) - 1;
    this.date = Number.parseInt(data.$.day);
  }

  public toDate(year: number): Date {
    return new Date(year, this.month, this.date);
  }

}

class RecurrenceDataYearlyByDay extends RecurrenceDataByDay {

  constructor(data: any) {
    super(data);
  }

}

class RecurrenceDataMonthly {

  public frequency: number;
  public date: number;

  constructor(data: any) {
    this.frequency = Number.parseInt(data.$.monthFrequency);
    this.date = Number.parseInt(data.$.day);
  }

  public toDate(year: number, month: number): Date {
    return DateTime.getDate(year, month, this.date);
  }

}

class RecurrenceDataMonthlyByDay extends RecurrenceDataByDay {

  public frequency: number;

  constructor(data: any) {
    super(data);
    this.frequency = Number.parseInt(data.$.monthFrequency);
  }

}

class RecurrenceDataWeekly {

  public frequency: number;
  public days: boolean[];

  constructor(data: any) {
    this.frequency = Number.parseInt(data.$.weekFrequency);
    this.days = [
      data.$.hasOwnProperty('su'),
      data.$.hasOwnProperty('mo'),
      data.$.hasOwnProperty('tu'),
      data.$.hasOwnProperty('we'),
      data.$.hasOwnProperty('th'),
      data.$.hasOwnProperty('fr'),
      data.$.hasOwnProperty('sa'),
    ];
  }

}

class RecurrenceDataDaily {

  public frequency: number;
  public weekday: boolean;

  constructor(data: any) {
    this.frequency = Number.parseInt(data.$.dayFrequency);
    this.weekday = data.$.hasOwnProperty('weekday');
  }

}

class RecurrenceDataRepeat {

  constructor(private data: any) {
  }

  public get yearly(): RecurrenceDataYearly {
    if (this.data.hasOwnProperty('yearly')) {
      return new RecurrenceDataYearly(this.data.yearly);
    }
  }

  public get monthly(): RecurrenceDataMonthly {
    if (this.data.hasOwnProperty('monthly')) {
      return new RecurrenceDataMonthly(this.data.monthly);
    }
  }

  public get weekly(): RecurrenceDataWeekly {
    if (this.data.hasOwnProperty('weekly')) {
      return new RecurrenceDataWeekly(this.data.weekly);
    }
  }

  public get daily(): RecurrenceDataDaily {
    if (this.data.hasOwnProperty('daily')) {
      return new RecurrenceDataDaily(this.data.daily);
    }
  }

  public get yearlyByDay(): RecurrenceDataYearlyByDay {
    if (this.data.hasOwnProperty('yearlyByDay')) {
      return new RecurrenceDataYearlyByDay(this.data.yearlyByDay);
    }
  }

  public get monthlyByDay(): RecurrenceDataMonthlyByDay {
    if (this.data.hasOwnProperty('monthlyByDay')) {
      return new RecurrenceDataMonthlyByDay(this.data.monthlyByDay);
    }
  }

}

class RecurrenceDataRule {

  constructor(private data: any) {
  }

  public get repeatForever(): string {
    if (this.data.hasOwnProperty('repeatForever')) {
      return this.data.repeatForever;
    }
  }

  public get repeatInstances(): number {
    if (this.data.hasOwnProperty('repeatInstances')) {
      return Number.parseInt(this.data.repeatInstances);
    }
  }

  public get windowEnd(): Date {
    if (this.data.hasOwnProperty('windowEnd')) {
      return new Date(Date.parse(this.data.windowEnd));
    }
  }

  public get repeat(): RecurrenceDataRepeat {
    if (this.data.hasOwnProperty('repeat')) {
      return new RecurrenceDataRepeat(this.data.repeat);
    }
  }

}

export class RecurrenceData {

  public static parse(str: string): RecurrenceData {
    let recurrenceData: RecurrenceData;
    xml2js.parseString(str, { explicitArray: false }, (error, result) => {
      recurrenceData = new RecurrenceData(result.recurrence);
    });
    return recurrenceData;
  }

  constructor(private data: any) { }

  public get rule(): RecurrenceDataRule {
    if (this.data.hasOwnProperty('rule')) {
      return new RecurrenceDataRule(this.data.rule);
    }
  }

}
