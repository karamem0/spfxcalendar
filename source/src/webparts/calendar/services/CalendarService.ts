import { IWebPartContext } from "@microsoft/sp-webpart-base";
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

import * as strings from 'CalendarWebPartStrings';

import { ICalendarState } from '../models/ICalendar';
import { ICalendarHeadProps } from '../models/ICalendarHead';
import { ICalendarWeekProps } from '../models/ICalendarWeek';
import { IEvent } from '../models/IEvent';
import { DateUtil } from '../utils/DateUtil';

export class CalendarService {

  constructor(private context: IWebPartContext) { }

  public createHeadPropsArray(): Array<ICalendarHeadProps> {
    return strings.CalendarHeaderLabel.split(',').map(value => {
      return { name: value };
    });
  }

  public createWeekPropsArray(state: ICalendarState): Array<ICalendarWeekProps> {
    const beginDate = DateUtil.beginOfWeek(DateUtil.beginOfMonth(state.date));
    const endDate = DateUtil.endOfWeek(DateUtil.endOfMonth(state.date));
    const array: Array<ICalendarWeekProps> = [];
    for (let date = new Date(beginDate.getTime()); date < endDate; date.setDate(date.getDate() + 7)) {
      array.push({
        beginDate: new Date(date.getTime()),
        endDate: DateUtil.endOfWeek(date),
        events: state.events.filter((event) =>
          event.beginDate >= date &&
          event.beginDate < DateUtil.nextDay(DateUtil.endOfWeek(date)))
      });
    }
    return array;
  }

  public getEvents(listId: string, date: Date): Promise<Array<IEvent>> {
    return this.context.spHttpClient
      .get(
        this.context.pageContext.web.serverRelativeUrl +
        `/_api/web/lists/getbyid(guid'${listId}')/items` +
        `?$filter=` +
        `EventDate ge datetime'${DateUtil.beginOfWeek(DateUtil.beginOfMonth(date)).toISOString()}' and  ` +
        `EventDate lt datetime'${DateUtil.nextDay(DateUtil.endOfWeek(DateUtil.endOfMonth(date))).toISOString()}'` +
        `&$orderby=EventDate`,
        SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      })
      .then((data: any) => {
        if (data.error) {
          throw data.error;
        }
        return data.value.map((item: any) => {
          return {
            id: item.Id,
            title: item.Title,
            beginDate: new Date(Date.parse(item.EventDate)),
            endDate: new Date(Date.parse(item.EndDate)),
            allDayEvent: item.fAllDayEvent
          };
        });
      });
  }

}
