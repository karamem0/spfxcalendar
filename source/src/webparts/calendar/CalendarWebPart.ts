import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

import * as strings from 'CalendarWebPartStrings';

import { ICalendarProps, Calendar } from './components/Calendar';

export interface ICalendarWebPartProps {
  listId: string;
}

export default class CalendarWebPart extends BaseClientSideWebPart<ICalendarWebPartProps> {

  private listNameDropdownOptions: IPropertyPaneDropdownOption[];
  private listNameDropdownDisabled: boolean = true;

  public render(): void {
    const element: React.ReactElement<ICalendarProps> = React.createElement(
      Calendar,
      {
        context: this.context,
        listId: this.properties.listId
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected onPropertyPaneConfigurationStart(): void {
    if (this.listNameDropdownOptions) {
      return;
    }
    this.context.spHttpClient
      .get(
        this.context.pageContext.web.serverRelativeUrl +
        `/_api/web/lists?$filter=BaseTemplate eq 106`,
        SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      })
      .then((data: any) => {
        if (data.error) {
          throw data.error;
        }
        this.listNameDropdownDisabled = false;
        this.listNameDropdownOptions = data.value.map((item: any) => {
          return {
            key: item.Id,
            text: item.Title
          };
        });
        this.context.propertyPane.refresh();
      });
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
                PropertyPaneDropdown('listId', {
                  label: strings.ListNameLabel,
                  options: this.listNameDropdownOptions,
                  disabled: this.listNameDropdownDisabled
                })
              ]
            }
          ]
        }
      ]
    };
  }

}
