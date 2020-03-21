import { ICalendarDateProps } from '../models/ICalendarDate';
import { ICalendarWeekProps } from '../models/ICalendarWeek';
import { DateUtil } from '../utils/DateUtil';

export class CalendarWeekService {

  public createDatePropsArray(props: ICalendarWeekProps): Array<ICalendarDateProps> {
    const array = Array<ICalendarDateProps>();
    for (let date = new Date(props.beginDate.getTime()); date <= props.endDate; date.setDate(date.getDate() + 1)) {
      array.push({
        date: new Date(date.getTime()),
        events: props.events.filter((event) =>
          event.beginDate >= date &&
          event.beginDate < DateUtil.nextDay(date))
      });
    }
    return array;
  }

}
