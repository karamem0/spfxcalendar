import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'CalendarWebPartStrings';

import { Calendar } from './components/Calendar';
import { ICalendarProps } from './models/ICalendar';

export interface ICalendarWebPartProps {
  listTitle: string;
}

export default class CalendarWebPart extends BaseClientSideWebPart<ICalendarWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ICalendarProps> = React.createElement(
      Calendar,
      {
        context: this.context,
        listTitle: this.properties.listTitle
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupFields: [
                PropertyPaneTextField('listTitle', {
                  label: strings.ListTitleFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }

}
