import * as React from 'react';
import styles from './Calendar.module.scss';

export interface ICalendarHeadProps {
  name: string;
}

export interface ICalendarHeadState { }

export class CalendarHead extends React.Component<ICalendarHeadProps, ICalendarHeadState> {

  constructor(props: ICalendarHeadProps) {
    super(props);
  }

  public render(): React.ReactElement<ICalendarHeadProps> {
    return (
      <td className={styles.calendarhead}>
        <span>{this.props.name}</span>
      </td>
    );
  }

}
