import { WebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient } from '@microsoft/sp-http';

import * as strings from 'CalendarWebPartStrings';

import { Permission } from '../models/Permission';
import { EventItem } from '../models/EventItem';
import { DateTime } from '../utils/DateTime';
import { RecurrenceItemGenerator } from '../utils/RecurrenceItemGenerator';
import { MultipleItemGererator } from '../utils/MultipleItemGenerator';

export class CalendarService {

  constructor(
    public readonly context: WebPartContext,
    public readonly listId: string) { }

  public async getBasePermission(): Promise<Permission> {
    if (this.listId == null) {
      throw new Error(strings.NoListSelectedError);
    }
    const response = await this.context.spHttpClient
      .get(
        this.context.pageContext.web.serverRelativeUrl +
        `/_api/web/lists/getbyid(guid'${this.listId}')/getusereffectivepermissions(@v)` +
        `?@v='${encodeURIComponent(`i:0#.f|membership|${this.context.pageContext.user.loginName}`)}'`,
        SPHttpClient.configurations.v1);
    const data = await response.json();
    if (data.error) {
      throw data.error;
    }
    return new Permission(data);
  }

  public async getItems(date: Date): Promise<Array<EventItem>> {
    if (this.listId == null) {
      throw new Error(strings.NoListSelectedError);
    }
    const calendarBeginDate = new DateTime(date).beginOfMonth().beginOfWeek().prevDay().local().toDate();
    const calendarEndDate = new DateTime(date).endOfMonth().endOfWeek().nextDay().local().toDate();
    return new Promise<Array<EventItem>>((resolve: (value?: Array<EventItem>) => void) => resolve([]))
      .then(async (items: Array<EventItem>) => {
        const response = await this.context.spHttpClient.get(
          this.context.pageContext.web.serverRelativeUrl +
          `/_api/web/lists/getbyid(guid'${this.listId}')/items` +
          `?$filter=` +
          `EventDate ge datetime'${calendarBeginDate.toISOString()}' and  ` +
          `EventDate lt datetime'${calendarEndDate.toISOString()}' and ` +
          `fRecurrence eq 0` +
          `&$orderby=EventDate`,
          SPHttpClient.configurations.v1);
        const data = await response.json();
        if (data.error) {
          throw data.error;
        }
        data.value.forEach((value: any) =>
          MultipleItemGererator
            .generate(value)
            .forEach((item) => items.push(item)));
        return items;
      })
      .then(async (items: Array<EventItem>) => {
        const response = await this.context.spHttpClient.get(
          this.context.pageContext.web.serverRelativeUrl +
          `/_api/web/lists/getbyid(guid'${this.listId}')/items` +
          `?$select=*,RecurrenceData` +
          `&$filter=` +
          `EventDate lt datetime'${calendarEndDate.toISOString()}' and ` +
          `fRecurrence eq 1` +
          `&$orderby=EventDate`,
          SPHttpClient.configurations.v1);
        const data = await response.json();
        if (data.error) {
          throw data.error;
        }
        data.value.forEach((value: any) =>
          RecurrenceItemGenerator
            .generate(value, date)
            .forEach((item) => items.push(item)));
        return items;
      });
  }

  public async createItem(item: EventItem): Promise<void> {
    if (this.listId == null) {
      throw new Error(strings.NoListSelectedError);
    }
    const response = await this.context.spHttpClient.post(
      this.context.pageContext.web.serverRelativeUrl +
      `/_api/web/lists/getbyid(guid'${this.listId}')/items`,
      SPHttpClient.configurations.v1,
      {
        body: JSON.stringify({
          Title: item.title,
          Location: item.location,
          EventDate: item.beginDate,
          EndDate: item.endDate,
          fAllDayEvent: item.allDayEvent
        })
      });
    if (!response.ok) {
      const data = await response.json();
      if (data.error) {
        throw data.error;
      }
    }
  }

  public async deleteItem(item: EventItem): Promise<void> {
    if (this.listId == null) {
      throw new Error(strings.NoListSelectedError);
    }
    const response = await this.context.spHttpClient.post(
      this.context.pageContext.web.serverRelativeUrl +
      `/_api/web/lists/getbyid(guid'${this.listId}')/items(${item.id})`,
      SPHttpClient.configurations.v1,
      {
        headers: {
          "X-HTTP-Method": "DELETE",
          "If-Match": "*"
        }
      });
    if (!response.ok) {
      const data = await response.json();
      if (data.error) {
        throw data.error;
      }
    }
  }

}
