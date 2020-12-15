import * as React from 'react';
import styles from './Calendar.module.scss';
import * as Fluent from '@fluentui/react';

import * as strings from 'CalendarWebPartStrings';

import { CalendarTable } from './CalendarTable';
import { CalendarService } from '../services/CalendarService';
import { IStyle } from '../styles/IStyle';

export interface ICalendarProps {
  service: CalendarService;
  style: IStyle;
}

export interface ICalendarState { }

export class Calendar extends React.Component<ICalendarProps, ICalendarState> {

  constructor(props: ICalendarProps) {
    super(props);
  }

  public render(): React.ReactElement<ICalendarProps> {
    return (
      <Fluent.Customizer {...this.props.style.Customizations}>
        <div className={Fluent.mergeStyles({
          color: this.props.style.Palette
            ? this.props.style.Palette.neutralPrimary
            : null
        })}>
          <CalendarTable
            service={this.props.service}
            style={this.props.style} />
        </div>
      </Fluent.Customizer>
    );
  }

}
