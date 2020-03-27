import * as React from 'react';
import styles from './Calendar.module.scss';
import { Icon, Link, TeachingBubble } from 'office-ui-fabric-react';

import * as strings from 'CalendarWebPartStrings';

import { Event } from '../models/Event';
import { DateTime } from '../utils/DateTime';

export interface ICalendarEventProps {
  event: Event;
}

export interface ICalendarEventState {
  toggle: boolean;
}

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
                : new DateTime(this.props.event.beginDate).format('HH:MM') + ' '
            }
            {this.props.event.title}
          </Link>
        </div>
        {
          this.state.toggle
            ? <TeachingBubble target={this.link} onDismiss={() => this.setState({ toggle: false })}>
                <div className={styles.callout}>
                  <div>
                    {this.props.event.title}
                    {
                      this.props.event.recurrence
                        ? <Icon className={styles.icon} iconName="Sync"></Icon>
                        : null
                    }
                  </div>
                  <div className={styles.location}>{this.props.event.location}</div>
                  <div className={styles.alldays}>
                  {
                    this.props.event.allDayEvent
                      ? strings.AllDaysLabel
                      : null
                  }
                  </div>
                  <div className={styles.date}>
                  {
                    new DateTime(this.props.event.beginDate).format(strings.DateTimeFormat) + ' - ' + 
                    new DateTime(this.props.event.endDate).format(strings.DateTimeFormat)
                  }
                  </div>
                </div>
              </TeachingBubble>
            : null
        }
      </div>
    );
  }

}
