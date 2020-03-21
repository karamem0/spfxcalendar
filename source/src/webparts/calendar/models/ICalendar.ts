import { IWebPartContext } from "@microsoft/sp-webpart-base";

import { IEvent } from '../models/IEvent';

export interface ICalendarProps {
  context: IWebPartContext;
  listTitle: string;
}

export interface ICalendarState {
  date: Date;
  events: Array<IEvent>;
  error: string;
}
