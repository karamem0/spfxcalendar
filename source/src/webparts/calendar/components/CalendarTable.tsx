import * as React from 'react';
import styles from './Calendar.module.scss';
import * as Fluent from '@fluentui/react';
import { Theme } from '@fluentui/react-theme-provider';

import * as strings from 'CalendarWebPartStrings';

import {
  ICalendarWeekProps,
  CalendarWeek
} from './CalendarWeek';
import { CalendarPanelView } from './CalendarPanelView';
import { CalendarModalAdd } from './CalendarModalAdd';
import { CalendarModalEdit } from './CalendarModalEdit';
import { IEventItem } from './IEventItem';
import { IPermission } from './IPermission';
import { EventItem } from '../models/EventItem';
import { CalendarService } from '../services/CalendarService';
import { DateTime } from '../utils/DateTime';

export interface ICalendarTableProps {
  service: CalendarService;
  theme: Theme;
}

export interface ICalendarTableState {
  date: Date;
  permission: IPermission;
  items: Array<IEventItem>;
  itemView: IEventItem;
  itemAdd: IEventItem;
  itemEdit: IEventItem;
  isCalloutVisible: boolean;
  error: string;
}

export class CalendarTable extends React.Component<ICalendarTableProps, ICalendarTableState> {

  private dateButton: HTMLElement;
  private calloutLabelId: string = Fluent.getId('callout-label');
  private calloutDescriptionId: string = Fluent.getId('callout-description');

  constructor(props: ICalendarTableProps) {
    super(props);
    this.state = {
      date: DateTime.today().toDate(),
      permission: {
        canAdd: false,
        canEdit: false,
        canDelete: false,
      },
      items: [],
      itemView: null,
      itemAdd: null,
      itemEdit: null,
      isCalloutVisible: false,
      error: null
    };
  }

  public render(): React.ReactElement<ICalendarTableProps> {
    const beginDate = new DateTime(this.state.date).beginOfMonth().beginOfWeek().toDate();
    const endDate = new DateTime(this.state.date).endOfMonth().endOfWeek().toDate();
    const weekProps = new Array<ICalendarWeekProps>();
    for (let date = new Date(beginDate); date < endDate; date.setDate(date.getDate() + 7)) {
      weekProps.push({
        beginDate: new Date(date),
        endDate: new DateTime(date).endOfWeek().toDate(),
        permission: this.state.permission,
        items: this.state.items.filter((event) =>
          event.beginDate >= date &&
          event.beginDate < new DateTime(date).endOfWeek().nextDay().toDate()
        ),
        onItemAdd: (item) => this.setState({ itemAdd: item }),
        onItemSelect: (item) => this.onItemView(item)
      });
    }
    return (
      <div className={styles['calendar-table']}>
        {
          (() => {
            if (this.state.error) {
              return (
                <Fluent.MessageBar
                  messageBarType={Fluent.MessageBarType.error}
                  onDismiss={() => this.setState({ error: null })}>
                  {this.state.error}
                </Fluent.MessageBar>
              );
            }
          })()
        }
        <table>
          <thead>
            <tr>
              <td colSpan={7} className={styles.head}>
                <Fluent.IconButton
                  className={styles.icon}
                  iconProps={{ iconName: 'ChevronLeft' }}
                  onClick={this.onPrevMonth.bind(this)} />
                <span ref={(element) => this.dateButton = element}>
                  <Fluent.ActionButton
                    className={styles.date}
                    onClick={() => this.setState({ isCalloutVisible: true })}>
                    {new DateTime(this.state.date).format(strings.YearMonthFormat)}
                  </Fluent.ActionButton>
                </span>
                <Fluent.IconButton
                  className={styles.icon}
                  iconProps={{ iconName: 'ChevronRight' }}
                  onClick={this.onNextMonth.bind(this)} />
              </td>
            </tr>
          </thead>
          <tbody>
            <tr className={styles.head}>
              {
                strings.DayNames.map((name) =>
                  <td className={styles['calendar-head']}>
                    {name}
                  </td>
                )
              }
            </tr>
            {
              weekProps.map((props) =>
                <CalendarWeek key={new DateTime(props.beginDate).format('yyyymmdd')} {...props} />
              )
            }
          </tbody>
        </table>
        {
          (() => {
            if (this.state.isCalloutVisible) {
              return (
                <Fluent.Callout
                  className={styles.callout}
                  target={this.dateButton}
                  ariaLabelledBy={this.calloutLabelId}
                  ariaDescribedBy={this.calloutDescriptionId}
                  onDismiss={() => this.setState({ isCalloutVisible: false })}>
                  <div id={this.calloutLabelId} className={styles.label}>
                    <Fluent.IconButton
                      iconProps={{ iconName: 'ChevronLeft' }}
                      onClick={this.onPrevYear.bind(this)} />
                    {this.state.date.getFullYear()}
                    <Fluent.IconButton
                      iconProps={{ iconName: 'ChevronRight' }}
                      onClick={this.onNextYear.bind(this)} />
                  </div>
                  <div id={this.calloutDescriptionId} className={styles.description}>
                    {
                      strings.MonthShortNames.map((value, index) =>
                        <Fluent.ActionButton
                          onClick={this.onSetMonth.bind(this, index)}>
                          {value}
                        </Fluent.ActionButton>
                      )
                    }
                  </div>
                </Fluent.Callout>
              );
            }
          })()
        }
        <CalendarPanelView
          item={this.state.itemView}
          permission={this.state.permission}
          onEdit={(value) => this.setState({ itemView: null, itemEdit: value })}
          onCancel={() => this.onCancel()} />
        <CalendarModalAdd
          theme={this.props.theme}
          item={this.state.itemAdd}
          onSave={(value) => this.onItemAdd(value)}
          onCancel={() => this.onCancel()} />
        <CalendarModalEdit
          theme={this.props.theme}
          item={this.state.itemEdit}
          permission={this.state.permission}
          onSave={(value) => this.onItemEdit(value)}
          onCancel={() => this.onCancel()}
          onDelete={(id) => this.onItemDelete(id)} />
      </div>
    );
  }

