import * as React from 'react';
import styles from './Calendar.module.scss';
import { IWebPartContext } from "@microsoft/sp-webpart-base";
import { IconButton, MessageBar, MessageBarType } from 'office-ui-fabric-react';

import * as strings from 'CalendarWebPartStrings';

import { ICalendarHeadProps, CalendarHead } from './CalendarHead';
import { ICalendarWeekProps, CalendarWeek } from './CalendarWeek';
import { Event } from '../models/Event';
import { CalendarService } from '../services/CalendarService';
import { DateTime } from '../utils/DateTime';

export interface ICalendarProps {
  context: IWebPartContext;
  listId: string;
}

export interface ICalendarState {
  date: Date;
  events: Array<Event>;
  error: string;
}

export class Calendar extends React.Component<ICalendarProps, ICalendarState> {

  private service: CalendarService;

  constructor(props: ICalendarProps) {
    super(props);
    this.service = new CalendarService(this.props.context);
    this.state = {
      date: DateTime.today().toDate(),
      events: [],
      error: null
    };
  }

  public render(): React.ReactElement<ICalendarProps> {
    const headPropsArray: Array<ICalendarHeadProps> = strings.CalendarHeaderLabel.split(',').map((value) => {
      return { name: value };
    });
    const beginDate = new DateTime(this.state.date).beginOfMonth().beginOfWeek().toDate();
    const endDate = new DateTime(this.state.date).endOfMonth().endOfWeek().toDate();
    const weekPropsArray: Array<ICalendarWeekProps> = [];
    for (let date = new Date(beginDate); date < endDate; date.setDate(date.getDate() + 7)) {
      weekPropsArray.push({
        beginDate: new Date(date),
        endDate: new DateTime(date).endOfWeek().toDate(),
        events: this.state.events.filter((event) =>
          event.beginDate >= date &&
          event.beginDate < new DateTime(date).endOfWeek().nextDay().toDate()
        )
      });
    }
    return (
      <div>
        {
          this.state.error
            ? <MessageBar messageBarType={MessageBarType.error} onDismiss={() => this.setState({ error: null })}>{this.state.error}</MessageBar>
            : null
        }
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <td colSpan={7} className={styles.head}>
                <IconButton iconProps={{ iconName: 'ChevronLeft' }} onClick={this.onPrevMonth.bind(this)} ></IconButton>
                <span className={styles.date}>{new DateTime(this.state.date).format(strings.CalendarFormat)}</span>
                <IconButton iconProps={{ iconName: 'ChevronRight' }} onClick={this.onNextMonth.bind(this)} ></IconButton>
              </td>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            <tr className={styles.week}>
              {
                headPropsArray.map((props) => {
                  return <CalendarHead {...props}></CalendarHead>;
                })
              }
            </tr>
            {
              weekPropsArray.map((props) => {
                return <CalendarWeek key={new DateTime(props.beginDate).format('yyyymmdd')} {...props}></CalendarWeek>;
              })
            }
          </tbody>
        </table>
      </div>
    );
  }

  public async componentDidMount(): Promise<void> {
    try {
      const events = await this.service.getEvents(this.props.listId, this.state.date);
      this.setState({
        events: events,
        error: null
      });
    }
    catch (error) {
      console.error(error);
      this.setState({ error: error.message });
    }
  }

  public async componentDidUpdate(prevProps: ICalendarProps, prevState: ICalendarState): Promise<void> {
    if (this.props.listId == prevProps.listId) {
      return;
    }
    try {
      const events = await this.service.getEvents(this.props.listId, this.state.date);
      this.setState({
        events: events,
        error: null
      });
    }
    catch (error) {
      console.error(error);
      this.setState({ error: error.message });
    }
  }

  private async onPrevMonth(): Promise<void> {
    const date = new DateTime(this.state.date).prevMonth().toDate();
    try {
      const events = await this.service.getEvents(this.props.listId, date);
      this.setState({
        date: date,
        events: events,
        error: null
      });
    }
    catch (error) {
      console.error(error);
      this.setState({ error: error.message });
    }
  }

  private async onNextMonth(): Promise<void> {
    const date = new DateTime(this.state.date).nextMonth().toDate();
    try {
      const events = await this.service.getEvents(this.props.listId, date);
      this.setState({
        date: date,
        events: events,
        error: null
      });
    }
    catch (error) {
      console.error(error);
      this.setState({ error: error.message });
    }
  }

}
