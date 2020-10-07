import * as xml2js from 'xml2js';

import { DateTime } from './DateTime';
import { IRecurrenceData } from '../components/IRecurrenceData';

export class RecurrenceDataGenerator {

  public static generate(recurrence: boolean, recurrenceData: IRecurrenceData): string {
    if (!recurrence) {
      return null;
    }
    const builder = new xml2js.Builder({
      headless: true,
      renderOpts: { pretty: false },
      rootName: 'recurrence'
    });
    const repeat = (() => {
      if (recurrenceData.repeatOption == 'daily') {
        if (recurrenceData.dailyOption == 'frequency') {
          return {
            daily: {
              $: { dayFrequency: recurrenceData.dailyFrequency }
            }
          };
        }
        if (recurrenceData.dailyOption == 'weekday') {
          return {
            daily: {
              $: { weekday: 'TRUE' }
            }
          };
        }
      }
      if (recurrenceData.repeatOption == 'weekly') {
        const weeks = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];
        const element = {
          weekly: {
            $: { weekFrequency: recurrenceData.weeklyFrequency }
          }
        };
        for (let index = 0; index < weeks.length; index++) {
          if (recurrenceData.weeklyOptions[index]) {
            element.weekly.$[weeks[index]] = 'TRUE';
          }
        }
        return element;
      }
      if (recurrenceData.repeatOption == 'monthly') {
        if (recurrenceData.monthlyOption == 'monthly') {
          return {
            monthly: {
              $: {
                monthFrequency: recurrenceData.monthlyFrequency,
                day: recurrenceData.monthlyDay
              }
            }
          };
        }
        if (recurrenceData.monthlyOption == 'monthlybyday') {
          const element = {
            monthlyByDay: {
              $: {
                monthFrequency: recurrenceData.monthlyFrequency,
                weekdayOfMonth: recurrenceData.monthlyByDayNumber
              }
            }
          };
          element.monthlyByDay.$[recurrenceData.monthlyByDayDay] = 'TRUE';
          return element;
        }
      }
      if (recurrenceData.repeatOption == 'yearly') {
        if (recurrenceData.yearlyOption == 'yearly') {
          return {
            yearly: {
              $: {
                yearFrequency: recurrenceData.yearlyFrequency,
                month: recurrenceData.yearlyMonth + 1,
                day: recurrenceData.yearlyDay
              }
            }
          };
        }
        if (recurrenceData.yearlyOption == 'yearlybyday') {
          const element = {
            yearlyByDay: {
              $: {
                yearFrequency: recurrenceData.yearlyFrequency,
                weekdayOfMonth: recurrenceData.yearlyByDayNumber,
                month: recurrenceData.yearlyMonth + 1
              }
            }
          };
          element.yearlyByDay.$[recurrenceData.yearlyByDayDay] = 'TRUE';
          return element;
        }
      }
    })();
    const rule = (() => {
      if (recurrenceData.ruleOption == 'forever') {
        return {
          firstDayOfWeek: 'su',
          repeat: repeat,
          repeatForever: 'FALSE'
        };
      }
      if (recurrenceData.ruleOption == 'instance') {
        return {
          firstDayOfWeek: 'su',
          repeat: repeat,
          repeatInstances: recurrenceData.repeatInstance
        };
      }
      if (recurrenceData.ruleOption == 'windowend') {
        return {
          firstDayOfWeek: 'su',
          repeat: repeat,
          windowEnd: new DateTime(recurrenceData.windowEnd).format('isoUtcDateTime')
        };
      }
    })();
    return builder.buildObject({ rule: rule });
  }

}