import * as React from 'react';
import styles from './Calendar.module.scss';

import {
  ICalendarDateProps,
  ICalendarDateState
} from '../models/ICalendarDate';

import { CalendarEvent } from './CalendarEvent';
import { CalendarDateService } from '../services/CalendarDateService';

export class CalendarDate extends React.Component<ICalendarDateProps, ICalendarDateState> {

  private service: CalendarDateService = new CalendarDateService();

  constructor(props: ICalendarDateProps) {
    super(props);
  }

  public render(): React.ReactElement<ICalendarDateProps> {
    return (
      <td className={styles.date}>
        <div className={styles.day}>{this.props.date.getDate()}</div>
        <div className={styles.scroll}>
        {
          this.service.createEventPropsArray(this.props).map((props) => {
            return <CalendarEvent {...props}></CalendarEvent>;
          })
        }
        </div>
      </td>
    );
  }

}
