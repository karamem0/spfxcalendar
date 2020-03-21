declare interface ICalendarWebPartStrings {
  ListTitleFieldLabel: string;
  CalendarHeaderLabel: string;
  AllDaysFieldLabel: string;
  CalendarFormat: string;
  DateTimeFormat: string;
}

declare module 'CalendarWebPartStrings' {
  const strings: ICalendarWebPartStrings;
  export = strings;
}
