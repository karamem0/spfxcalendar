import { IWebPartContext } from "@microsoft/sp-webpart-base";
import { SPHttpClient } from '@microsoft/sp-http';

import { Event } from '../models/Event';
import { RecurrenceConverter } from "../utils/RecurrenceConverter";
import { RecurrenceParser } from "../utils/RecurrenceParser";
import { DateTime } from '../utils/DateTime';

export class CalendarService {

  constructor(private context: IWebPartContext) { }

  public async getEvents(listId: string, date: Date): Promise<Array<Event>> {
    const calendarBeginDate = new DateTime(date).beginOfMonth().beginOfWeek().prevDay().local().toDate();
    const calendarEndDate = new DateTime(date).endOfMonth().endOfWeek().nextDay().local().toDate();
    return new Promise<Array<Event>>((resolve: (value?: Array<Event>) => void) => resolve([]))
      .then(async (value: Array<Event>) => {
        const response = await this.context.spHttpClient
          .get(this.context.pageContext.web.serverRelativeUrl +
            `/_api/web/lists/getbyid(guid'${listId}')/items` +
            `?$filter=` +
            `EventDate ge datetime'${calendarBeginDate.toISOString()}' and  ` +
            `EventDate lt datetime'${calendarEndDate.toISOString()}' and ` +
            `fRecurrence eq 0` +
            `&$orderby=EventDate`, SPHttpClient.configurations.v1);
        const data = await response.json();
        if (data.error) {
          throw data.error;
        }
        data.value.forEach((item: any) => value.push(new Event(item)));
        return value;
      })
      .then(async (value: Array<Event>) => {
        const response = await this.context.spHttpClient
          .get(this.context.pageContext.web.serverRelativeUrl +
            `/_api/web/lists/getbyid(guid'${listId}')/items` +
            `?$select=*,RecurrenceData` +
            `&$filter=` +
            `EventDate lt datetime'${calendarEndDate.toISOString()}' and ` +
            `fRecurrence eq 1` +
            `&$orderby=EventDate`, SPHttpClient.configurations.v1);
        const data = await response.json();
        if (data.error) {
          throw data.error;
        }
        data.value.forEach((item: any) => {
          console.log(item);
          RecurrenceConverter
            .convert(RecurrenceParser.parse(item.RecurrenceData), date, new Date(Date.parse(item.EventDate)))
            .forEach((recurrenceDate: Date) => value.push(new Event(item, recurrenceDate)));
        });
        return value;
      })
      .then((value: Array<Event>) => {
        console.log(value);
        return value;
      });
  }

}
