import * as React from 'react';
import styles from './Calendar.module.scss';

import {
  ICalendarDateProps,
  CalendarDate
} from './CalendarDate';
import { IEventItem } from './IEventItem';
import { IPermission } from './IPermission';
import { DateTime } from '../utils/DateTime';

export interface ICalendarWeekProps {
  beginDate: Date;
  endDate: Date;
  permission: IPermission;
  items: Array<IEventItem>;
  onItemAdd: (value: IEventItem) => void;
  onItemSelect: (value: IEventItem) => void;
}

export interface ICalendarWeekState { }

export class CalendarWeek extends React.Component<ICalendarWeekProps, ICalendarWeekState> {

  constructor(props: ICalendarWeekProps) {
    super(props);
    this.state = {};
  }

  public render(): React.ReactElement<ICalendarWeekProps> {
    const dateProps = new Array<ICalendarDateProps>();
    for (let date = new Date(this.props.beginDate); date <= this.props.endDate; date.setDate(date.getDate() + 1)) {
      dateProps.push({
        date: new Date(date),
        permission: this.props.permission,
        items: this.props.items.filter((item) =>
          item.beginDate >= date &&
          item.beginDate < new DateTime(date).nextDay().toDate()
        ),
        onItemAdd: this.props.onItemAdd,
        onItemSelect: this.props.onItemSelect
      });
    }
    return (
      <tr className={styles.calendarweek}>
        {dateProps.map((props) => <CalendarDate key={new DateTime(props.date).format('yyyymmdd')} {...props} />)}
      </tr>
    );
  }

}
