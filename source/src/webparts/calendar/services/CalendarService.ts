import { WebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient } from '@microsoft/sp-http';
import { v4 as uuidv4 } from 'uuid';

import * as strings from 'CalendarWebPartStrings';

import { IEventItem } from '../components/IEventItem';
import { IPermission } from '../components/IPermission';
import { EventItem } from '../models/EventItem';
import {
  Permission,
  PermissionKind
} from '../models/Permission';
import { RecurrenceData } from '../models/RecurrenceData';
import { DateTime } from '../utils/DateTime';
import { RecurrenceItemGenerator } from '../utils/RecurrenceItemGenerator';
import { MultipleItemGenerator } from '../utils/MultipleItemGenerator';

export class CalendarService {

  constructor(
    public readonly context: WebPartContext,
    public readonly listId: string) { }

  public async getBasePermission(): Promise<IPermission> {
    if (!this.listId) {
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
    if (!this.listId) {
      throw new Error(strings.NoListSelectedError);
    }
    const calendarBeginDate = new DateTime(date).beginOfMonth().beginOfWeek().prevDay().local().toDate();
    const calendarEndDate = new DateTime(date).endOfMonth().endOfWeek().nextDay().local().toDate();
    return new Promise<Array<IEventItem>>((resolve: (value?: Array<IEventItem>) => void) => resolve(new Array<IEventItem>()))
      .then(async (items) => {
        const response = await this.context.spHttpClient.get(
          this.context.pageContext.web.serverRelativeUrl +
          `/_api/web/lists/getbyid(guid'${this.listId}')/items` +
          `?$select=*,EventType,RecurrenceData` +
          `&$filter=` +
          `EventDate lt datetime'${calendarEndDate.toISOString()}' and ` +
          `EndDate ge datetime'${calendarBeginDate.toISOString()}' and ` +
          `fRecurrence eq 0` +
          `&$orderby=EventDate`,
          SPHttpClient.configurations.v1);
        const data = await response.json();
        if (data.error) {
          throw data.error;
        }
        data.value.forEach((value: any) =>
          MultipleItemGenerator
            .generate(new EventItem(value))
            .forEach((item) => items.push(item)));
        return items;
      })
      .then(async (items) => {
        const response = await this.context.spHttpClient.get(
          this.context.pageContext.web.serverRelativeUrl +
          `/_api/web/lists/getbyid(guid'${this.listId}')/items` +
          `?$select=*,EventType,RecurrenceData` +
          `&$filter=` +
          `EventDate lt datetime'${calendarEndDate.toISOString()}' and ` +
          `EndDate ge datetime'${calendarBeginDate.toISOString()}' and ` +
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
    if (!this.listId) {
      throw new Error(strings.NoListSelectedError);
    }
    const response = await this.context.spHttpClient.get(
      this.context.pageContext.web.serverRelativeUrl +
      `/_api/web/lists/getbyid(guid'${this.listId}')/items(${id})` +
      `?$select=*,EventType,RecurrenceData`,
      SPHttpClient.configurations.v1);
    const data = await response.json();
    if (data.error) {
      throw data.error;
    }
    console.log(data);
    const item = new EventItem(data);
    const recurrenceData = RecurrenceData.parse(item.recurrenceData);
    const recurrenceText = (() => {
      if (recurrenceData.rule.repeat.yearly) {
        return strings.RecurrenceYearlyLabel;
      }
      if (recurrenceData.rule.repeat.yearlyByDay) {
        return strings.RecurrenceYearlyLabel;
      }
      if (recurrenceData.rule.repeat.monthly) {
        return strings.RecurrenceMonthlyLabel;
      }
      if (recurrenceData.rule.repeat.monthlyByDay) {
        return strings.RecurrenceMonthlyLabel;
      }
      if (recurrenceData.rule.repeat.weekly) {
        return strings.RecurrenceWeeklyLabel;
      }
      if (recurrenceData.rule.repeat.daily) {
        return strings.RecurrenceDailyLabel;
      }
    })();
    return {
      id: item.id,
      title: item.title,
      location: item.location,
      beginDate: item.beginDate,
      endDate: item.endDate,
      allDayEvent: item.allDayEvent,
      recurrence: item.recurrence,
      recurrenceText: recurrenceText
    };
  }

  public async createItem(item: EventItem): Promise<void> {
    if (!this.listId) {
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
          EventType: item.eventType,
          fAllDayEvent: item.allDayEvent,
          fRecurrence: item.recurrence,
          RecurrenceData: item.recurrenceData,
          UID: uuidv4()
        })
      });
    if (!response.ok) {
      const data = await response.json();
      if (data.error) {
        throw data.error;
      }
    }
  }

  public async updateItem(item: EventItem): Promise<void> {
    if (!this.listId) {
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
          EventType: item.eventType,
          fAllDayEvent: item.allDayEvent,
          fRecurrence: item.recurrence,
          RecurrenceData: item.recurrenceData
        })
      });
    if (!response.ok) {
      const data = await response.json();
      if (data.error) {
        throw data.error;
      }
    }
  }

  public async deleteItem(id: number): Promise<void> {
    if (!this.listId) {
      throw new Error(strings.NoListSelectedError);
    }
    const response = await this.context.spHttpClient.post(
      this.context.pageContext.web.serverRelativeUrl +
      `/_api/web/lists/getbyid(guid'${this.listId}')/items(${id})`,
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
