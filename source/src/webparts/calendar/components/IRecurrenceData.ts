export interface IRecurrenceData {
  repeatOption?: string;
  dailyOption?: string;
  dailyFrequency?: number;
  weeklyFrequency?: number;
  weeklyOptions?: Array<boolean>;
  monthlyOption?: string;
  monthlyFrequency?: number;
  monthlyDay?: number;
  monthlyByDayNumber?: string;
  monthlyByDayDay?: string;
  yearlyOption?: string;
  yearlyFrequency?: number;
  yearlyMonth?: number;
  yearlyDay?: number;
  yearlyByDayNumber?: string;
  yearlyByDayDay?: string;
  ruleOption?: string;
  repeatInstance?: number;
  windowEnd?: Date;
}
