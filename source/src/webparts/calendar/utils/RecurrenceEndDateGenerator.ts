import { DateTime } from './DateTime';
import { IRecurrenceData } from '../components/IRecurrenceData';
import { RecurrenceDataByDay } from '../models/RecurrenceData';

export class RecurrenceEndDateGenerator {

  public static generate(beginDate: Date, endDate: Date, recurrence: boolean, recurrenceData: IRecurrenceData): Date {
    if (!recurrence) {
      return endDate;
    }
    if (recurrenceData.repeatOption == 'daily') {
      if (recurrenceData.ruleOption == 'windowend') {
        if (recurrenceData.dailyOption == 'frequency') {
          const diff = DateTime.diffDates(beginDate, recurrenceData.windowEnd);
          const days = Math.floor(diff / recurrenceData.dailyFrequency) * recurrenceData.dailyFrequency;
          const date = new Date(beginDate);
          date.setDate(date.getDate() + days);
          return new DateTime(date).setTime(date).toDate();
        }
        if (recurrenceData.dailyOption == 'weekday') {
          if (DateTime.isWeekday(recurrenceData.windowEnd)) {
            return recurrenceData.windowEnd;
          } else {
            const date = new Date(recurrenceData.windowEnd);
            if (date.getDay() == 0) {
              date.setDate(date.getDate() - 2);
            }
            if (date.getDay() == 6) {
              date.setDate(date.getDate() - 1);
            }
            return date;
          }
        }
      } else {
        const date = new Date(beginDate);
        let num1 = (() => {
          if (recurrenceData.ruleOption == 'forever') {
            return 999;
          }
          if (recurrenceData.ruleOption == 'instance') {
            return recurrenceData.repeatInstance;
          }
        })();
        let num2 = 0;
        if (recurrenceData.dailyOption == 'frequency') {
          num2 = recurrenceData.dailyFrequency * (num1 - 1);
        }
        if (recurrenceData.dailyOption == 'weekday') {
          if (date.getDay() == 0) {
            date.setDate(date.getDate() + 1);
          }
          if (date.getDay() == 6) {
            date.setDate(date.getDate() + 2);
          }
          if (num1 <= 6 - date.getDay()) {
            num2 = num1;
            num1 = 0;
          } else {
            num2 += 6 - date.getDay();
            num1 -= 6 - date.getDay();
            num2 += 7 * Math.floor(num1 / 5);
            num1 -= 5 * Math.floor(num1 / 5);
            if (num1 > 0) {
              num2 += 2 + num1;
            }
          }
        }
        date.setDate(date.getDate() + num2 - 1);
        return new DateTime(date).setTime(endDate).toDate();
      }
    }
    if (recurrenceData.repeatOption == 'weekly') {
      if (recurrenceData.ruleOption == 'windowend') {
        const date1 = new Date(beginDate);
        let date2 = new Date(date1);
        for (let index = date1.getDay(); index < 7; index++) {
          if (recurrenceData.weeklyOptions[index]) {
            if (date1 >= recurrenceData.windowEnd) {
              return new DateTime(date2).setTime(endDate).toDate();
            }
            date2 = new Date(date1);
          }
          date1.setDate(date1.getDate() + 1);
        }
        date1.setDate(date1.getDate() + 7 * (recurrenceData.weeklyFrequency - 1));
        while (true) {
          for (let index = 0; index < 7; index++) {
            if (recurrenceData.weeklyOptions[index]) {
              if (date1 >= recurrenceData.windowEnd) {
                return new DateTime(date2).setTime(endDate).toDate();
              }
              date2 = new Date(date1);
            }
            date1.setDate(date1.getDate() + 1);
          }
          date1.setDate(date1.getDate() + 7 * recurrenceData.weeklyFrequency);
        }
      } else {
        const options = recurrenceData.weeklyOptions.filter((value) => value).length;
        const date = new Date(beginDate);
        let num1 = (() => {
          if (recurrenceData.ruleOption == 'forever') {
            return 999;
          }
          if (recurrenceData.ruleOption == 'instance') {
            return recurrenceData.repeatInstance;
          }
        })();
        let num2 = 0;
        for (let index = date.getDay(); index < 7; index++) {
          num2++;
          if (recurrenceData.weeklyOptions[index]) {
            num1--;
          }
          if (num1 == 0) {
            break;
          }
        }
        if (num1 > 0) {
          num2 = 7 - date.getDay() + 7 * (recurrenceData.weeklyFrequency - 1);
          num2 += 7 * recurrenceData.weeklyFrequency * Math.floor(num1 / options);
          num1 -= options * Math.floor(num1 / options);
          for (let index = 0; index < 7; index++) {
            num2++;
            if (recurrenceData.weeklyOptions[index]) {
              num1--;
            }
            if (num1 == 0) {
              break;
            }
          }
        }
        date.setDate(date.getDate() + num2 - 1);
        return new DateTime(date).setTime(endDate).toDate();
      }
    }
    if (recurrenceData.repeatOption == 'monthly') {
      const byday = new RecurrenceDataByDay({
        number: recurrenceData.monthlyByDayNumber,
        day: recurrenceData.monthlyByDayDay
      });
      if (recurrenceData.ruleOption == 'windowend') {
        if (recurrenceData.monthlyOption == 'monthly') {
          let date1 = new Date(beginDate);
          let date2 = DateTime.getDate(date1.getFullYear(), date1.getMonth(), recurrenceData.monthlyDay);
          if (date1 <= date2) {
            date1 = new Date(date2);
          }
          while (true) {
            date2.setMonth(date2.getMonth() + recurrenceData.monthlyFrequency);
            date2 = DateTime.getDate(date2.getFullYear(), date2.getMonth(), recurrenceData.monthlyDay);
            if (date2 > recurrenceData.windowEnd) {
              return new DateTime(date1).setTime(endDate).toDate();
            }
            date1 = new Date(date2);
          }
        }
        if (recurrenceData.monthlyOption == 'monthlybyday') {
          let date1 = new Date(beginDate);
          let date2 = byday.toDate(date1.getFullYear(), date1.getMonth());
          if (date1 <= date2) {
            date1 = new Date(date2);
          }
          while (true) {
            date2.setMonth(date2.getMonth() + recurrenceData.monthlyFrequency);
            date2 = byday.toDate(date2.getFullYear(), date2.getMonth());
            if (date2 > recurrenceData.windowEnd) {
              return new DateTime(date1).setTime(endDate).toDate();
            }
            date1 = new Date(date2);
          }
        }
      } else {
        let date1 = new Date(beginDate);
        let num = (() => {
          if (recurrenceData.ruleOption == 'forever') {
            return 999;
          }
          if (recurrenceData.ruleOption == 'instance') {
            return recurrenceData.repeatInstance;
          }
        })();
        if (recurrenceData.monthlyOption == 'monthly') {
          const date2 = DateTime.getDate(date1.getFullYear(), date1.getMonth(), recurrenceData.monthlyDay);
          if (date1 <= date2) {
            num--;
          }
          date1.setMonth(date1.getMonth() + num * recurrenceData.monthlyFrequency);
          date1 = DateTime.getDate(date1.getFullYear(), date1.getMonth(), recurrenceData.monthlyDay);
        }
        if (recurrenceData.monthlyOption == 'monthlybyday') {
          const date2 = byday.toDate(date1.getFullYear(), date1.getMonth());
          if (date1 <= date2) {
            num--;
          }
          date1.setMonth(date1.getMonth() + num * recurrenceData.monthlyFrequency);
          date1 = byday.toDate(date1.getFullYear(), date1.getMonth());
        }
        return new DateTime(date1).setTime(endDate).toDate();
      }
    }
    if (recurrenceData.repeatOption == 'yearly') {
      const byday = new RecurrenceDataByDay({
        month: recurrenceData.yearlyMonth,
        number: recurrenceData.yearlyByDayNumber,
        day: recurrenceData.yearlyByDayDay
      });
      if (recurrenceData.ruleOption == 'windowend') {
        if (recurrenceData.yearlyOption == 'yearly') {
          let date1 = new Date(beginDate);
          let date2 = DateTime.getDate(date1.getFullYear(), date1.getMonth(), recurrenceData.yearlyDay);
          if (date1 <= date2) {
            date1 = new Date(date2);
          }
          while (true) {
            date2.setFullYear(date2.getFullYear() + recurrenceData.yearlyFrequency);
            date2 = DateTime.getDate(date2.getFullYear(), date2.getMonth(), recurrenceData.yearlyDay);
            if (date2 > recurrenceData.windowEnd) {
              return new DateTime(date1).setTime(endDate).toDate();
            }
            date1 = new Date(date2);
          }
        }
        if (recurrenceData.yearlyOption == 'yearlybyday') {
          let date1 = new Date(beginDate);
          let date2 = byday.toDate(date1.getFullYear(), date1.getMonth());
          if (date1 <= date2) {
            date1 = new Date(date2);
          }
          while (true) {
            date2.setFullYear(date2.getFullYear() + recurrenceData.yearlyFrequency);
            date2 = byday.toDate(date2.getFullYear(), date2.getMonth());
            if (date2 > recurrenceData.windowEnd) {
              return new DateTime(date1).setTime(endDate).toDate();
            }
            date1 = new Date(date2);
          }
        }
      } else {
        let date1 = new Date(beginDate);
        let num = (() => {
          if (recurrenceData.ruleOption == 'forever') {
            return 150;
          }
          if (recurrenceData.ruleOption == 'instance') {
            return recurrenceData.repeatInstance;
          }
        })();
        if (recurrenceData.yearlyOption == 'yearly') {
          const date2 = DateTime.getDate(date1.getFullYear(), recurrenceData.yearlyMonth, recurrenceData.yearlyDay);
          if (date1 <= date2) {
            num--;
          }
          date1.setFullYear(date1.getFullYear() + num * recurrenceData.yearlyFrequency);
          date1 = DateTime.getDate(date1.getFullYear(), recurrenceData.yearlyMonth, recurrenceData.yearlyDay);
        }
        if (recurrenceData.yearlyOption == 'yearlybyday') {
          const date2 = byday.toDate(date1.getFullYear(), recurrenceData.yearlyMonth);
          if (date1 <= date2) {
            num--;
          }
          date1.setFullYear(date1.getFullYear() + num * recurrenceData.yearlyFrequency);
          date1 = byday.toDate(date1.getFullYear(), recurrenceData.yearlyMonth);
        }
        return new DateTime(date1).setTime(endDate).toDate();
      }
    }
  }

}