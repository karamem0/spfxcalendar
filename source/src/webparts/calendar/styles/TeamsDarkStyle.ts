import * as Fluent from '@fluentui/react';

import { IStyle } from './IStyle';

export class TeamsDarkStyle implements IStyle {

  public Palette = {
    themePrimary: '#6264a7',
    themeLighterAlt: '#040407',
    themeLighter: '#10101b',
    themeLight: '#1d1e32',
    themeTertiary: '#3b3c63',
    themeSecondary: '#565892',
    themeDarkAlt: '#6e70af',
    themeDark: '#8183bb',
    themeDarker: '#9ea0cd',
    neutralLighterAlt: '#0b0b0b',
    neutralLighter: '#151515',
    neutralLight: '#252525',
    neutralQuaternaryAlt: '#2f2f2f',
    neutralQuaternary: '#373737',
    neutralTertiaryAlt: '#595959',
    neutralTertiary: '#c8c8c8',
    neutralSecondary: '#d0d0d0',
    neutralPrimaryAlt: '#dadada',
    neutralPrimary: '#ffffff',
    neutralDark: '#f4f4f4',
    black: '#f8f8f8',
    white: '#000000'
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
