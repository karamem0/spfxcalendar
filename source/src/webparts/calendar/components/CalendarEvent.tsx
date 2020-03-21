import * as React from 'react';
import styles from './Calendar.module.scss';
import { Link, TeachingBubble } from 'office-ui-fabric-react';

import * as strings from 'CalendarWebPartStrings';

import {
  ICalendarEventProps,
  ICalendarEventState
} from '../models/ICalendarEvent';

const dateFormat = require('dateformat') as Function;

export class CalendarEvent extends React.Component<ICalendarEventProps, ICalendarEventState> {

  private link: HTMLElement;

  constructor(props: ICalendarEventProps) {
    super(props);
    this.state = {
      toggle: false
    };
  }

  public render(): React.ReactElement<ICalendarEventProps> {
    return (
      <div>
        <div className={styles.event} ref={(element) => this.link = element}>
          <Link href="javascript:void(0)" onClick={() => this.setState({ toggle: true })}>
            {
              this.props.event.allDayEvent
                ? null 
                : dateFormat(this.props.event.beginDate, 'HH:MM')
            } {this.props.event.title}
          </Link>
        </div>
        {
          this.state.toggle
            ? <TeachingBubble target={this.link} onDismiss={() => this.setState({ toggle: false })}>
                <div>{this.props.event.title}</div>
                <div><small>
                  {
                    this.props.event.allDayEvent
                      ? strings.AllDaysFieldLabel
                      : dateFormat(this.props.event.beginDate, strings.DateTimeFormat) + ' - ' + 
                        dateFormat(this.props.event.endDate, strings.DateTimeFormat)
                  }
                </small></div>
              </TeachingBubble>
            : null
        }
      </div>
    );
  }

}
