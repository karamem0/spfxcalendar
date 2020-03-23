import * as React from 'react';
import styles from './Calendar.module.scss';
import { IconButton, MessageBar, MessageBarType } from 'office-ui-fabric-react';

import * as strings from 'CalendarWebPartStrings';

import {
  ICalendarProps,
  ICalendarState
} from '../models/ICalendar';

import { CalendarHead } from './CalendarHead';
import { CalendarWeek } from './CalendarWeek';
import { CalendarService } from '../services/CalendarService';
import { IEvent } from '../models/IEvent';
import { DateUtil } from '../utils/DateUtil';

const dateFormat = require('dateformat') as Function;

export class Calendar extends React.Component<ICalendarProps, ICalendarState> {

  private service: CalendarService;

  constructor(props: ICalendarProps) {
    super(props);
    this.service = new CalendarService(this.props.context);
    this.state = {
      date: DateUtil.today(),
      events: [],
      error: null
    };
  }

  public render(): React.ReactElement<ICalendarProps> {
    return (
      <div>
        {
          this.state.error
            ? <MessageBar messageBarType={MessageBarType.error} onDismiss={() => this.setState({ 'error': null })}>{this.state.error}</MessageBar>
            : null
        }
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <td colSpan={7} className={styles.head}>
                <IconButton iconProps={{ iconName: 'ChevronLeft' }} onClick={this.onPrevMonth.bind(this)} ></IconButton>
                <span className={styles.date}>{dateFormat(this.state.date, strings.CalendarFormat)}</span>
                <IconButton iconProps={{ iconName: 'ChevronRight' }} onClick={this.onNextMonth.bind(this)} ></IconButton>
              </td>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            <tr className={styles.week}>
              {
                this.service.createHeadPropsArray().map((props) => {
                  return <CalendarHead {...props}></CalendarHead>;
                })
              }
            </tr>
            {
              this.service.createWeekPropsArray(this.state).map((props) => {
                return <CalendarWeek key={dateFormat(props.beginDate, 'yyyymmdd')} {...props}></CalendarWeek>;
              })
            }
          </tbody>
        </table>
      </div>
    );
  }

  public componentDidMount(): void {
    this.service.getEvents(this.props.listId, this.state.date)
      .then((events: Array<IEvent>) => {
        this.setState({
          events: events,
          error: null
        });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }

  public componentDidUpdate(prevProps: ICalendarProps, prevState: ICalendarState): void {
    if (this.props.listId !== prevProps.listId) {
      this.service.getEvents(this.props.listId, this.state.date)
        .then((events: Array<IEvent>) => {
          this.setState({
            events: events,
            error: null
          });
        })
        .catch((error) => {
          this.setState({ error: error.message });
        });
    }
  }

  private onPrevMonth(): void {
    const date = DateUtil.prevMonth(this.state.date);
    this.service.getEvents(this.props.listId, date)
      .then((events: Array<IEvent>) => {
        this.setState({
          date: date,
          events: events,
          error: null
        });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }

  private onNextMonth(): void {
    const date = DateUtil.nextMonth(this.state.date);
    this.service.getEvents(this.props.listId, date)
      .then((events: Array<IEvent>) => {
        this.setState({
          date: date,
          events: events,
          error: null
        });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }

}
