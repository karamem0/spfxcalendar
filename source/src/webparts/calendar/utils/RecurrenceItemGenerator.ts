import * as strings from 'CalendarWebPartStrings';

import { DateTime } from './DateTime';
import { IEventItem } from '../components/IEventItem';
import { EventItem } from '../models/EventItem';
import { RecurrenceData } from '../models/RecurrenceData';

export class RecurrenceItemGenerator {

  public static generate(item: EventItem, date: Date): Array<IEventItem> {
    const result = new Array<IEventItem>();
    const recurrenceData = RecurrenceData.parse(item.recurrenceData);
    const calendarBeginDate = new DateTime(date).beginOfMonth().beginOfWeek().prevDay().toDate();
    const calendarEndDate = new DateTime(date).endOfMonth().endOfWeek().nextDay().toDate();
    if (recurrenceData.rule.repeat.yearly) {
      const repeatBeginDate = recurrenceData.rule.repeat.yearly.toDate(item.beginDate.getFullYear());
      const repeatEndDate = recurrenceData.rule.windowEnd < calendarEndDate
        ? recurrenceData.rule.windowEnd
        : calendarEndDate;
      DateTime.enumYears(repeatBeginDate, repeatEndDate, (yearIndex, yearDate) => {
        if (recurrenceData.rule.repeatInstances) {
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
            recurrence: item.recurrence,
            recurrenceText: strings.RecurrenceYearlyLabel
          });
        }
        return true;
      });
    }
    if (recurrenceData.rule.repeat.yearlyByDay) {
      const repeatBeginDate = recurrenceData.rule.repeat.yearlyByDay.toDate(item.beginDate.getFullYear(), recurrenceData.rule.repeat.yearlyByDay.month);
      const repeatEndDate = recurrenceData.rule.windowEnd < calendarEndDate
        ? recurrenceData.rule.windowEnd
        : calendarEndDate;
      DateTime.enumYears(repeatBeginDate, repeatEndDate, (yearIndex, yearDate) => {
        if (recurrenceData.rule.repeatInstances) {
          if (result.length >= recurrenceData.rule.repeatInstances) {
            return false;
          }
        }
        yearDate = recurrenceData.rule.repeat.yearlyByDay.toDate(yearDate.getFullYear(), yearDate.getMonth());
        result.push({
          id: item.id,
          title: item.title,
          location: item.location,
          beginDate: new DateTime(yearDate).setTime(item.beginDate).toDate(),
          endDate: new DateTime(yearDate).setTime(item.endDate).toDate(),
          allDayEvent: item.allDayEvent,
          recurrence: item.recurrence,
          recurrenceText: strings.RecurrenceYearlyLabel
        });
        return true;
      });
    }
    if (recurrenceData.rule.repeat.monthly) {
      const repeatBeginDate = recurrenceData.rule.repeat.monthly.toDate(item.beginDate.getFullYear(), item.beginDate.getMonth());
      const repeatEndDate = recurrenceData.rule.windowEnd < calendarEndDate
        ? recurrenceData.rule.windowEnd
        : calendarEndDate;
      DateTime.enumMonths(repeatBeginDate, repeatEndDate, (monthIndex, monthDate) => {
        if (recurrenceData.rule.repeatInstances) {
          if (result.length >= recurrenceData.rule.repeatInstances) {
            return false;
          }
        }
        if (monthDate < item.beginDate) {
          return true;
        }
        if (monthIndex % recurrenceData.rule.repeat.monthly.frequency == 0) {
          result.push({
            id: item.id,
            title: item.title,
            location: item.location,
            beginDate: new DateTime(monthDate).setTime(item.beginDate).toDate(),
            endDate: new DateTime(monthDate).setTime(item.endDate).toDate(),
            allDayEvent: item.allDayEvent,
            recurrence: item.recurrence,
            recurrenceText: strings.RecurrenceMonthlyLabel
          });
        }
        return true;
      });
    }
    if (recurrenceData.rule.repeat.monthlyByDay) {
      const repeatBeginDate = recurrenceData.rule.repeat.monthlyByDay.toDate(item.beginDate.getFullYear(), item.beginDate.getMonth());
      const repeatEndDate = recurrenceData.rule.windowEnd < calendarEndDate
        ? recurrenceData.rule.windowEnd
        : calendarEndDate;
      DateTime.enumMonths(repeatBeginDate, repeatEndDate, (monthIndex, monthDate) => {
        if (recurrenceData.rule.repeatInstances) {
          if (result.length >= recurrenceData.rule.repeatInstances) {
            return false;
          }
        }
        monthDate = recurrenceData.rule.repeat.monthlyByDay.toDate(monthDate.getFullYear(), monthDate.getMonth());
        if (monthDate < item.beginDate) {
          return true;
        }
        if (monthIndex % recurrenceData.rule.repeat.monthlyByDay.frequency == 0) {
          result.push({
            id: item.id,
            title: item.title,
            location: item.location,
            beginDate: new DateTime(monthDate).setTime(item.beginDate).toDate(),
            endDate: new DateTime(monthDate).setTime(item.endDate).toDate(),
            allDayEvent: item.allDayEvent,
            recurrence: item.recurrence,
            recurrenceText: strings.RecurrenceMonthlyLabel
          });
        }
        return true;
      });
    }
    if (recurrenceData.rule.repeat.weekly) {
      const repeatBeginDate = item.beginDate;
      const repeatEndDate = recurrenceData.rule.windowEnd < calendarEndDate
        ? recurrenceData.rule.windowEnd
        : calendarEndDate;
      DateTime.enumWeeks(repeatBeginDate, repeatEndDate, (weekIndex, weekDate) => {
        if (recurrenceData.rule.repeatInstances) {
          if (result.length >= recurrenceData.rule.repeatInstances) {
            return false;
          }
        }
        if (weekIndex % recurrenceData.rule.repeat.weekly.frequency == 0) {
          let weekBeginDate = new DateTime(weekDate).beginOfWeek().toDate();
          if (weekBeginDate < repeatBeginDate) {
            weekBeginDate = repeatBeginDate;
          }
          const weekEndDate = new DateTime(weekDate).endOfWeek().toDate();
          DateTime.enumDates(weekBeginDate, weekEndDate, (dateIndex, dateDate) => {
            if (recurrenceData.rule.repeatInstances) {
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
                recurrence: item.recurrence,
                recurrenceText: strings.RecurrenceWeeklyLabel
              });
            }
            return true;
          });
        }
        return true;
      });
    }
    if (recurrenceData.rule.repeat.daily) {
      const repeatBeginDate = item.beginDate;
      const repeatEndDate = recurrenceData.rule.windowEnd < calendarEndDate
        ? recurrenceData.rule.windowEnd
        : calendarEndDate;
      DateTime.enumDates(repeatBeginDate, repeatEndDate, (dateIndex, dateDate) => {
        if (recurrenceData.rule.repeatInstances) {
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
              recurrence: item.recurrence,
              recurrenceText: strings.RecurrenceDailyLabel
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
              recurrence: item.recurrence,
              recurrenceText: strings.RecurrenceDailyLabel
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
