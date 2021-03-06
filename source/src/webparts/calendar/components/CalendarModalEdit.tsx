import * as React from 'react';
import styles from './Calendar.module.scss';
import * as Fluent from '@fluentui/react';
import { Theme } from '@fluentui/react-theme-provider';

import * as strings from 'CalendarWebPartStrings';

import { IEventItem } from './IEventItem';
import { IPermission } from './IPermission';
import { EventItem } from '../models/EventItem';
import { DateTime } from '../utils/DateTime';

export interface ICalendarModalEditProps {
  theme: Theme;
  item: IEventItem;
  permission: IPermission;
  onSave: (value: EventItem) => void;
  onCancel: () => void;
  onDelete: (id: number) => void;
}

export interface ICalendarModalEditState {
  title: string;
  location: string;
  beginDate: Date;
  endDate: Date;
  allDayEvent: boolean;
}

export class CalendarModalEdit extends React.Component<ICalendarModalEditProps, ICalendarModalEditState> {

  private readonly calendarFormatter: Fluent.ICalendarFormatDateCallbacks = {
    formatDay: (value: Date) => new DateTime(value).format(strings.DayFormat),
    formatMonthDayYear: (value: Date) => new DateTime(value).format(strings.DateFormat),
    formatMonthYear: (value: Date) => new DateTime(value).format(strings.YearMonthFormat),
    formatYear: (value: Date) => new DateTime(value).format(strings.YearFormat)
  };
  private readonly calendarStrings: Fluent.IDatePickerStrings = {
    days: strings.DayNames,
    months: strings.MonthNames,
    shortDays: strings.DayShortNames,
    shortMonths: strings.MonthShortNames,
    goToToday: strings.GoToTodayLabel
  };
  private readonly hourOptions: Array<Fluent.IDropdownOption> = strings.HourNames.map((value) => ({ key: value, text: value }));
  private readonly minuteOptions: Array<Fluent.IDropdownOption> = strings.MinuteNames.map((value) => ({ key: value, text: value }));
  private readonly titleId: string = Fluent.getId('title');

  constructor(props: ICalendarModalEditProps) {
    super(props);
    if (this.props.item) {
      this.state = {
        title: this.props.item.title,
        location: this.props.item.location,
        beginDate: this.props.item.beginDate,
        endDate: this.props.item.endDate,
        allDayEvent: this.props.item.allDayEvent
      };
    } else {
      this.state = {
        title: null,
        location: null,
        beginDate: null,
        endDate: null,
        allDayEvent: false
      };
    }
  }

