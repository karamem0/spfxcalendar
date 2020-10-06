import * as React from 'react';
import styles from './Calendar.module.scss';
import * as Office from 'office-ui-fabric-react';

import * as strings from 'CalendarWebPartStrings';

import { IEventItem } from './IEventItem';
import { DateTime } from '../utils/DateTime';

export interface ICalendarModalAddProps {
  item: IEventItem;
  onSave: (value: IEventItem) => void;
  onCancel: () => void;
}

export interface ICalendarModalAddState {
  title: string;
  location: string;
  beginDate: Date;
  endDate: Date;
  allDayEvent: boolean;
}

export class CalendarModalAdd extends React.Component<ICalendarModalAddProps, ICalendarModalAddState> {

  private readonly calendarFormatter: Office.ICalendarFormatDateCallbacks = {
    formatDay: (value: Date) => new DateTime(value).format(strings.DayFormat),
    formatMonthDayYear: (value: Date) => new DateTime(value).format(strings.DateFormat),
    formatMonthYear: (value: Date) => new DateTime(value).format(strings.YearMonthFormat),
    formatYear: (value: Date) => new DateTime(value).format(strings.YearFormat)
  };
  private readonly calendarStrings: Office.IDatePickerStrings = {
    days: strings.DayNames,
    months: strings.MonthNames,
    shortDays: strings.DayShortNames,
    shortMonths: strings.MonthShortNames,
    goToToday: strings.GoToTodayLabel
  };
  private readonly hourOptions: Array<Office.IDropdownOption> = strings.HourNames.map((value) => ({ key: value, text: value }));
  private readonly minuteOptions: Array<Office.IDropdownOption> = strings.MinuteNames.map((value) => ({ key: value, text: value }));
  private readonly titleId: string = Office.getId('title');

  constructor(props: ICalendarModalAddProps) {
    super(props);
    if (this.props.item == null) {
      this.state = {
        title: null,
        location: null,
        beginDate: null,
        endDate: null,
        allDayEvent: false
      };
    } else {
      this.state = {
        title: this.props.item.title,
        location: this.props.item.location,
        beginDate: this.props.item.beginDate,
        endDate: this.props.item.endDate,
        allDayEvent: this.props.item.allDayEvent
      };
    }
  }

