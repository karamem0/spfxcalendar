import * as React from 'react';
import styles from './Calendar.module.scss';
import * as Fluent from '@fluentui/react';

import * as strings from 'CalendarWebPartStrings';

import { IEventItem } from './IEventItem';
import { DateTime } from '../utils/DateTime';

export interface ICalendarItemProps {
  item: IEventItem;
  onItemSelect: (value: IEventItem) => void;
}

export interface ICalendarItemState { }

export class CalendarItem extends React.Component<ICalendarItemProps, ICalendarItemState> {

  constructor(props: ICalendarItemProps) {
    super(props);
    this.state = {};
  }

  public render(): React.ReactElement<ICalendarItemProps> {
    return (
      <div className={styles['calendar-item']}>
        <div className={styles.item}>
          <Fluent.Link
            href="javascript:void(0)"
            onClick={() => this.props.onItemSelect(this.props.item)}>
            {
              this.props.item.allDayEvent
                ? null
                : new DateTime(this.props.item.beginDate).format('HH:MM') + ' '
            }
            {
              this.props.item.title
                ? this.props.item.title
                : `(${strings.NoTitleLabel})`
            }
          </Fluent.Link>
        </div>
      </div>
    );
  }

}
