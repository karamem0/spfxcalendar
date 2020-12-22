import * as React from 'react';
import styles from './Calendar.module.scss';
import * as Fluent from '@fluentui/react';
import { Theme } from '@fluentui/react-theme-provider';

import * as strings from 'CalendarWebPartStrings';

import { CalendarTable } from './CalendarTable';
import { CalendarService } from '../services/CalendarService';

export interface ICalendarProps {
  service: CalendarService;
  theme: Theme;
}

export interface ICalendarState { }

export class Calendar extends React.Component<ICalendarProps, ICalendarState> {

  constructor(props: ICalendarProps) {
    super(props);
  }

  public render(): React.ReactElement<ICalendarProps> {
    return (
      <Fluent.Customizer settings={{ theme: this.props.theme }}>
        <div className={Fluent.mergeStyles({
          color: this.props.theme
            ? this.props.theme.palette.neutralPrimary
            : null
        })}>
          <CalendarTable
            service={this.props.service}
            theme={this.props.theme} />
        </div>
      </Fluent.Customizer>
    );
  }

}
