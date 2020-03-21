import * as React from 'react';
import styles from './Calendar.module.scss';

import {
  ICalendarWeekProps,
  ICalendarWeekState
} from '../models/ICalendarWeek';

import { CalendarDate } from './CalendarDate';
import { CalendarWeekService } from '../services/CalendarWeekService';

const dateFormat = require('dateformat') as Function;

export class CalendarWeek extends React.Component<ICalendarWeekProps, ICalendarWeekState> {

  private service: CalendarWeekService = new CalendarWeekService();

  constructor(props: ICalendarWeekProps) {
    super(props);
  }

  public render(): React.ReactElement<ICalendarWeekProps> {
    return (
      <tr className={styles.week}>
        {
          this.service.createDatePropsArray(this.props).map((props) => {
            return <CalendarDate key={dateFormat(props.date, 'yyyymmdd')} {...props}></CalendarDate>;
          })
        }
      </tr>
    );
  }

}