  public render(): React.ReactElement<ICalendarModalAddProps> {
    return (
      this.props.item
        ? <Office.Modal
            className={styles.panel}
            containerClassName={styles.modal}
            isOpen={this.props.item != null}
            titleAriaId={this.titleId}
            onDismiss={() => this.props.onCancel()}>
            <div className={styles.head}>
              <span id={this.titleId} className={styles.title}>{strings.AddItemLabel}</span>
              <Office.IconButton
                ariaLabel={strings.CloseButton}
                className={styles.close}
                iconProps={{ iconName: 'Cancel' }}
                onClick={() => this.props.onCancel() } />
            </div>
            <div className={styles.body}>
              <p>
                <div className={styles.formlabel}>
                  <Office.Icon iconName="Header" title={strings.TitleLabel} />
                </div>
                <div className={styles.formcontrol}>
                  <Office.TextField
                    value={this.state.title}
                    onChange={(event, value) => this.setState({ title: value })} />
                </div>
              </p>
              <p>
                <div className={styles.formlabel}>
                  <Office.Icon iconName="MapPin" title={strings.LocationLabel} />
                </div>
                <div className={styles.formcontrol}>
                  <Office.TextField
                    value={this.state.location}
                    onChange={(event, value) => this.setState({ location: value })} />
                </div>
              </p>
              <p>
                <div className={styles.formlabel}>
                  <Office.Icon iconName="Calendar" title={strings.DateTimeLabel} />
                </div>
                <div className={styles.formcontrol}>
                <ul>
                  <li>
                      <Office.DatePicker
                        className={styles.date}
                        dateTimeFormatter={this.calendarFormatter}
                        formatDate={(value) => new DateTime(value).format(strings.DateFormat)}
                        strings={this.calendarStrings}
                        value={this.state.beginDate}
                        onSelectDate={(value) => this.setState({ beginDate: value })} />
                      {
                        this.state.allDayEvent
                          ? null
                          : <div className={styles.time}>
                              <div className={styles.timecontrol}>
                                <Office.Dropdown
                                  options={this.hourOptions}
                                  selectedKey={new DateTime(this.state.beginDate).format("HH")}
                                  onChange={(event, value) => {
                                    const date = this.state.beginDate;
                                    date.setHours(Number.parseInt(value.key.toString()));
                                    this.setState({ beginDate: date });
                                  }} />
                              </div>
                              <div className={styles.timeseparator}>:</div>
                              <div className={styles.timecontrol}>
                                <Office.Dropdown
                                  options={this.minuteOptions}
                                  selectedKey={new DateTime(this.state.beginDate).format("MM")}
                                  onChange={(event, value) => {
                                    const date = this.state.beginDate;
                                    date.setMinutes(Number.parseInt(value.key.toString()));
                                    this.setState({ beginDate: date });
                                  }} />
                              </div>
                            </div>
                      }
                    </li>
                    <li>
                      <div className={styles.rangeseparator}>~</div>
                    </li>
                    <li>
                      <Office.DatePicker
                        className={styles.date}
                        dateTimeFormatter={this.calendarFormatter}
                        formatDate={(value) => new DateTime(value).format(strings.DateFormat)}
                        strings={this.calendarStrings}
                        value={this.state.endDate}
                        onSelectDate={(value) => this.setState({ endDate: value })} />
                    {
                      this.state.allDayEvent
                        ? null
                        : <div className={styles.time}>
                            <div className={styles.timecontrol}>
                              <Office.Dropdown
                                options={this.hourOptions}
                                selectedKey={new DateTime(this.state.endDate).format("HH")}
                                onChange={(event, value) => {
                                  const date = this.state.endDate;
                                  date.setHours(Number.parseInt(value.key.toString()));
                                  this.setState({ endDate: date });
                                }} />
                            </div>
                            <div className={styles.timeseparator}>:</div>
                            <div className={styles.timecontrol}>
                              <Office.Dropdown
                                options={this.minuteOptions}
                                selectedKey={new DateTime(this.state.endDate).format("MM")}
                                onChange={(event, value) => {
                                  const date = this.state.endDate;
                                  date.setMinutes(Number.parseInt(value.key.toString()));
                                  this.setState({ endDate: date });
                                }} />
                            </div>
                          </div>
                    }
                    </li>
                    <li>
                    <Office.Toggle
                      checked={this.state.allDayEvent}
                      inlineLabel={true}
                      label={strings.AllDayEventLabel}
                      onChange={(event, value) => this.setState({ allDayEvent: value })} />
                    </li>
                  </ul>
                </div>
              </p>
            </div>
            <div className={styles.foot}>
              <Office.PrimaryButton
                onClick={() => this.props.onSave({
                  id: 0,
                  title: this.state.title,
                  location: this.state.location,
                  beginDate: this.state.beginDate,
                  endDate: this.state.endDate,
                  allDayEvent: this.state.allDayEvent,
                  recurrence: null
                })}>
                {strings.SaveButton}
              </Office.PrimaryButton>
              <Office.DefaultButton
                onClick={() => this.props.onCancel()}>
                {strings.CancelButton}
              </Office.DefaultButton>
            </div>
          </Office.Modal>
        : null
    );
  }

  public componentDidUpdate(prevProps: ICalendarModalAddProps, prevState: ICalendarModalAddState): void {
    if (this.props.item == prevProps.item) {
      return;
    }
    if (this.props.item == null) {
      this.setState({
        title: null,
        location: null,
        beginDate: null,
        endDate: null,
        allDayEvent: false
      });
    } else {
      this.setState({
        title: this.props.item.title,
        location: this.props.item.location,
        beginDate: this.props.item.beginDate,
        endDate: this.props.item.endDate,
        allDayEvent: this.props.item.allDayEvent
      });
    }
  }

}
