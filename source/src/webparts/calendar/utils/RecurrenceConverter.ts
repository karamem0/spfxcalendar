import { Recurrence } from '../models/Recurrence';
import { DateTime } from './DateTime';

export class RecurrenceConverter {

  public static convert(recurrence: Recurrence, calendarDate: Date, eventDate: Date): Array<Date> {
    const calendarBeginDate = new DateTime(calendarDate).beginOfMonth().beginOfWeek().prevDay().toDate();
    const calendarEndDate = new DateTime(calendarDate).endOfMonth().endOfWeek().nextDay().toDate();
    const repeatDates: Array<Date> = [];
    if (recurrence.rule.repeat.yearly != undefined) {
      const repeatBeginDate = recurrence.rule.repeat.yearly.toDate(eventDate.getFullYear());
      const repeatEndDate = recurrence.rule.windowEnd < calendarEndDate
        ? recurrence.rule.windowEnd
        : calendarEndDate;
      DateTime.enumYears(repeatBeginDate, repeatEndDate, (yearIndex, yearDate) => {
        if (recurrence.rule.repeatInstances != undefined) {
          if (repeatDates.length >= recurrence.rule.repeatInstances) {
            return false;
          }
        }
        if (yearIndex % recurrence.rule.repeat.yearly.frequency == 0) {
          repeatDates.push(yearDate);
        }
        return true;
      });
    }
    if (recurrence.rule.repeat.yearlyByDay != undefined) {
      const repeatBeginDate = recurrence.rule.repeat.yearlyByDay.toDate(eventDate.getFullYear(), recurrence.rule.repeat.yearlyByDay.month);
      const repeatEndDate = recurrence.rule.windowEnd < calendarEndDate
        ? recurrence.rule.windowEnd
        : calendarEndDate;
      DateTime.enumYears(repeatBeginDate, repeatEndDate, (yearIndex, yearDate) => {
        if (recurrence.rule.repeatInstances != undefined) {
          if (repeatDates.length >= recurrence.rule.repeatInstances) {
            return false;
          }
        }
        repeatDates.push(yearDate);
        return true;
      });
    }
    if (recurrence.rule.repeat.monthly != undefined) {
      const repeatBeginDate = recurrence.rule.repeat.monthly.toDate(eventDate.getFullYear(), eventDate.getMonth());
      const repeatEndDate = recurrence.rule.windowEnd < calendarEndDate
        ? recurrence.rule.windowEnd
        : calendarEndDate;
      DateTime.enumMonths(repeatBeginDate, repeatEndDate, (monthIndex, monthDate) => {
        if (recurrence.rule.repeatInstances != undefined) {
          if (repeatDates.length >= recurrence.rule.repeatInstances) {
            return false;
          }
        }
        if (monthIndex % recurrence.rule.repeat.monthly.frequency == 0) {
          repeatDates.push(monthDate);
        }
        return true;
      });
    }
    if (recurrence.rule.repeat.monthlyByDay != undefined) {
      const repeatBeginDate = recurrence.rule.repeat.monthlyByDay.toDate(eventDate.getFullYear(), eventDate.getMonth());
      const repeatEndDate = recurrence.rule.windowEnd < calendarEndDate
        ? recurrence.rule.windowEnd
        : calendarEndDate;
      DateTime.enumMonths(repeatBeginDate, repeatEndDate, (monthIndex, monthDate) => {
        if (recurrence.rule.repeatInstances != undefined) {
          if (repeatDates.length >= recurrence.rule.repeatInstances) {
            return false;
          }
        }
        if (monthIndex % recurrence.rule.repeat.monthlyByDay.frequency == 0) {
          repeatDates.push(monthDate);
        }
        return true;
      });
    }
    if (recurrence.rule.repeat.weekly != undefined) {
      const repeatBeginDate = eventDate;
      const repeatEndDate = recurrence.rule.windowEnd < calendarEndDate
        ? recurrence.rule.windowEnd
        : calendarEndDate;
      DateTime.enumWeeks(repeatBeginDate, repeatEndDate, (weekIndex, weekDate) => {
        if (recurrence.rule.repeatInstances != undefined) {
          if (repeatDates.length >= recurrence.rule.repeatInstances) {
            return false;
          }
        }
        if (weekIndex % recurrence.rule.repeat.weekly.frequency == 0) {
          const weekBeginDate = new DateTime(weekDate).beginOfWeek().toDate();
          const weekEndDate = new DateTime(weekDate).endOfWeek().toDate();
          DateTime.enumDates(weekBeginDate, weekEndDate, (dateIndex, dateDate) => {
            if (recurrence.rule.repeatInstances != undefined) {
              if (repeatDates.length >= recurrence.rule.repeatInstances) {
                return false;
              }
            }
            if (recurrence.rule.repeat.weekly.days[dateDate.getDay()]) {
              repeatDates.push(dateDate);
            }
            return true;
          });
        }
        return true;
      });
    }
    if (recurrence.rule.repeat.daily != undefined) {
      const repeatBeginDate = eventDate;
      const repeatEndDate = recurrence.rule.windowEnd < calendarEndDate
        ? recurrence.rule.windowEnd
        : calendarEndDate;
      DateTime.enumDates(repeatBeginDate, repeatEndDate, (dateIndex, dateDate) => {
        if (recurrence.rule.repeatInstances != undefined) {
          if (repeatDates.length >= recurrence.rule.repeatInstances) {
            return false;
          }
        }
        if (recurrence.rule.repeat.daily.weekday) {
          if (new DateTime(dateDate).isWeekday()) {
            repeatDates.push(dateDate);
          }
        }
        else {
          if (dateIndex % recurrence.rule.repeat.daily.frequency == 0) {
            repeatDates.push(dateDate);
          }
        }
        return true;
      });
    }
    return repeatDates.filter((date) => {
      return date >= calendarBeginDate && date <= calendarEndDate;
    });
  }
  
}
