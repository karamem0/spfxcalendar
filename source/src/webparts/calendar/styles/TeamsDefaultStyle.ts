import * as Fluent from '@fluentui/react';

import { IStyle } from './IStyle';

export class TeamsDefaultStyle implements IStyle {

  public Palette = {
    themePrimary: '#6264a7',
    themeLighterAlt: '#f7f7fb',
    themeLighter: '#e1e1f1',
    themeLight: '#c8c9e4',
    themeTertiary: '#989ac9',
    themeSecondary: '#7173b0',
    themeDarkAlt: '#585a95',
    themeDark: '#4a4c7e',
    themeDarker: '#37385d',
    neutralLighterAlt: '#faf9f8',
    neutralLighter: '#f3f2f1',
    neutralLight: '#edebe9',
    neutralQuaternaryAlt: '#e1dfdd',
    neutralQuaternary: '#d0d0d0',
    neutralTertiaryAlt: '#c8c6c4',
    neutralTertiary: '#c8c6c4',
    neutralSecondary: '#918e8c',
    neutralPrimaryAlt: '#5d5b58',
    neutralPrimary: '#484644',
    neutralDark: '#363533',
    black: '#282726',
    white: '#ffffff'
  };

  public Theme = Fluent.createTheme({
    palette: this.Palette
  });

  public Customizations = {
    settings: {
      theme: this.Theme
    },
    scopedSettings: {}
  };

