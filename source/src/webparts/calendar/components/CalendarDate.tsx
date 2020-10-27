import * as React from 'react';
import styles from './Calendar.module.scss';
import * as Office from 'office-ui-fabric-react';

import * as strings from 'CalendarWebPartStrings';

import {
  ICalendarItemProps,
  CalendarItem
} from './CalendarItem';
import { IEventItem } from './IEventItem';
import { IPermission } from './IPermission';

export interface ICalendarDateProps {
  date: Date;
  permission: IPermission;
  items: Array<IEventItem>;
  onItemAdd: (value: IEventItem) => void;
  onItemSelect: (value: IEventItem) => void;
}

export interface ICalendarDateState {
  isAddVisible: boolean;
}

export class CalendarDate extends React.Component<ICalendarDateProps, ICalendarDateState> {

  constructor(props: ICalendarDateProps) {
    super(props);
    this.state = {
      isAddVisible: false
    };
  }

  public render(): React.ReactElement<ICalendarDateProps> {
    const itemProps = this.props.items
      .sort((item1, item2) => {
        return item1.beginDate.getTime() - item2.beginDate.getTime();
      })
      .map((item): ICalendarItemProps => {
        return {
          item: item,
          onItemSelect: this.props.onItemSelect
        };
      });
    return (
      <td
        className={styles.calendardate}
        onMouseEnter={() => this.setState({ isAddVisible: true })}
        onMouseLeave={() => this.setState({ isAddVisible: false })}>
        <div className={styles.head}>
          <div className={styles.day}>
            <div className={styles.dayinner}>
              {this.props.date.getDate()}
            </div>
          </div>
          <div className={styles.add}>
            <div className={styles.addinner}>
              {
                (() => {
                  if (this.props.permission.canAdd && this.state.isAddVisible) {
                    return (
                      <Office.Link
                        href="javascript:void(0)"
                        onClick={() =>
                          this.props.onItemAdd({
                            id: null,
                            title: null,
                            location: null,
                            beginDate: new Date(this.props.date),
                            endDate: new Date(this.props.date),
                            allDayEvent: false,
                            recurrence: false,
                            recurrenceText: null
                          })
                        }>
                        <Office.Icon iconName="Add" />
                        <span>{strings.AddButton}</span>
                      </Office.Link>
                    );
                  }
                })()
              }
            </div>
          </div>
        </div>
        <div className={styles.body}>
          {itemProps.map((props) => <CalendarItem {...props} />)}
        </div>
      </td>
    );
  }

}
