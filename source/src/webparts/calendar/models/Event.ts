import { DateTime } from '../utils/DateTime';

export class Event {

  public id: number;
  public title: string;
  public location: string;
  public beginDate: Date;
  public endDate: Date;
  public allDayEvent: boolean;
  public recurrence: boolean;

  constructor(item: any, date?: Date) {
    let beginDate = new Date(Date.parse(item.EventDate));
    let endDate = new Date(Date.parse(item.EndDate));
    if (item.fAllDayEvent) {
      beginDate = new DateTime(beginDate).universal().toDate();
      endDate = new DateTime(endDate).universal().toDate();
    }
    if (date == undefined) {
      this.id = item.Id;
      this.title = item.Title;
      this.location = item.Location;
      this.beginDate = beginDate;
      this.endDate = endDate;
      this.allDayEvent = item.fAllDayEvent;
      this.recurrence = false;
    } else {
      this.id = item.Id;
      this.title = item.Title;
      this.location = item.Location;
      this.beginDate = new DateTime(date).setTime(beginDate).toDate();
      this.endDate = new DateTime(date).setTime(endDate).toDate();
      this.allDayEvent = item.fAllDayEvent;
      this.recurrence = true;
    }
  }

}
