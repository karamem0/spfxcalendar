import { IEventItem } from "../components/IEventItem";
import { EventItem } from "../models/EventItem";
import { DateTime } from "./DateTime";

export class MultipleItemGererator {

  public static generate(item: EventItem): Array<IEventItem> {
    const result = new Array<IEventItem>();
    const diff = DateTime.diffDates(
      new DateTime(item.beginDate).beginOfDate().toDate(),
      new DateTime(item.endDate).beginOfDate().toDate());
    if (diff == 0) {
      result.push({
        id: item.id,
        title: item.title,
        location: item.location,
        beginDate: item.beginDate,
        endDate: item.endDate,
        allDayEvent: item.allDayEvent,
        recurrence: item.recurrence,
        recurrenceText: null,
      });
    } else {
      result.push({
        id: item.id,
        title: item.title,
        location: item.location,
        beginDate: item.beginDate,
        endDate: new DateTime(item.beginDate).endOfDate().toDate(),
        allDayEvent: item.allDayEvent,
        recurrence: item.recurrence,
        recurrenceText: null,
      });
      for (let index = 1; index < diff; index++) {
        const date = new Date(item.beginDate);
        date.setDate(date.getDate() + index);
        result.push({
          id: item.id,
          title: item.title,
          location: item.location,
          beginDate: new DateTime(date).beginOfDate().toDate(),
          endDate: new DateTime(date).endOfDate().toDate(),
          allDayEvent: item.allDayEvent,
          recurrence: item.recurrence,
          recurrenceText: null,
          });
      }
      result.push({
        id: item.id,
        title: item.title,
        location: item.location,
        beginDate: new DateTime(item.endDate).beginOfDate().toDate(),
        endDate: item.endDate,
        allDayEvent: item.allDayEvent,
        recurrence: item.recurrence,
        recurrenceText: null,
      });
    }
    return result;
  }

}
