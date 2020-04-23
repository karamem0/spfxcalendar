import { DateTime } from '../utils/DateTime';

interface IEventItemRecurrenceOptions {
  date: Date;
  text: string;
}

export class EventItem {

  public id?: number;
  public title?: string;
  public location?: string;
  public beginDate?: Date;
  public endDate?: Date;
  public allDayEvent?: boolean;
  public recurrence?: string;

  constructor(value?: any, options?: IEventItemRecurrenceOptions) {
    if (value == null) {
      return;
    }
    let beginDate = new Date(Date.parse(value.EventDate));
    let endDate = new Date(Date.parse(value.EndDate));
    if (value.fAllDayEvent) {
      beginDate = new DateTime(beginDate).universal().toDate();
      endDate = new DateTime(endDate).universal().toDate();
    }
    if (options == null) {
      this.id = value.Id;
      this.title = value.Title;
      this.location = value.Location;
      this.beginDate = beginDate;
      this.endDate = endDate;
      this.allDayEvent = value.fAllDayEvent;
      this.recurrence = null;
    } else {
      this.id = value.Id;
      this.title = value.Title;
      this.location = value.Location;
      this.beginDate = new DateTime(options.date).setTime(beginDate).toDate();
      this.endDate = new DateTime(options.date).setTime(endDate).toDate();
      this.allDayEvent = value.fAllDayEvent;
      this.recurrence = options.text;
    }
  }

}
