import { ICalendarDateProps } from '../models/ICalendarDate';
import { ICalendarEventProps } from '../models/ICalendarEvent';

export class CalendarDateService {

  public createEventPropsArray(props: ICalendarDateProps): Array<ICalendarEventProps> {
    return props.events.map((event) => {
      return { event: event };
    });
  }

}