  public DatePickerStyles = {
    callout: {
      backgroundColor: this.Theme.palette.black,
      color: this.Theme.palette.neutralPrimary,
      selectors: {
        '.ms-DatePicker-day--infocus': { color: this.Theme.palette.neutralPrimary },
        '.ms-DatePicker-day--outfocus': { color: this.Theme.palette.neutralSecondary },
        '.ms-DatePicker-day--disabled': { color: this.Theme.palette.neutralSecondary },
        '.ms-DatePicker-monthAndYear': { color: this.Theme.palette.neutralPrimary },
        '.ms-DatePicker-weekday': { color: this.Theme.palette.neutralSecondary },
        '.ms-DatePicker-monthOption': { color: this.Theme.palette.neutralPrimary },
        '.ms-DatePicker-monthOption--disabled': { color: this.Theme.palette.neutralSecondary },
        '.ms-DatePicker-currentYear': { color: this.Theme.palette.neutralPrimary },
        '.ms-DatePicker-currentDecade': { color: this.Theme.palette.neutralPrimary },
        '.ms-DatePicker-prevMonth': { color: this.Theme.palette.neutralPrimary },
        '.ms-DatePicker-prevMonth--disabled': { color: this.Theme.palette.neutralSecondary },
        '.ms-DatePicker-nextMonth': { color: this.Theme.palette.neutralPrimary },
        '.ms-DatePicker-nextMonth--disabled': { color: this.Theme.palette.neutralSecondary },
        '.ms-DatePicker-prevYear': { color: this.Theme.palette.neutralPrimary },
        '.ms-DatePicker-prevYear--disabled': { color: this.Theme.palette.neutralSecondary },
        '.ms-DatePicker-nextYear': { color: this.Theme.palette.neutralPrimary },
        '.ms-DatePicker-nextYear--disabled': { color: this.Theme.palette.neutralSecondary },
        '.ms-DatePicker-prevDecade': { color: this.Theme.palette.neutralPrimary },
        '.ms-DatePicker-prevDecade--disabled': { color: this.Theme.palette.neutralSecondary },
        '.ms-DatePicker-nextDecade': { color: this.Theme.palette.neutralPrimary },
        '.ms-DatePicker-nextDecade--disabled': { color: this.Theme.palette.neutralSecondary },
        '.ms-DatePicker-goToday': { color: this.Theme.palette.neutralPrimary },
        '.ms-DatePicker-goToday[disabled]': { display: 'none' },
        '.ms-DatePicker-yearOption': { color: this.Theme.palette.neutralPrimary },
        '.ms-DatePicker-yearOption--disabled': { color: this.Theme.palette.neutralSecondary },
        // Today and Selected day styles
        '.ms-DatePicker-day-button.ms-DatePicker-day--today': {
          backgroundColor: this.Theme.palette.themePrimary,
          color: this.Theme.palette.neutralPrimary,
        },
        '.ms-DatePicker-day-button.ms-DatePicker-day--today:active': {
          backgroundColor: this.Theme.palette.themePrimary,
        },
        '.ms-DatePicker-day-button.ms-DatePicker-day--today:hover': {
          color: this.Theme.palette.neutralPrimary,
        },
        '.ms-DatePicker-day--highlighted': {
          backgroundColor: this.Theme.palette.themeSecondary,
          color: this.Theme.palette.neutralPrimary,
        },
        '.ms-DatePicker-day--highlighted > .ms-DatePicker-day-button': {
          backgroundColor: this.Theme.palette.themePrimary,
        },
        '.ms-DatePicker-day--highlighted > .ms-DatePicker-day--today': {
          color: this.Theme.palette.neutralPrimary,
        },
        // Hover styles
        '.ms-DatePicker-day--highlighted:hover': {
          backgroundColor: this.Theme.semanticColors.listItemBackgroundChecked,
          color: this.Theme.palette.neutralPrimary,
        },
        '.ms-DatePicker-day--highlighted > .ms-DatePicker-day-button:hover': {
          color: this.Theme.palette.neutralPrimary,
        },
        '.ms-DatePicker-day--infocus:hover': {
          backgroundColor: this.Theme.palette.neutralQuaternary,
          color: this.Theme.palette.neutralPrimary,
        },
        '.ms-DatePicker-day--outfocus:hover': {
          backgroundColor: this.Theme.palette.neutralQuaternary,
          color: this.Theme.palette.neutralPrimary,
        },
        '.ms-DatePicker-currentDecade:hover': { color: this.Theme.palette.neutralPrimary },
        '.ms-DatePicker-monthAndYear:hover': { color: this.Theme.palette.neutralPrimary },
        '.ms-DatePicker-weekday:hover': { color: this.Theme.palette.neutralPrimary },
        '.ms-DatePicker-monthOption:hover': {
          backgroundColor: this.Theme.palette.neutralQuaternary,
          color: this.Theme.palette.neutralPrimary,
        },
        '.ms-DatePicker-header > .ms-DatePicker-currentYear:hover': { color: this.Theme.palette.neutralPrimary },
        '.ms-DatePicker-prevMonth:hover': {
          backgroundColor: this.Theme.palette.neutralQuaternary,
          color: this.Theme.palette.neutralPrimary,
        },
        '.ms-DatePicker-nextMonth:hover': {
          backgroundColor: this.Theme.palette.neutralQuaternary,
          color: this.Theme.palette.neutralPrimary,
        },
        '.ms-DatePicker-prevYear:hover': {
          backgroundColor: this.Theme.palette.neutralQuaternary,
          color: this.Theme.palette.neutralPrimary,
        },
        '.ms-DatePicker-nextYear:hover': {
          color: this.Theme.palette.neutralPrimary,
          backgroundColor: this.Theme.palette.neutralQuaternary,
        },
        '.ms-DatePicker-prevDecade:hover': {
          backgroundColor: this.Theme.palette.neutralQuaternary,
          color: this.Theme.palette.neutralPrimary,
        },
        '.ms-DatePicker-nextDecade:hover': {
          backgroundColor: this.Theme.palette.neutralQuaternary,
          color: this.Theme.palette.neutralPrimary,
        },
        '.ms-DatePicker-goToday:hover': {
          backgroundColor: this.Theme.palette.themeSecondary,
          color: this.Theme.palette.neutralPrimary,
        },
        '.ms-DatePicker-yearOption:hover': {
          backgroundColor: this.Theme.palette.neutralQuaternary,
          color: this.Theme.palette.neutralPrimary,
        }
      }
    }
  };

}
