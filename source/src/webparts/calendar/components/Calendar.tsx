import * as React from 'react';
import styles from './Calendar.module.scss';
import { IWebPartContext } from "@microsoft/sp-webpart-base";
import { ActionButton, DefaultButton, Callout, IconButton, MessageBar, MessageBarType, getId } from 'office-ui-fabric-react';

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
  showCallout: boolean;
  error: string;
}

export class Calendar extends React.Component<ICalendarProps, ICalendarState> {

  private service: CalendarService;
  private dateButton: HTMLElement;
  private calloutLabelId: string = getId('callout-label');
  private calloutDescriptionId: string = getId('callout-description');

  constructor(props: ICalendarProps) {
    super(props);
    this.service = new CalendarService(this.props.context);
    this.state = {
      date: DateTime.today().toDate(),
      events: [],
      showCallout: false,
      error: null
    };
  }

  public render(): React.ReactElement<ICalendarProps> {
    const headPropsArray: Array<ICalendarHeadProps> = strings.DayNames.map((value) => {
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
      <div className={styles.calendar}>
        {
          this.state.error
            ? <MessageBar messageBarType={MessageBarType.error} onDismiss={() => this.setState({ error: null })}>{this.state.error}</MessageBar>
            : null
        }
        <table>
          <thead>
            <tr>
              <td colSpan={7} className={styles.head}>
                <IconButton
                  className={styles.icon}
                  iconProps={{ iconName: 'ChevronLeft' }}
                  onClick={this.onPrevMonth.bind(this)}>
                </IconButton>
                <span ref={(element) => this.dateButton = element}>
                  <ActionButton
                    className={styles.date}
                    onClick={() => this.setState({ showCallout: true })}>
                    {new DateTime(this.state.date).format(strings.CalendarFormat)}
                  </ActionButton>
                </span>
                <IconButton
                  className={styles.icon}
                  iconProps={{ iconName: 'ChevronRight' }}
                  onClick={this.onNextMonth.bind(this)} >
                </IconButton>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr className={styles.head}>
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
        {
          this.state.showCallout
            ? <Callout
                className={styles.callout}
                target={this.dateButton}
                ariaLabelledBy={this.calloutLabelId}
                ariaDescribedBy={this.calloutDescriptionId}
                onDismiss={() => this.setState({ showCallout: false })}>
                <div id={this.calloutLabelId} className={styles.label}>
                  <IconButton
                    iconProps={{ iconName: 'ChevronLeft' }}
                    onClick={this.onPrevYear.bind(this)}>
                  </IconButton>
                  <span>{this.state.date.getFullYear()}</span>
                  <IconButton
                    iconProps={{ iconName: 'ChevronRight' }}
                    onClick={this.onNextYear.bind(this)}>
                  </IconButton>
                </div>
                <div id={this.calloutDescriptionId} className={styles.description}>
                  {
                    strings.MonthNames.map((value, index) => {
                      return <ActionButton className={styles.button} onClick={this.onMonth.bind(this, index)}>{value}</ActionButton>;
                    })
                  }
                </div>
              </Callout>
            : null
        }
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

  private async onMonth(month: number): Promise<void> {
    const date = new Date(this.state.date);
    date.setMonth(month);
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

  private async onPrevYear(): Promise<void> {
    const date = new DateTime(this.state.date).prevYear().toDate();
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

  private async onNextYear(): Promise<void> {
    const date = new DateTime(this.state.date).nextYear().toDate();
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