  public render(): React.ReactElement<ICalendarModalEditProps> {
    return (
      <React.Fragment>
        {
          (() => {
            if (this.props.item) {
              return (
                <Fluent.Modal
                  className={styles.panel}
                  containerClassName={styles.modal}
                  isOpen={this.props.item != null}
                  titleAriaId={this.titleId}
                  onDismiss={() => this.props.onCancel()}>
                  <div className={styles.head}>
                    <span id={this.titleId} className={styles.title}>{strings.EditItemLabel}</span>
                    <Fluent.IconButton
                      ariaLabel={strings.CloseButton}
                      className={styles.close}
                      iconProps={{ iconName: 'Cancel' }}
                      onClick={() => this.props.onCancel()} />
                  </div>
                  <div className={styles.body}>
                    <p>
                      <div className={styles['form-label']}>
                        <Fluent.Icon iconName="Header" title={strings.TitleLabel} />
                      </div>
                      <div className={styles['form-control']}>
                        <Fluent.TextField
                          value={this.state.title}
                          onChange={(event, value) => this.setState({ title: value })} />
                      </div>
                    </p>
                    <p>
                      <div className={styles['form-label']}>
                        <Fluent.Icon iconName="MapPin" title={strings.LocationLabel} />
                      </div>
                      <div className={styles['form-control']}>
                        <Fluent.TextField
                          value={this.state.location}
                          onChange={(event, value) => this.setState({ location: value })} />
                      </div>
                    </p>
                    <p>
                      <div className={styles['form-label']}>
                        <Fluent.Icon iconName="Calendar" title={strings.DateTimeLabel} />
                      </div>
                      <div className={styles['form-control']}>
                        <ul>
                          <li>
                            <Fluent.DatePicker
                              className={styles.date}
                              dateTimeFormatter={this.calendarFormatter}
                              formatDate={(value) => new DateTime(value).format(strings.DateFormat)}
                              strings={this.calendarStrings}
                              styles={
                                this.props.theme
                                  ? this.props.theme.components.DatePicker.styles
                                  : null
                              }
                              value={this.state.beginDate}
                              onSelectDate={(value) => this.setState({ beginDate: value })} />
                            {
                              (() => {
                                if (!this.state.allDayEvent) {
                                  return (
                                    <div className={styles.time}>
                                      <div className={styles['time-control']}>
                                        <Fluent.Dropdown
                                          options={this.hourOptions}
                                          selectedKey={new DateTime(this.state.beginDate).format("HH")}
                                          onChange={(event, value) => {
                                            const date = this.state.beginDate;
                                            date.setHours(Number.parseInt(value.key.toString()));
                                            this.setState({ beginDate: date });
                                          }} />
                                      </div>
                                      <div className={styles['time-separator']}>:</div>
                                      <div className={styles['time-control']}>
                                        <Fluent.Dropdown
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
                            <div className={styles['range-separator']}>~</div>
                          </li>
                          <li>
                            <Fluent.DatePicker
                              className={styles.date}
                              dateTimeFormatter={this.calendarFormatter}
                              formatDate={(value) => new DateTime(value).format(strings.DateFormat)}
                              strings={this.calendarStrings}
                              styles={
                                this.props.theme
                                  ? this.props.theme.components.DatePicker.styles
                                  : null
                              }
                              value={this.state.endDate}
                              onSelectDate={(value) => this.setState({ endDate: value })} />
                            {
                              (() => {
                                if (!this.state.allDayEvent) {
                                  return (
                                    <div className={styles.time}>
                                      <div className={styles['time-control']}>
                                        <Fluent.Dropdown
                                          options={this.hourOptions}
                                          selectedKey={new DateTime(this.state.endDate).format("HH")}
                                          onChange={(event, value) => {
                                            const date = this.state.endDate;
                                            date.setHours(Number.parseInt(value.key.toString()));
                                            this.setState({ endDate: date });
                                          }} />
                                      </div>
                                      <div className={styles['time-separator']}>:</div>
                                      <div className={styles['time-control']}>
                                        <Fluent.Dropdown
                                          options={this.minuteOptions}
                                          selectedKey={new DateTime(this.state.endDate).format("MM")}
                                          onChange={(event, value) => {
                                            const date = this.state.endDate;
                                            date.setMinutes(Number.parseInt(value.key.toString()));
                                            this.setState({ endDate: date });
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
                    <p>
                      <div className={styles['form-label']}>
                        <Fluent.Icon iconName="Clock" title={strings.AllDayEventLabel} />
                      </div>
                      <div className={styles['form-control']}>
                        <ul>
                          <li>
                            <Fluent.Toggle
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
                    {
                      (() => {
                        if (this.props.permission.canEdit) {
                          return (
                            <Fluent.PrimaryButton
                              onClick={() => this.props.onSave({
                                id: this.props.item.id,
                                title: this.state.title,
                                location: this.state.location,
                                beginDate: this.state.beginDate,
                                endDate: this.state.endDate,
                                allDayEvent: this.state.allDayEvent,
                                eventType: 0,
                                recurrence: false,
                                recurrenceData: null
                              })}>
                              {strings.SaveButton}
                            </Fluent.PrimaryButton>
                          );
                        }
                      })()
                    }
                    <Fluent.DefaultButton
                      onClick={() => this.props.onCancel()}>
                      {strings.CancelButton}
                    </Fluent.DefaultButton>
                    {
                      (() => {
                        if (this.props.permission.canDelete) {
                          return (
                            <Fluent.PrimaryButton
                              className={styles.delete}
                              onClick={() => this.props.onDelete(this.props.item.id)}>
                              {strings.DeleteButton}
                            </Fluent.PrimaryButton>
                          );
                        }
                      })()
                    }
                  </div>
                </Fluent.Modal>
              );
            }
          })()
        }
      </React.Fragment>
    );
  }

  public componentDidUpdate(prevProps: ICalendarModalEditProps, prevState: ICalendarModalEditState): void {
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
      });
    }
  }

}
