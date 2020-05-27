import * as strings from 'CalendarWebPartStrings';
import * as xml2js from 'xml2js';

import { EventItem } from '../models/EventItem';
import { DateTime } from './DateTime';

abstract class RecurrenceDataByDay {

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
    return new Date(year, month, this.date);
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

class RecurrenceData {

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

export class RecurrenceItemGenerator {

  public static generate(data: any, date: Date): Array<EventItem> {
    const item = new EventItem(data);
    const result = new Array<EventItem>();
    const recurrenceData = RecurrenceData.parse(data.RecurrenceData);
    const calendarBeginDate = new DateTime(date).beginOfMonth().beginOfWeek().prevDay().toDate();
    const calendarEndDate = new DateTime(date).endOfMonth().endOfWeek().nextDay().toDate();
    if (recurrenceData.rule.repeat.yearly != undefined) {
      const repeatBeginDate = recurrenceData.rule.repeat.yearly.toDate(item.beginDate.getFullYear());
      const repeatEndDate = recurrenceData.rule.windowEnd < calendarEndDate
        ? recurrenceData.rule.windowEnd
        : calendarEndDate;
      DateTime.enumYears(repeatBeginDate, repeatEndDate, (yearIndex, yearDate) => {
        if (recurrenceData.rule.repeatInstances != undefined) {
          if (result.length >= recurrenceData.rule.repeatInstances) {
            return false;
          }
        }
        if (yearIndex % recurrenceData.rule.repeat.yearly.frequency == 0) {
          result.push({
            id: item.id,
            title: item.title,
            location: item.location,
            beginDate: new DateTime(yearDate).setTime(item.beginDate).toDate(),
            endDate: new DateTime(yearDate).setTime(item.endDate).toDate(),
            allDayEvent: item.allDayEvent,
            recurrence: strings.RecurrenceYearlyLabel
          });
        }
        return true;
      });
    }
    if (recurrenceData.rule.repeat.yearlyByDay != undefined) {
      const repeatBeginDate = recurrenceData.rule.repeat.yearlyByDay.toDate(item.beginDate.getFullYear(), recurrenceData.rule.repeat.yearlyByDay.month);
      const repeatEndDate = recurrenceData.rule.windowEnd < calendarEndDate
        ? recurrenceData.rule.windowEnd
        : calendarEndDate;
      DateTime.enumYears(repeatBeginDate, repeatEndDate, (yearIndex, yearDate) => {
        if (recurrenceData.rule.repeatInstances != undefined) {
          if (result.length >= recurrenceData.rule.repeatInstances) {
            return false;
          }
        }
        result.push({
          id: item.id,
          title: item.title,
          location: item.location,
          beginDate: new DateTime(yearDate).setTime(item.beginDate).toDate(),
          endDate: new DateTime(yearDate).setTime(item.endDate).toDate(),
          allDayEvent: item.allDayEvent,
          recurrence: strings.RecurrenceYearlyLabel
        });
        return true;
      });
    }
    if (recurrenceData.rule.repeat.monthly != undefined) {
      const repeatBeginDate = recurrenceData.rule.repeat.monthly.toDate(item.beginDate.getFullYear(), item.beginDate.getMonth());
      const repeatEndDate = recurrenceData.rule.windowEnd < calendarEndDate
        ? recurrenceData.rule.windowEnd
        : calendarEndDate;
      DateTime.enumMonths(repeatBeginDate, repeatEndDate, (monthIndex, monthDate) => {
        if (recurrenceData.rule.repeatInstances != undefined) {
          if (result.length >= recurrenceData.rule.repeatInstances) {
            return false;
          }
        }
        if (monthIndex % recurrenceData.rule.repeat.monthly.frequency == 0) {
          result.push({
            id: item.id,
            title: item.title,
            location: item.location,
            beginDate: new DateTime(monthDate).setTime(item.beginDate).toDate(),
            endDate: new DateTime(monthDate).setTime(item.endDate).toDate(),
            allDayEvent: item.allDayEvent,
            recurrence: strings.RecurrenceMonthlyLabel
          });
        }
        return true;
      });
    }
    if (recurrenceData.rule.repeat.monthlyByDay != undefined) {
      const repeatBeginDate = recurrenceData.rule.repeat.monthlyByDay.toDate(item.beginDate.getFullYear(), item.beginDate.getMonth());
      const repeatEndDate = recurrenceData.rule.windowEnd < calendarEndDate
        ? recurrenceData.rule.windowEnd
        : calendarEndDate;
      DateTime.enumMonths(repeatBeginDate, repeatEndDate, (monthIndex, monthDate) => {
        if (recurrenceData.rule.repeatInstances != undefined) {
          if (result.length >= recurrenceData.rule.repeatInstances) {
            return false;
          }
        }
        if (monthIndex % recurrenceData.rule.repeat.monthlyByDay.frequency == 0) {
          result.push({
            id: item.id,
            title: item.title,
            location: item.location,
            beginDate: new DateTime(monthDate).setTime(item.beginDate).toDate(),
            endDate: new DateTime(monthDate).setTime(item.endDate).toDate(),
            allDayEvent: item.allDayEvent,
            recurrence: strings.RecurrenceMonthlyLabel
          });
        }
        return true;
      });
    }
    if (recurrenceData.rule.repeat.weekly != undefined) {
      const repeatBeginDate = item.beginDate;
      const repeatEndDate = recurrenceData.rule.windowEnd < calendarEndDate
        ? recurrenceData.rule.windowEnd
        : calendarEndDate;
      DateTime.enumWeeks(repeatBeginDate, repeatEndDate, (weekIndex, weekDate) => {
        if (recurrenceData.rule.repeatInstances != undefined) {
          if (result.length >= recurrenceData.rule.repeatInstances) {
            return false;
          }
        }
        if (weekIndex % recurrenceData.rule.repeat.weekly.frequency == 0) {
          const weekBeginDate = new DateTime(weekDate).beginOfWeek().toDate();
          const weekEndDate = new DateTime(weekDate).endOfWeek().toDate();
          DateTime.enumDates(weekBeginDate, weekEndDate, (dateIndex, dateDate) => {
            if (recurrenceData.rule.repeatInstances != undefined) {
              if (result.length >= recurrenceData.rule.repeatInstances) {
                return false;
              }
            }
            if (recurrenceData.rule.repeat.weekly.days[dateDate.getDay()]) {
              result.push({
                id: item.id,
                title: item.title,
                location: item.location,
                beginDate: new DateTime(dateDate).setTime(item.beginDate).toDate(),
                endDate: new DateTime(dateDate).setTime(item.endDate).toDate(),
                allDayEvent: item.allDayEvent,
                recurrence: strings.RecurrenceWeeklyLabel
              });
            }
            return true;
          });
        }
        return true;
      });
    }
    if (recurrenceData.rule.repeat.daily != undefined) {
      const repeatBeginDate = item.beginDate;
      const repeatEndDate = recurrenceData.rule.windowEnd < calendarEndDate
        ? recurrenceData.rule.windowEnd
        : calendarEndDate;
      DateTime.enumDates(repeatBeginDate, repeatEndDate, (dateIndex, dateDate) => {
        if (recurrenceData.rule.repeatInstances != undefined) {
          if (result.length >= recurrenceData.rule.repeatInstances) {
            return false;
          }
        }
        if (recurrenceData.rule.repeat.daily.weekday) {
          if (new DateTime(dateDate).isWeekday()) {
            result.push({
              id: item.id,
              title: item.title,
              location: item.location,
              beginDate: new DateTime(dateDate).setTime(item.beginDate).toDate(),
              endDate: new DateTime(dateDate).setTime(item.endDate).toDate(),
              allDayEvent: item.allDayEvent,
              recurrence: strings.RecurrenceDailyLabel
            });
          }
        } else {
          if (dateIndex % recurrenceData.rule.repeat.daily.frequency == 0) {
            result.push({
              id: item.id,
              title: item.title,
              location: item.location,
              beginDate: new DateTime(dateDate).setTime(item.beginDate).toDate(),
              endDate: new DateTime(dateDate).setTime(item.endDate).toDate(),
              allDayEvent: item.allDayEvent,
              recurrence: strings.RecurrenceDailyLabel
            });
          }
        }
        return true;
      });
    }
    return result.filter((value) =>
      value.beginDate >= calendarBeginDate &&
      value.beginDate <= calendarEndDate);
  }

}
