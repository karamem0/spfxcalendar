import * as React from 'react';
import styles from './Calendar.module.scss';
import * as Office from 'office-ui-fabric-react';

import * as strings from 'CalendarWebPartStrings';

import {
  ICalendarItemProps,
  CalendarItem
} from './CalendarItem';
import { IPermissionInformation } from './IPermissionInformation';
import { EventItem } from '../models/EventItem';

export interface ICalendarDateProps {
  date: Date;
  permission: IPermissionInformation;
  items: Array<EventItem>;
  onItemAdd: (value: EventItem) => void;
  onItemSelect: (value: EventItem) => void;
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
                this.props.permission.canAdd && this.state.isAddVisible
                  ? <Office.Link
                      href="javascript:void(0)"
                      onClick={() =>
                        this.props.onItemAdd(new EventItem({
                          EventDate: new Date(this.props.date),
                          EndDate: new Date(this.props.date)
                        }))
                      }>
                      <Office.Icon iconName="Add" />
                      <span>{strings.AddButton}</span>
                    </Office.Link>
                  : null
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
