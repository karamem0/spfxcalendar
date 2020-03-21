import * as React from 'react';
import styles from './Calendar.module.scss';

import {
  ICalendarHeadProps,
  ICalendarHeadState
} from '../models/ICalendarHead';

export class CalendarHead extends React.Component<ICalendarHeadProps, ICalendarHeadState> {

  constructor(props: ICalendarHeadProps) {
    super(props);
  }

  public render(): React.ReactElement<ICalendarHeadProps> {
    return (
      <td className={styles.head}>
        <span>{this.props.name}</span>
      </td>
    );
  }

}
