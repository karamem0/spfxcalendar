import * as React from 'react';
import styles from './Calendar.module.scss';
import * as Office from 'office-ui-fabric-react';

import * as strings from 'CalendarWebPartStrings';

import { IPermissionInformation } from './IPermissionInformation';
import { EventItem } from '../models/EventItem';
import { DateTime } from '../utils/DateTime';

export interface ICalendarPanelViewProps {
  item: EventItem;
  permission: IPermissionInformation;
  onEdit: (value: EventItem) => void;
  onDelete: (value: EventItem) => void;
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
      this.props.item
        ? <Office.Panel
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
              <div className={styles.footer}>
                {
                  this.props.permission.canEdit && !this.props.item.recurrence
                    ? <Office.PrimaryButton
                        className={styles.button}
                        onClick={() => this.props.onEdit(this.props.item)}>
                        {strings.EditButton}
                      </Office.PrimaryButton>
                    : null
                }
                {
                  this.props.permission.canDelete
                    ? <Office.PrimaryButton
                        className={styles.button}
                        onClick={() => this.props.onDelete(this.props.item)}>
                        {strings.DeleteButton}
                      </Office.PrimaryButton>
                    : null
                }
                <Office.DefaultButton
                  className={styles.button}
                  onClick={() => this.props.onCancel()}>
                  {strings.CancelButton}
                </Office.DefaultButton>
              </div>
            }>
            {
              this.props.item.recurrence
                ? <p>
                    <div className={styles.formlabel}>
                      <Office.Icon iconName="Sync" title={strings.RecurrenceLabel} />
                    </div>
                    <div className={styles.formcontrol}>
                      {this.props.item.recurrence}
                    </div>
                  </p>
                : null
            }
            {
              this.props.item.location
                ? <p>
                    <div className={styles.formlabel}>
                      <Office.Icon iconName="MapPin" title={strings.LocationLabel} />
                    </div>
                    <div className={styles.formcontrol}>
                      {this.props.item.location}
                    </div>
                  </p>
                : null
            }
            <p>
              <div className={styles.formlabel}>
                <Office.Icon iconName="Calendar" title={strings.DateTimeLabel} />
              </div>
              <div className={styles.formcontrol}>
                {
                  this.props.item.allDayEvent
                    ? new DateTime(this.props.item.beginDate).format(strings.DateFormat) + ' ~ ' +
                      new DateTime(this.props.item.endDate).format(strings.DateFormat)
                    : new DateTime(this.props.item.beginDate).format(strings.DateTimeFormat) + ' ~ ' +
                      new DateTime(this.props.item.endDate).format(strings.DateTimeFormat)
                }
              </div>
            </p>
          </Office.Panel>
        : null
    );
  }

}
