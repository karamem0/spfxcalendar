import * as React from 'react';
import styles from './Calendar.module.scss';
import * as Office from 'office-ui-fabric-react';

import * as strings from 'CalendarWebPartStrings';

import { IEventItem } from './IEventItem';
import { IRecurrenceData } from './IRecurrenceData';
import { EventItem } from '../models/EventItem';
import { DateTime } from '../utils/DateTime';
import { RecurrenceDataGenerator } from '../utils/RecurrenceDataGenerator';
import { RecurrenceEndDateGenerator } from '../utils/RecurrenceEndDateGenerator';

export interface ICalendarModalAddProps {
  item: IEventItem;
  onSave: (value: EventItem) => void;
  onCancel: () => void;
}

export interface ICalendarModalAddState {
  title: string;
  location: string;
  beginDate: Date;
  endDate: Date;
  allDayEvent: boolean;
  recurrence: boolean;
  recurrenceData: IRecurrenceData;
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
        allDayEvent: false,
        recurrence: false,
        recurrenceData: {
          repeatOption: 'daily',
          dailyOption: 'frequency',
          dailyFrequency: 1,
          weeklyFrequency: 1,
          weeklyOptions: [false, false, false, false, false, false, false],
          monthlyOption: 'monthly',
          monthlyFrequency: 1,
          monthlyDay: 1,
          monthlyByDayNumber: 'first',
          monthlyByDayDay: 'day',
          yearlyOption: 'yearly',
          yearlyFrequency: 1,
          yearlyMonth: 0,
          yearlyDay: 1,
          yearlyByDayNumber: 'first',
          yearlyByDayDay: 'day',
          ruleOption: 'forever',
          repeatInstance: 10,
          windowEnd: null
        }
      };
    } else {
      this.state = {
        title: this.props.item.title,
        location: this.props.item.location,
        beginDate: this.props.item.beginDate,
        endDate: this.props.item.endDate,
        allDayEvent: this.props.item.allDayEvent,
        recurrence: this.props.item.recurrence,
        recurrenceData: {}
      };
    }
  }

  public render(): React.ReactElement<ICalendarModalAddProps> {
    return (
      <React.Fragment>
        {
          (() => {
            if (this.props.item) {
              return (
                <Office.Modal
                  containerClassName={styles.modal}
                  isOpen={!!this.props.item}
                  titleAriaId={this.titleId}
                  onDismiss={() => this.props.onCancel()}>
                  <div className={styles.head}>
                    <span id={this.titleId} className={styles.title}>{strings.AddItemLabel}</span>
                    <Office.IconButton
                      ariaLabel={strings.CloseButton}
                      className={styles.close}
                      iconProps={{ iconName: 'Cancel' }}
                      onClick={() => this.props.onCancel()} />
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
                    {
                      (() => {
                        if (!this.state.allDayEvent || !this.state.recurrence) {
                          return (
                            <p>
                              <div className={styles.formlabel}>
                                <Office.Icon iconName="Calendar" title={strings.DateTimeLabel} />
                              </div>
                              <div className={styles.formcontrol}>
                                <ul>
                                  <li>
                                    {
                                      (() => {
                                        if (!this.state.recurrence) {
                                          return (
                                            <Office.DatePicker
                                              className={styles.date}
                                              dateTimeFormatter={this.calendarFormatter}
                                              formatDate={(value) => new DateTime(value).format(strings.DateFormat)}
                                              strings={this.calendarStrings}
                                              value={this.state.beginDate}
                                              onSelectDate={(value) =>
                                                this.setState({
                                                  beginDate: new DateTime(this.state.beginDate).setDate(value).toDate()
                                                })} />
                                          );
                                        }
                                      })()
                                    }
                                    {
                                      (() => {
                                        if (!this.state.allDayEvent) {
                                          return (
                                            <div className={styles.time}>
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
                                          );
                                        }
                                      })()
                                    }
                                  </li>
                                  <li>
                                    <div className={styles.rangeseparator}>~</div>
                                  </li>
                                  <li>
                                    {
                                      (() => {
                                        if (!this.state.recurrence) {
                                          return (
                                            <Office.DatePicker
                                              className={styles.date}
                                              dateTimeFormatter={this.calendarFormatter}
                                              formatDate={(value) => new DateTime(value).format(strings.DateFormat)}
                                              strings={this.calendarStrings}
                                              value={this.state.endDate}
                                              onSelectDate={(value) =>
                                                this.setState({
                                                  endDate: new DateTime(this.state.endDate).setDate(value).toDate()
                                                })} />
                                          );
                                        }
                                      })()
                                    }
                                    {
                                      (() => {
                                        if (!this.state.allDayEvent) {
                                          return (
                                            <div className={styles.time}>
                                              <div className={styles.timecontrol}>
                                                <Office.Dropdown
                                                  options={this.hourOptions}
                                                  selectedKey={new DateTime(this.state.endDate).format("HH")}
                                                  onChange={(event, value) => {
                                                    const date = this.state.endDate;
                                                    date.setHours(Number.parseInt(value.key.toString()));
                                                    this.setState({ endDate: date });
                                                    if (this.state.recurrence && this.state.recurrenceData.windowEnd) {
                                                      this.setState({
                                                        recurrenceData: {
                                                          ...this.state.recurrenceData,
                                                          windowEnd: new DateTime(this.state.recurrenceData.windowEnd).setTime(this.state.endDate).toDate()
                                                        }
                                                      });
                                                    }
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
                                                    if (this.state.recurrence && this.state.recurrenceData.windowEnd) {
                                                      this.setState({
                                                        recurrenceData: {
                                                          ...this.state.recurrenceData,
                                                          windowEnd: new DateTime(this.state.recurrenceData.windowEnd).setTime(this.state.endDate).toDate()
                                                        }
                                                      });
                                                    }
                                                  }} />
                                              </div>
                                            </div>
                                          );
                                        }
                                      })()
                                    }
                                  </li>
                                </ul>
                              </div>
                            </p>
                          );
                        }
                      })()
                    }
                    <p>
                      <div className={styles.formlabel}>
                        <Office.Icon iconName="Clock" title={strings.AllDayEventLabel} />
                      </div>
                      <div className={styles.formcontrol}>
                        <ul>
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
                    <p>
                      <div className={styles.formlabel}>
                        <Office.Icon iconName="Sync" title={strings.RecurrenceLabel} />
                      </div>
                      <div className={styles.formcontrol}>
                        <ul>
                          <li>
                            <Office.Toggle
                              checked={this.state.recurrence}
                              inlineLabel={true}
                              label={strings.RecurrenceLabel}
                              onChange={(event, value) => this.setState({ recurrence: value })} />
                          </li>
                          {
                            (() => {
                              if (this.state.recurrence) {
                                return (
                                  <React.Fragment>
                                    <li>
                                      <div className={styles.repeat}>
                                        <Office.ChoiceGroup
                                          defaultSelectedKey={this.state.recurrenceData.repeatOption}
                                          options={[
                                            { key: 'daily', text: strings.DailyLabel },
                                            { key: 'weekly', text: strings.WeeklyLabel },
                                            { key: 'monthly', text: strings.MonthlyLabel },
                                            { key: 'yearly', text: strings.YearlyLabel }
                                          ]}
                                          onChange={(event, option) =>
                                            this.setState({
                                              recurrenceData: {
                                                ...this.state.recurrenceData,
                                                repeatOption: option.key
                                              }
                                            })} />
                                      </div>
                                      <div className={styles.pattern}>
                                        {
                                          (() => {
                                            switch (this.state.recurrenceData.repeatOption) {
                                              case 'daily':
                                                return (
                                                  <Office.ChoiceGroup
                                                    defaultSelectedKey={this.state.recurrenceData.dailyOption}
                                                    options={[
                                                      {
                                                        key: 'frequency',
                                                        text: null,
                                                        onRenderField: (props, render) => {
                                                          return (
                                                            <div className={styles.flex}>
                                                              {render!(props)}
                                                              {strings.DailyFrequencyPrefixLabel}
                                                              <Office.SpinButton
                                                                className={Office.mergeStyles({ margin: '0 .5em 0 .5em', width: '160px' })}
                                                                defaultValue={this.state.recurrenceData.dailyFrequency.toString()}
                                                                max={99}
                                                                min={1}
                                                                onBlur={(event) =>
                                                                  this.setState({
                                                                    recurrenceData: {
                                                                      ...this.state.recurrenceData,
                                                                      dailyFrequency: Number.parseInt(event.target.value)
                                                                    }
                                                                  })}
                                                                onDecrement={(value, event) => {
                                                                  const num = Number.parseInt(value);
                                                                  if (num > 1) {
                                                                    this.setState({
                                                                      recurrenceData: {
                                                                        ...this.state.recurrenceData,
                                                                        dailyFrequency: num - 1
                                                                      }
                                                                    });
                                                                    return (num - 1).toString();
                                                                  }
                                                                  return value;
                                                                }}
                                                                onIncrement={(value, event) => {
                                                                  const num = Number.parseInt(value);
                                                                  if (num < 99) {
                                                                    this.setState({
                                                                      recurrenceData: {
                                                                        ...this.state.recurrenceData,
                                                                        dailyFrequency: num + 1
                                                                      }
                                                                    });
                                                                    return (num + 1).toString();
                                                                  }
                                                                  return value;
                                                                }} />
                                                              {strings.DailyFrequencySuffixLabel}
                                                            </div>
                                                          );
                                                        }
                                                      },
                                                      { key: 'weekday', text: strings.DateWeekdayLabel }
                                                    ]}
                                                    onChange={(event, option) =>
                                                      this.setState({
                                                        recurrenceData: {
                                                          ...this.state.recurrenceData,
                                                          dailyOption: option.key
                                                        }
                                                      })} />
                                                );
                                              case 'weekly':
                                                return (
                                                  <React.Fragment>
                                                    <div className={styles.flex}>
                                                      {strings.WeeklyFrequencyPrefixLabel}
                                                      <Office.SpinButton
                                                        className={Office.mergeStyles({ margin: '0 .5em 0 .5em', width: '160px' })}
                                                        defaultValue={this.state.recurrenceData.weeklyFrequency.toString()}
                                                        max={99}
                                                        min={1}
                                                        onBlur={(event) =>
                                                          this.setState({
                                                            recurrenceData: {
                                                              ...this.state.recurrenceData,
                                                              weeklyFrequency: Number.parseInt(event.target.value)
                                                            }
                                                          })}
                                                        onDecrement={(value, event) => {
                                                          const num = Number.parseInt(value);
                                                          if (num > 1) {
                                                            this.setState({
                                                              recurrenceData: {
                                                                ...this.state.recurrenceData,
                                                                weeklyFrequency: num - 1
                                                              }
                                                            });
                                                            return (num - 1).toString();
                                                          }
                                                          return value;
                                                        }}
                                                        onIncrement={(value, event) => {
                                                          const num = Number.parseInt(value);
                                                          if (num < 99) {
                                                            this.setState({
                                                              recurrenceData: {
                                                                ...this.state.recurrenceData,
                                                                weeklyFrequency: num + 1
                                                              }
                                                            });
                                                            return (num + 1).toString();
                                                          }
                                                          return value;
                                                        }} />
                                                      {strings.WeeklyFrequencySuffixLabel}
                                                    </div>
                                                    <div className={Office.mergeStyles(styles.flex, { margin: '1em 0 0 0' })}>
                                                      {
                                                        (() => {
                                                          const elements = [];
                                                          for (let index = 0; index < 7; index++) {
                                                            elements.push(
                                                              <Office.Checkbox
                                                                className={Office.mergeStyles({ margin: '0 .5em .5em 0' })}
                                                                checked={this.state.recurrenceData.weeklyOptions[index]}
                                                                label={strings.DayNames[index]}
                                                                onChange={(element, checked) => {
                                                                  const options = this.state.recurrenceData.weeklyOptions.slice();
                                                                  options[index] = checked;
                                                                  this.setState({
                                                                    recurrenceData: {
                                                                      ...this.state.recurrenceData,
                                                                      weeklyOptions: options
                                                                    }
                                                                  });
                                                                }} />
                                                            );
                                                          }
                                                          return elements;
                                                        })()
                                                      }
                                                    </div>
                                                  </React.Fragment>
                                                );
                                              case 'monthly':
                                                return (
                                                  <React.Fragment>
                                                    <div className={styles.flex}>
                                                      {strings.MonthlyFrequencyPrefixLabel}
                                                      <Office.SpinButton
                                                        className={Office.mergeStyles({ margin: '0 .5em 0 .5em', width: '160px' })}
                                                        defaultValue={this.state.recurrenceData.monthlyFrequency.toString()}
                                                        max={99}
                                                        min={1}
                                                        onBlur={(event) =>
                                                          this.setState({
                                                            recurrenceData: {
                                                              ...this.state.recurrenceData,
                                                              monthlyFrequency: Number.parseInt(event.target.value)
                                                            }
                                                          })}
                                                        onDecrement={(value, event) => {
                                                          const num = Number.parseInt(value);
                                                          if (num > 1) {
                                                            this.setState({
                                                              recurrenceData: {
                                                                ...this.state.recurrenceData,
                                                                monthlyFrequency: num - 1
                                                              }
                                                            });
                                                            return (num - 1).toString();
                                                          }
                                                          return value;
                                                        }}
                                                        onIncrement={(value, event) => {
                                                          const num = Number.parseInt(value);
                                                          if (num < 99) {
                                                            this.setState({
                                                              recurrenceData: {
                                                                ...this.state.recurrenceData,
                                                                monthlyFrequency: num + 1
                                                              }
                                                            });
                                                            return (num + 1).toString();
                                                          }
                                                          return value;
                                                        }} />
                                                      {strings.MonthlyFrequencySuffixLabel}
                                                    </div>
                                                    <Office.ChoiceGroup
                                                      defaultSelectedKey={this.state.recurrenceData.monthlyOption}
                                                      options={[
                                                        {
                                                          key: 'monthly',
                                                          text: null,
                                                          onRenderField: (props, render) => {
                                                            return (
                                                              <div className={styles.flex}>
                                                                {render!(props)}
                                                                {strings.MonthlyDayPrefixLabel}
                                                                <Office.SpinButton
                                                                  className={Office.mergeStyles({ margin: '0 .5em 0 .5em', width: '160px' })}
                                                                  defaultValue={this.state.recurrenceData.monthlyDay.toString()}
                                                                  max={31}
                                                                  min={1}
                                                                  onBlur={(event) =>
                                                                    this.setState({
                                                                      recurrenceData: {
                                                                        ...this.state.recurrenceData,
                                                                        monthlyDay: Number.parseInt(event.target.value)
                                                                      }
                                                                    })}
                                                                  onDecrement={(value, event) => {
                                                                    const num = Number.parseInt(value);
                                                                    if (num > 1) {
                                                                      this.setState({
                                                                        recurrenceData: {
                                                                          ...this.state.recurrenceData,
                                                                          monthlyDay: num - 1
                                                                        }
                                                                      });
                                                                      return (num - 1).toString();
                                                                    }
                                                                    return value;
                                                                  }}
                                                                  onIncrement={(value, event) => {
                                                                    const num = Number.parseInt(value);
                                                                    if (num < 31) {
                                                                      this.setState({
                                                                        recurrenceData: {
                                                                          ...this.state.recurrenceData,
                                                                          monthlyDay: num + 1
                                                                        }
                                                                      });
                                                                      return (num + 1).toString();
                                                                    }
                                                                    return value;
                                                                  }} />
                                                                {strings.MonthlyDaySuffixLabel}
                                                              </div>
                                                            );
                                                          }
                                                        },
                                                        {
                                                          key: 'monthlybyday',
                                                          text: null,
                                                          onRenderField: (props, render) => {
                                                            return (
                                                              <div className={styles.flex}>
                                                                {render!(props)}
                                                                {strings.MonthlyByDayPrefixLabel}
                                                                <Office.Dropdown
                                                                  className={Office.mergeStyles({ margin: '0 .5em 0 .5em' })}
                                                                  defaultSelectedKey={this.state.recurrenceData.monthlyByDayNumber}
                                                                  options={[
                                                                    { key: 'first', text: strings.ByDayNumberNames[0] },
                                                                    { key: 'second', text: strings.ByDayNumberNames[1] },
                                                                    { key: 'third', text: strings.ByDayNumberNames[2] },
                                                                    { key: 'fourth', text: strings.ByDayNumberNames[3] },
                                                                    { key: 'last', text: strings.ByDayNumberNames[4] }
                                                                  ]}
                                                                  onChange={(event, value) =>
                                                                    this.setState({
                                                                      recurrenceData: {
                                                                        ...this.state.recurrenceData,
                                                                        monthlyByDayNumber: value.key.toString()
                                                                      }
                                                                    })} />
                                                                <Office.Dropdown
                                                                  className={Office.mergeStyles({ margin: '0 .5em 0 .5em' })}
                                                                  defaultSelectedKey={this.state.recurrenceData.monthlyByDayDay}
                                                                  options={[
                                                                    { key: 'day', text: strings.ByDayDayNames[0] },
                                                                    { key: 'weekday', text: strings.ByDayDayNames[1] },
                                                                    { key: 'weekend_day', text: strings.ByDayDayNames[2] },
                                                                    { key: 'su', text: strings.ByDayDayNames[3] },
                                                                    { key: 'mo', text: strings.ByDayDayNames[4] },
                                                                    { key: 'tu', text: strings.ByDayDayNames[5] },
                                                                    { key: 'we', text: strings.ByDayDayNames[6] },
                                                                    { key: 'th', text: strings.ByDayDayNames[7] },
                                                                    { key: 'fr', text: strings.ByDayDayNames[8] },
                                                                    { key: 'sa', text: strings.ByDayDayNames[9] }
                                                                  ]}
                                                                  onChange={(event, value) =>
                                                                    this.setState({
                                                                      recurrenceData: {
                                                                        ...this.state.recurrenceData,
                                                                        monthlyByDayDay: value.key.toString()
                                                                      }
                                                                    })} />
                                                                {strings.MonthlyByDaySuffixLabel}
                                                              </div>
                                                            );
                                                          }
                                                        }
                                                      ]}
                                                      onChange={(event, option) =>
                                                        this.setState({
                                                          recurrenceData: {
                                                            ...this.state.recurrenceData,
                                                            monthlyOption: option.key
                                                          }
                                                        })} />
                                                  </React.Fragment>
                                                );
                                              case 'yearly':
                                                return (
                                                  <React.Fragment>
                                                    <div className={styles.flex}>
                                                      {strings.YearlyMonthPrefixLabel}
                                                      <Office.Dropdown
                                                        className={Office.mergeStyles({ margin: '0 .5em 0 .5em' })}
                                                        defaultSelectedKey={this.state.recurrenceData.yearlyMonth.toString()}
                                                        options={
                                                          strings.MonthNames.map((value, number) => {
                                                            return {
                                                              key: number.toString(),
                                                              text: value
                                                            };
                                                          })
                                                        }
                                                        onChange={(event, value) =>
                                                          this.setState({
                                                            recurrenceData: {
                                                              ...this.state.recurrenceData,
                                                              yearlyMonth: Number.isNaN(Number.parseInt(value.key.toString())) ? 0 : Number.parseInt(value.key.toString())
                                                            }
                                                          })} />
                                                      {strings.YearlyMonthSuffixLabel}
                                                    </div>
                                                    <Office.ChoiceGroup
                                                      defaultSelectedKey={this.state.recurrenceData.yearlyOption}
                                                      options={[
                                                        {
                                                          key: 'yearly',
                                                          text: null,
                                                          onRenderField: (props, render) => {
                                                            return (
                                                              <div className={styles.flex}>
                                                                {render!(props)}
                                                                {strings.YearlyDayPrefixLabel}
                                                                <Office.SpinButton
                                                                  className={Office.mergeStyles({ margin: '0 .5em 0 .5em', width: '160px' })}
                                                                  defaultValue={this.state.recurrenceData.yearlyDay.toString()}
                                                                  max={31}
                                                                  min={1}
                                                                  onBlur={(event) =>
                                                                    this.setState({
                                                                      recurrenceData: {
                                                                        ...this.state.recurrenceData,
                                                                        yearlyDay: Number.parseInt(event.target.value)
                                                                      }
                                                                    })}
                                                                  onDecrement={(value, event) => {
                                                                    const num = Number.parseInt(value);
                                                                    if (num > 1) {
                                                                      this.setState({
                                                                        recurrenceData: {
                                                                          ...this.state.recurrenceData,
                                                                          yearlyDay: num - 1
                                                                        }
                                                                      });
                                                                      return (num - 1).toString();
                                                                    }
                                                                    return value;
                                                                  }}
                                                                  onIncrement={(value, event) => {
                                                                    const num = Number.parseInt(value);
                                                                    if (num < 31) {
                                                                      this.setState({
                                                                        recurrenceData: {
                                                                          ...this.state.recurrenceData,
                                                                          yearlyDay: num + 1
                                                                        }
                                                                      });
                                                                      return (num + 1).toString();
                                                                    }
                                                                    return value;
                                                                  }} />
                                                                {strings.YearlyDaySuffixLabel}
                                                              </div>
                                                            );
                                                          }
                                                        },
                                                        {
                                                          key: 'yearlybyday',
                                                          text: null,
                                                          onRenderField: (props, render) => {
                                                            return (
                                                              <div className={styles.flex}>
                                                                {render!(props)}
                                                                {strings.YearlyByDayPrefixLabel}
                                                                <Office.Dropdown
                                                                  className={Office.mergeStyles({ margin: '0 .5em 0 .5em' })}
                                                                  defaultSelectedKey={this.state.recurrenceData.yearlyByDayNumber}
                                                                  options={[
                                                                    { key: 'first', text: strings.ByDayNumberNames[0] },
                                                                    { key: 'second', text: strings.ByDayNumberNames[1] },
                                                                    { key: 'third', text: strings.ByDayNumberNames[2] },
                                                                    { key: 'fourth', text: strings.ByDayNumberNames[3] },
                                                                    { key: 'last', text: strings.ByDayNumberNames[4] }
                                                                  ]}
                                                                  onChange={(event, value) =>
                                                                    this.setState({
                                                                      recurrenceData: {
                                                                        ...this.state.recurrenceData,
                                                                        yearlyByDayNumber: value.key.toString()
                                                                      }
                                                                    })} />
                                                                <Office.Dropdown
                                                                  className={Office.mergeStyles({ margin: '0 .5em 0 .5em' })}
                                                                  defaultSelectedKey={this.state.recurrenceData.yearlyByDayDay}
                                                                  options={[
                                                                    { key: 'day', text: strings.ByDayDayNames[0] },
                                                                    { key: 'weekday', text: strings.ByDayDayNames[1] },
                                                                    { key: 'weekend_day', text: strings.ByDayDayNames[2] },
                                                                    { key: 'su', text: strings.ByDayDayNames[3] },
                                                                    { key: 'mo', text: strings.ByDayDayNames[4] },
                                                                    { key: 'tu', text: strings.ByDayDayNames[5] },
                                                                    { key: 'we', text: strings.ByDayDayNames[6] },
                                                                    { key: 'th', text: strings.ByDayDayNames[7] },
                                                                    { key: 'fr', text: strings.ByDayDayNames[8] },
                                                                    { key: 'sa', text: strings.ByDayDayNames[9] }
                                                                  ]}
                                                                  onChange={(event, value) =>
                                                                    this.setState({
                                                                      recurrenceData: {
                                                                        ...this.state.recurrenceData,
                                                                        yearlyByDayDay: value.key.toString()
                                                                      }
                                                                    })} />
                                                                {strings.YearlyByDaySuffixLabel}
                                                              </div>
                                                            );
                                                          }
                                                        }
                                                      ]}
                                                      onChange={(event, option) =>
                                                        this.setState({
                                                          recurrenceData: {
                                                            ...this.state.recurrenceData,
                                                            yearlyOption: option.key
                                                          }
                                                        })} />
                                                  </React.Fragment>
                                                );
                                            }
                                          })()
                                        }
                                      </div>
                                    </li>
                                    <li>
                                      <Office.DatePicker
                                        className={styles.date}
                                        dateTimeFormatter={this.calendarFormatter}
                                        formatDate={(value) => new DateTime(value).format(strings.DateFormat)}
                                        label={strings.StartDateLabel}
                                        strings={this.calendarStrings}
                                        value={this.state.beginDate}
                                        onSelectDate={(value) => this.setState({ beginDate: value })} />
                                      <Office.ChoiceGroup
                                        className={styles.rule}
                                        defaultSelectedKey={this.state.recurrenceData.ruleOption}
                                        options={[
                                          { key: 'forever', text: strings.RepeatForeverLabel },
                                          {
                                            key: 'instance',
                                            text: null,
                                            onRenderField: (props, render) => {
                                              return (
                                                <div className={styles.flex}>
                                                  {render!(props)}
                                                  {strings.RepeatInstancePrefixLabel}
                                                  <Office.SpinButton
                                                    className={Office.mergeStyles({ margin: '0 .5em 0 .5em', width: '160px' })}
                                                    defaultValue={this.state.recurrenceData.repeatInstance.toString()}
                                                    max={999}
                                                    min={1}
                                                    onBlur={(event) =>
                                                      this.setState({
                                                        recurrenceData: {
                                                          ...this.state.recurrenceData,
                                                          repeatInstance: Number.parseInt(event.target.value)
                                                        }
                                                      })}
                                                    onDecrement={(value, event) => {
                                                      const num = Number.parseInt(value);
                                                      if (num > 1) {
                                                        this.setState({
                                                          recurrenceData: {
                                                            ...this.state.recurrenceData,
                                                            repeatInstance: num - 1
                                                          }
                                                        });
                                                        return (num - 1).toString();
                                                      }
                                                      return value;
                                                    }}
                                                    onIncrement={(value, event) => {
                                                      const num = Number.parseInt(value);
                                                      if (num < 999) {
                                                        this.setState({
                                                          recurrenceData: {
                                                            ...this.state.recurrenceData,
                                                            repeatInstance: num + 1
                                                          }
                                                        });
                                                        return (num + 1).toString();
                                                      }
                                                      return value;
                                                    }} />
                                                  {strings.RepeatInstanceSuffixLabel}
                                                </div>
                                              );
                                            }
                                          },
                                          {
                                            key: 'windowend',
                                            text: null,
                                            onRenderField: (props, render) => {
                                              return (
                                                <div className={styles.flex}>
                                                  {render!(props)}
                                                  {strings.EndDateLabel}
                                                  <Office.DatePicker
                                                    className={Office.mergeStyles({ margin: '0 .5em 0 .5em' })}
                                                    dateTimeFormatter={this.calendarFormatter}
                                                    formatDate={(value) => new DateTime(value).format(strings.DateFormat)}
                                                    strings={this.calendarStrings}
                                                    value={this.state.recurrenceData.windowEnd}
                                                    onSelectDate={(value) =>
                                                      this.setState({
                                                        recurrenceData: {
                                                          ...this.state.recurrenceData,
                                                          windowEnd: new DateTime(value).setTime(this.state.endDate).toDate()
                                                        }
                                                      })} />
                                                </div>
                                              );
                                            }
                                          }
                                        ]}
                                        onChange={(event, option) =>
                                          this.setState({
                                            recurrenceData: {
                                              ...this.state.recurrenceData,
                                              ruleOption: option.key
                                            }
                                          })} />
                                    </li>
                                  </React.Fragment>
                                );
                              }
                            })()
                          }
                        </ul>
                      </div>
                    </p>
                  </div>
                  <div className={styles.foot}>
                    <Office.PrimaryButton
                      onClick={() => {
                        this.props.onSave({
                          id: 0,
                          title: this.state.title,
                          location: this.state.location,
                          beginDate: this.state.beginDate,
                          endDate: RecurrenceEndDateGenerator.generate(
                            this.state.beginDate,
                            this.state.endDate,
                            this.state.recurrence,
                            this.state.recurrenceData
                          ),
                          allDayEvent: this.state.allDayEvent,
                          eventType: this.state.recurrence ? 1 : 0,
                          recurrence: this.state.recurrence,
                          recurrenceData: RecurrenceDataGenerator.generate(this.state.recurrence, this.state.recurrenceData)
                        });
                      }}>
                      {strings.SaveButton}
                    </Office.PrimaryButton>
                    <Office.DefaultButton
                      onClick={() => this.props.onCancel()}>
                      {strings.CancelButton}
                    </Office.DefaultButton>
                  </div>
                </Office.Modal>
              );
            }
          })()
        }
      </React.Fragment>
    );
  }

  public componentDidUpdate(prevProps: ICalendarModalAddProps, prevState: ICalendarModalAddState): void {
    if (this.props.item == prevProps.item) {
      return;
    }
    if (this.props.item) {
      this.setState({
        title: this.props.item.title,
        location: this.props.item.location,
        beginDate: this.props.item.beginDate,
        endDate: this.props.item.endDate,
        allDayEvent: this.props.item.allDayEvent
      });
    } else {
      this.setState({
        title: null,
        location: null,
        beginDate: null,
        endDate: null,
        allDayEvent: false,
        recurrence: false,
        recurrenceData: {
          repeatOption: 'daily',
          dailyOption: 'frequency',
          dailyFrequency: 1,
          weeklyFrequency: 1,
          weeklyOptions: [false, false, false, false, false, false, false],
          monthlyOption: 'monthly',
          monthlyFrequency: 1,
          monthlyDay: 1,
          monthlyByDayNumber: 'first',
          monthlyByDayDay: 'day',
          yearlyOption: 'yearly',
          yearlyFrequency: 1,
          yearlyMonth: 0,
          yearlyDay: 1,
          yearlyByDayNumber: 'first',
          yearlyByDayDay: 'day',
          ruleOption: 'forever',
          repeatInstance: 10,
          windowEnd: null
        }
      });
    }
  }

}
