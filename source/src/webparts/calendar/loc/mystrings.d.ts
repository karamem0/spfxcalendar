declare interface ICalendarWebPartStrings {
  AllDayEventLabel: string;
  AddButton: string;
  AddItemLabel: string;
  CancelButton: string;
  DateFormat: string;
  DateTimeFormat: string;
  DateTimeLabel: string;
  DayFormat: string;
  DayNames: string[];
  DayShortNames: string[];
  DeleteButton: string;
  EditButton: string;
  EditItemLabel: string;
  GoToTodayLabel: string;
  HourNames: string[];
  ListNameLabel: string;
  LocationLabel: string;
  MinuteNames: string[];
  MonthNames: string[];
  MonthShortNames: string[];
  NoListSelectedError: string;
  NoTitleLabel: string;
  RecurrenceDailyLabel: string;
  RecurrenceLabel: string;
  RecurrenceMonthlyLabel: string;
  RecurrenceWeeklyLabel: string;
  RecurrenceYearlyLabel: string;
  SaveButton: string;
  TitleLabel: string;
  YearFormat: string;
  YearMonthFormat: string;
}

declare module 'CalendarWebPartStrings' {
  const strings: ICalendarWebPartStrings;
  export = strings;
}