  public async componentDidMount(): Promise<void> {
    try {
      const items = await this.props.service.getItems(this.state.date);
      const permission = await this.props.service.getBasePermission();
      this.setState({
        items: items,
        permission: permission,
        error: null
      });
    } catch (error) {
      console.error(error);
      this.setState({ error: error.message });
    }
  }

  public async componentDidUpdate(prevProps: ICalendarTableProps, prevState: ICalendarTableState): Promise<void> {
    if (this.props.service.listId == prevProps.service.listId) {
      return;
    }
    try {
      const items = await this.props.service.getItems(this.state.date);
      const permission = await this.props.service.getBasePermission();
      this.setState({
        items: items,
        permission: permission,
        error: null
      });
    } catch (error) {
      console.error(error);
      this.setState({ error: error.message });
    }
  }

  private async onPrevMonth(): Promise<void> {
    try {
      const date = new DateTime(this.state.date).prevMonth().toDate();
      const items = await this.props.service.getItems(date);
      this.setState({
        date: date,
        items: items,
        error: null
      });
    } catch (error) {
      console.error(error);
      this.setState({ error: error.message });
    }
  }

  private async onNextMonth(): Promise<void> {
    try {
      const date = new DateTime(this.state.date).nextMonth().toDate();
      const items = await this.props.service.getItems(date);
      this.setState({
        date: date,
        items: items,
        error: null
      });
    } catch (error) {
      console.error(error);
      this.setState({ error: error.message });
    }
  }

  private async onSetMonth(month: number): Promise<void> {
    try {
      const date = new Date(this.state.date);
      date.setMonth(month);
      const items = await this.props.service.getItems(date);
      this.setState({
        date: date,
        items: items,
        error: null
      });
    } catch (error) {
      console.error(error);
      this.setState({ error: error.message });
    }
  }

  private async onPrevYear(): Promise<void> {
    try {
      const date = new DateTime(this.state.date).prevYear().toDate();
      const items = await this.props.service.getItems(date);
      this.setState({
        date: date,
        items: items,
        error: null
      });
    } catch (error) {
      console.error(error);
      this.setState({ error: error.message });
    }
  }

  private async onNextYear(): Promise<void> {
    try {
      const date = new DateTime(this.state.date).nextYear().toDate();
      const items = await this.props.service.getItems(date);
      this.setState({
        date: date,
        items: items,
        error: null
      });
    } catch (error) {
      console.error(error);
      this.setState({ error: error.message });
    }
  }

  public onCancel(): void {
    this.setState({
      itemView: null,
      itemAdd: null,
      itemEdit: null
    });
  }

  public async onItemView(item: IEventItem): Promise<void> {
    try {
      if (item.recurrence) {
        this.setState({ itemView: await this.props.service.getItem(item.id) });
      } else {
        this.setState({ itemView: item });
      }
    } catch (error) {
      console.error(error);
      this.setState({ error: error.message });
    }
  }

  public async onItemAdd(item: EventItem): Promise<void> {
    try {
      await this.props.service.createItem(item);
      const items = await this.props.service.getItems(this.state.date);
      this.setState({
        items: items,
        itemAdd: null,
        error: null
      });
    } catch (error) {
      console.error(error);
      this.setState({ error: error.message });
    }
  }

  public async onItemEdit(item: EventItem): Promise<void> {
    try {
      await this.props.service.updateItem(item);
      const items = await this.props.service.getItems(this.state.date);
      this.setState({
        items: items,
        itemEdit: null,
        error: null
      });
    } catch (error) {
      console.error(error);
      this.setState({ error: error.message });
    }
  }

  public async onItemDelete(id: number): Promise<void> {
    try {
      await this.props.service.deleteItem(id);
      const items = await this.props.service.getItems(this.state.date);
      this.setState({
        items: items,
        itemEdit: null,
        error: null
      });
    } catch (error) {
      console.error(error);
      this.setState({ error: error.message });
    }
  }

}
