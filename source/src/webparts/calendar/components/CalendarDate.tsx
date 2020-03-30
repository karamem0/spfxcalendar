import * as React from 'react';
import styles from './Calendar.module.scss';

import {
  ICalendarEventProps,
  CalendarEvent
} from './CalendarEvent';
import { Event } from '../models/Event';

export interface ICalendarDateProps {
  date: Date;
  events: Array<Event>;
}

export interface ICalendarDateState { }

export class CalendarDate extends React.Component<ICalendarDateProps, ICalendarDateState> {

  constructor(props: ICalendarDateProps) {
    super(props);
  }

  public render(): React.ReactElement<ICalendarDateProps> {
    const eventPropsArray: Array<ICalendarEventProps> = this.props.events
      .sort((event1, event2) => {
        return event1.beginDate.getTime() - event2.beginDate.getTime();
      })
      .map((event) => {
        return { event: event };
      });
    return (
      <td className={styles.calendardate}>
        <div className={styles.day}>{this.props.date.getDate()}</div>
        <div className={styles.scroll}>
          {
            eventPropsArray.map((props) => {
              return <CalendarEvent {...props}></CalendarEvent>;
            })
          }
        </div>
      </td>
    );
  }

}
