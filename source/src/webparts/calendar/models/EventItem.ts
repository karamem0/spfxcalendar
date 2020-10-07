import { DateTime } from '../utils/DateTime';

export class EventItem {

  public id: number;
  public title: string;
  public location: string;
  public beginDate: Date;
  public endDate: Date;
  public eventType: number;
  public allDayEvent: boolean;
  public recurrence: boolean;
  public recurrenceData: string;

  constructor(data?: any) {
    if (!data) {
      return;
    }
    this.id = data.Id;
    this.title = data.Title;
    this.location = data.Location;
    this.beginDate = data.fAllDayEvent
      ? new DateTime(data.EventDate).universal().toDate()
      : new Date(Date.parse(data.EventDate));
    this.endDate = data.fAllDayEvent
      ? new DateTime(data.EndDate).universal().toDate()
      : new Date(Date.parse(data.EndDate));
    this.eventType = data.EventType;
    this.allDayEvent = data.fAllDayEvent;
    this.recurrence = data.fRecurrence;
    this.recurrenceData = data.RecurrenceData;
  }

}
