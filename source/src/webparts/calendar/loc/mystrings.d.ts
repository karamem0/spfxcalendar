declare interface ICalendarWebPartStrings {
  ListNameLabel: string;
  AllDaysLabel: string;
  MonthNames: string[];
  DayNames: string[];
  CalendarFormat: string;
  DateTimeFormat: string;
}

declare module 'CalendarWebPartStrings' {
  const strings: ICalendarWebPartStrings;
  export = strings;
}
