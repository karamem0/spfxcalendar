import * as React from 'react';
import styles from './Calendar.module.scss';
import * as Fluent from '@fluentui/react';

import * as strings from 'CalendarWebPartStrings';

import { IEventItem } from './IEventItem';
import { IPermission } from './IPermission';
import { DateTime } from '../utils/DateTime';

export interface ICalendarPanelViewProps {
  item: IEventItem;
  permission: IPermission;
  onEdit: (value: IEventItem) => void;
  onCancel: () => void;
}

export interface ICalendarPanelViewState { }

export class CalendarPanelView extends React.Component<ICalendarPanelViewProps, ICalendarPanelViewState> {

  constructor(props: ICalendarPanelViewProps) {
    super(props);
    this.state = {};
  }

  public render(): React.ReactElement<ICalendarPanelViewProps> {
    return (
      <React.Fragment>
        {
          (() => {
            if (this.props.item) {
              return (
                <Fluent.Panel
                  className={styles.panel}
                  closeButtonAriaLabel="Close"
                  headerText={
                    this.props.item.title
                      ? this.props.item.title
                      : `(${strings.NoTitleLabel})`
                  }
                  isFooterAtBottom={true}
                  isLightDismiss={true}
                  isOpen={this.props.item != null}
                  onDismiss={() => this.props.onCancel()}
                  onRenderFooterContent={() =>
                    <div className={styles.foot}>
                      {
                        (() => {
                          if (this.props.permission.canEdit || this.props.permission.canDelete) {
                            return (
                              <Fluent.PrimaryButton
                                onClick={() => this.props.onEdit(this.props.item)}>
                                {strings.EditButton}
                              </Fluent.PrimaryButton>
                            );
                          }
                        })()
                      }
                      <Fluent.DefaultButton
                        onClick={() => this.props.onCancel()}>
                        {strings.CancelButton}
                      </Fluent.DefaultButton>
                    </div>
                  }>
                  {
                    (() => {
                      if (this.props.item.recurrence) {
                        return (
                          <p>
                            <div className={styles['form-label']}>
                              <Fluent.Icon iconName="Sync" title={strings.RecurrenceLabel} />
                            </div>
                            <div className={styles['form-control']}>
                              {this.props.item.recurrenceText}
                            </div>
                          </p>
                        );
                      }
                    })()
                  }
                  {
                    (() => {
                      if (this.props.item.location) {
                        return (
                          <p>
                            <div className={styles['form-label']}>
                              <Fluent.Icon iconName="MapPin" title={strings.LocationLabel} />
                            </div>
                            <div className={styles['form-control']}>
                              {this.props.item.location}
                            </div>
                          </p>
                        );
                      }
                    })()
                  }
                  <p>
                    <div className={styles['form-label']}>
                      <Fluent.Icon iconName="Calendar" title={strings.DateTimeLabel} />
                    </div>
                    <div className={styles['form-control']}>
                      {
                        this.props.item.allDayEvent
                          ? new DateTime(this.props.item.beginDate).format(strings.DateFormat) + ' ~ ' +
                          new DateTime(this.props.item.endDate).format(strings.DateFormat)
                          : new DateTime(this.props.item.beginDate).format(strings.DateTimeFormat) + ' ~ ' +
                          new DateTime(this.props.item.endDate).format(strings.DateTimeFormat)
                      }
                    </div>
                  </p>
                </Fluent.Panel>
              );
            }
          })()
        }
      </React.Fragment>
    );
  }

}
