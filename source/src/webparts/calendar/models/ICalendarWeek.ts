import { IEvent } from './IEvent';

export interface ICalendarWeekProps {
  beginDate: Date;
  endDate: Date;
  events: Array<IEvent>;
}

export interface ICalendarWeekState { }
