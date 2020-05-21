const dateFormat = require('dateformat') as Function;

export class DateTime {

  public static today(): DateTime {
    const date = new Date();
    return new DateTime(new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    ));
  }

  public static enumYears(beginDate: Date, endDate: Date, callback: { (index: number, date: Date): boolean }): void {
    let date = new Date(beginDate);
    for (let index = 0; ; index++) {
      if (date > endDate) {
        break;
      }
      if (!callback(index, new Date(date))) {
        break;
      }
      date.setFullYear(date.getFullYear() + 1);
    }
  }

  public static enumMonths(beginDate: Date, endDate: Date, callback: { (index: number, date: Date): boolean }): void {
    let date = new Date(beginDate);
    for (let index = 0; ; index++) {
      if (date > endDate) {
        break;
      }
      if (!callback(index, new Date(date))) {
        break;
      }
      date.setMonth(date.getMonth() + 1);
    }
  }

  public static enumWeeks(beginDate: Date, endDate: Date, callback: { (index: number, date: Date): boolean }): void {
    let date = new Date(beginDate);
    for (let index = 0; ; index++) {
      if (date > endDate) {
        break;
      }
      if (!callback(index, new Date(date))) {
        break;
      }
      date.setDate(date.getDate() + 7);
    }
  }

  public static enumDates(beginDate: Date, endDate: Date, callback: { (index: number, date: Date): boolean }): void {
    let date = new Date(beginDate);
    for (let index = 0; ; index++) {
      if (date > endDate) {
        break;
      }
      if (!callback(index, new Date(date))) {
        break;
      }
      date.setDate(date.getDate() + 1);
    }
  }

  public static enumWeekdays(beginDate: Date, endDate: Date, callback: { (index: number, date: Date): boolean }): void {
    let date = new Date(beginDate);
    for (let index = 0; ; index++) {
      if (date > endDate) {
        break;
      }
      if (date.getDay() >= 1 && date.getDay() <= 5) {
        if (!callback(index, new Date(date))) {
          break;
        }
      } else {
        index--;
      }
      date.setDate(date.getDate() + 1);
    }
  }

  public static enumWeekendDays(beginDate: Date, endDate: Date, callback: { (index: number, date: Date): boolean }): void {
    let date = new Date(beginDate);
    for (let index = 0; ; index++) {
      if (date > endDate) {
        break;
      }
      if (date.getDay() == 0 || date.getDay() == 6) {
        if (!callback(index, new Date(date))) {
          break;
        }
      } else {
        index--;
      }
      date.setDate(date.getDate() + 1);
    }
  }

  public static diffDates(beginDate: Date, endDate: Date): number {
    return Math.floor((endDate.getTime() - beginDate.getTime()) / 86400000);
  }

  private date: Date;

  constructor(value: string | Date) {
    switch (Object.prototype.toString.call(value).slice(8, -1)) {
      case 'String':
        this.date = new Date(Date.parse(value.toString()));
        break;
      case 'Date':
        this.date = new Date(value);
        break;
      case 'Null':
        break;
      default:
        throw new Error();
    }
  }

  public beginOfMonth(): DateTime {
    const date = new Date(this.date);
    date.setDate(1);
    return new DateTime(date);
  }

  public endOfMonth(): DateTime {
    const date = new Date(this.date);
    date.setMonth(date.getMonth() + 1);
    date.setDate(0);
    return new DateTime(date);
  }

  public beginOfWeek(): DateTime {
    const date = new Date(this.date);
    date.setDate(date.getDate() - date.getDay());
    return new DateTime(date);
  }

  public endOfWeek(): DateTime {
    const date = new Date(this.date);
    date.setDate(date.getDate() + 6 - date.getDay());
    return new DateTime(date);
  }

  public beginOfDate(): DateTime {
    const date = new Date(this.date);
    date.setHours(0, 0, 0, 0);
    return new DateTime(date);
  }

  public endOfDate(): DateTime {
    const date = new Date(this.date);
    date.setHours(23, 59, 59, 999);
    return new DateTime(date);
  }

  public nextYear(): DateTime {
    const date = new Date(this.date);
    date.setFullYear(date.getFullYear() + 1);
    return new DateTime(date);
  }

  public prevYear(): DateTime {
    const date = new Date(this.date);
    date.setFullYear(date.getFullYear() - 1);
    return new DateTime(date);
  }

  public nextMonth(): DateTime {
    const date = new Date(this.date);
    date.setMonth(date.getMonth() + 1);
    return new DateTime(date);
  }

  public prevMonth(): DateTime {
    const date = new Date(this.date);
    date.setMonth(date.getMonth() - 1);
    return new DateTime(date);
  }

  public nextDay(): DateTime {
    const date = new Date(this.date);
    date.setDate(date.getDate() + 1);
    return new DateTime(date);
  }

  public prevDay(): DateTime {
    const date = new Date(this.date);
    date.setDate(date.getDate() - 1);
    return new DateTime(date);
  }

  public isWeekday(): boolean {
    return this.date.getDay() >= 1 && this.date.getDay() <= 5;
  }

  public format(format: string): string {
    return dateFormat(this.date, format);
  }

  public local(): DateTime {
    return new DateTime(new Date(this.date.getTime() - this.date.getTimezoneOffset() * 60 * 1000));
  }

  public universal(): DateTime {
    return new DateTime(new Date(this.date.getTime() + this.date.getTimezoneOffset() * 60 * 1000));
  }

  public setTime(time: Date): DateTime {
    const date = new Date(this.date);
    date.setHours(time.getHours());
    date.setMinutes(time.getMinutes());
    date.setSeconds(time.getSeconds());
    return new DateTime(date);
  }

  public toDate(): Date {
    return new Date(this.date);
  }

}
