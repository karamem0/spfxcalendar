import * as React from 'react';
import styles from './Calendar.module.scss';

import { ICalendarDateProps, CalendarDate } from './CalendarDate';
import { Event } from '../models/Event';
import { DateTime } from '../utils/DateTime';

const dateFormat = require('dateformat') as Function;

export interface ICalendarWeekProps {
  beginDate: Date;
  endDate: Date;
  events: Array<Event>;
}

export interface ICalendarWeekState { }

export class CalendarWeek extends React.Component<ICalendarWeekProps, ICalendarWeekState> {

  constructor(props: ICalendarWeekProps) {
    super(props);
  }

  public render(): React.ReactElement<ICalendarWeekProps> {
    const datePropsArray = Array<ICalendarDateProps>();
    for (let date = new Date(this.props.beginDate); date <= this.props.endDate; date.setDate(date.getDate() + 1)) {
      datePropsArray.push({
        date: new Date(date),
        events: this.props.events.filter((event) =>
          event.beginDate >= date &&
          event.beginDate < new DateTime(date).nextDay().toDate()
        )
      });
    }
    return (
      <tr className={styles.calendarweek}>
        {
          datePropsArray.map((props) => {
            return <CalendarDate key={dateFormat(props.date, 'yyyymmdd')} {...props}></CalendarDate>;
          })
        }
      </tr>
    );
  }

}
