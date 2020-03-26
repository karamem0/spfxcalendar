import { RecurrenceDaily } from './RecurrenceDaily';
import { RecurrenceMonthly } from './RecurrenceMonthly';
import { RecurrenceMonthlyByDay } from './RecurrenceMonthlyByDay';
import { RecurrenceWeekly } from './RecurrenceWeekly';
import { RecurrenceYearly } from './RecurrenceYearly';
import { RecurrenceYearlyByDay } from './RecurrenceYearlyByDay';

export class RecurrenceRepeat {

  constructor(private data: any) {
  }

  public get yearly(): RecurrenceYearly {
    if (this.data.hasOwnProperty('yearly')) {
      return new RecurrenceYearly(this.data.yearly);
    }
  }

  public get yearlyByDay(): RecurrenceYearlyByDay {
    if (this.data.hasOwnProperty('yearlyByDay')) {
      return new RecurrenceYearlyByDay(this.data.yearlyByDay);
    }
  }

  public get monthly(): RecurrenceMonthly {
    if (this.data.hasOwnProperty('monthly')) {
      return new RecurrenceMonthly(this.data.monthly);
    }
  }

  public get monthlyByDay(): RecurrenceMonthlyByDay {
    if (this.data.hasOwnProperty('monthlyByDay')) {
      return new RecurrenceMonthlyByDay(this.data.monthlyByDay);
    }
  }

  public get weekly(): RecurrenceWeekly {
    if (this.data.hasOwnProperty('weekly')) {
      return new RecurrenceWeekly(this.data.weekly);
    }
  }

  public get daily(): RecurrenceDaily {
    if (this.data.hasOwnProperty('daily')) {
      return new RecurrenceDaily(this.data.daily);
    }
  }

}
