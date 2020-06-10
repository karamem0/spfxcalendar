export interface IEventItem {
  id: number;
  title: string;
  location: string;
  beginDate: Date;
  endDate: Date;
  allDayEvent: boolean;
  recurrence: string;
}
