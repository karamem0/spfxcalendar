import { WebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient } from '@microsoft/sp-http';

import * as strings from 'CalendarWebPartStrings';

import { IEventItem } from '../components/IEventItem';
import { IPermission } from '../components/IPermission';
import { EventItem } from '../models/EventItem';
import {
  Permission,
  PermissionKind
} from '../models/Permission';
import { DateTime } from '../utils/DateTime';
import { RecurrenceItemGenerator } from '../utils/RecurrenceItemGenerator';
import { MultipleItemGererator } from '../utils/MultipleItemGenerator';

export class CalendarService {

  constructor(
    public readonly context: WebPartContext,
    public readonly listId: string) { }

  public async getBasePermission(): Promise<IPermission> {
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
    const permission = new Permission(data);
    return {
      canAdd: permission.has(PermissionKind.AddListItems),
      canEdit: permission.has(PermissionKind.EditListItems),
      canDelete: permission.has(PermissionKind.DeleteListItems)
    };
  }

  public async getItems(date: Date): Promise<Array<IEventItem>> {
    if (this.listId == null) {
      throw new Error(strings.NoListSelectedError);
    }
    const calendarBeginDate = new DateTime(date).beginOfMonth().beginOfWeek().prevDay().local().toDate();
    const calendarEndDate = new DateTime(date).endOfMonth().endOfWeek().nextDay().local().toDate();
    return new Promise<Array<IEventItem>>((resolve: (value?: Array<IEventItem>) => void) => resolve(new Array<IEventItem>()))
      .then(async (items) => {
        const response = await this.context.spHttpClient.get(
          this.context.pageContext.web.serverRelativeUrl +
          `/_api/web/lists/getbyid(guid'${this.listId}')/items` +
          `?$filter=` +
          `EventDate lt datetime'${calendarEndDate.toISOString()}' and ` +
          `EndDate ge datetime'${calendarBeginDate.toISOString()}' and ` +
          `fRecurrence eq 0` +
          `&$orderby=EventDate`,
          SPHttpClient.configurations.v1);
        const data = await response.json();
        if (data.error) {
          throw data.error;
        }
        console.log(data);
        data.value.forEach((value: any) =>
          MultipleItemGererator
            .generate(new EventItem(value))
            .forEach((item) => items.push(item)));
        return items;
      })
      .then(async (items) => {
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
            .generate(new EventItem(value), date)
            .forEach((item) => items.push(item)));
        return items;
      });
  }

  public async getItem(id: number): Promise<IEventItem> {
    if (this.listId == null) {
      throw new Error(strings.NoListSelectedError);
    }
    const response = await this.context.spHttpClient.get(
      this.context.pageContext.web.serverRelativeUrl +
      `/_api/web/lists/getbyid(guid'${this.listId}')/items(${id})`,
      SPHttpClient.configurations.v1);
    const data = await response.json();
    if (data.error) {
      throw data.error;
    }
    const item = new EventItem(data);
    return {
      id: item.id,
      title: item.title,
      location: item.location,
      beginDate: item.beginDate,
      endDate: item.endDate,
      allDayEvent: item.allDayEvent,
      recurrence: null
    };
  }

  public async createItem(item: IEventItem): Promise<void> {
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

  public async updateItem(item: IEventItem): Promise<void> {
    if (this.listId == null) {
      throw new Error(strings.NoListSelectedError);
    }
    const response = await this.context.spHttpClient.post(
      this.context.pageContext.web.serverRelativeUrl +
      `/_api/web/lists/getbyid(guid'${this.listId}')/items(${item.id})`,
      SPHttpClient.configurations.v1,
      {
        headers: {
          "X-HTTP-Method": "MERGE",
          "If-Match": "*"
        },
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

  public async deleteItem(item: IEventItem): Promise<void> {
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
