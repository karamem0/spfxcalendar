declare interface ICalendarWebPartStrings {
  ListNameLabel: string;
  CalendarHeaderLabel: string;
  AllDaysLabel: string;
  CalendarFormat: string;
  DateTimeFormat: string;
}

declare module 'CalendarWebPartStrings' {
  const strings: ICalendarWebPartStrings;
  export = strings;
}
