import { createTheme } from '@fluentui/react';
import { Theme } from '@fluentui/react-theme-provider';

export const TeamsDarkPalette = {
  themePrimary: '#6264a7',
  themeLighterAlt: '#f7f7fb',
  themeLighter: '#e1e1f1',
  themeLight: '#c8c9e4',
  themeTertiary: '#989ac9',
  themeSecondary: '#7173b0',
  themeDarkAlt: '#585a95',
  themeDark: '#4a4c7e',
  themeDarker: '#37385d',
  neutralLighterAlt: '#201f1f',
  neutralLighter: '#201f1f',
  neutralLight: '#1e1e1e',
  neutralQuaternaryAlt: '#1c1b1b',
  neutralQuaternary: '#1b1a1a',
  neutralTertiaryAlt: '#1a1919',
  neutralTertiary: '#c8c8c8',
  neutralSecondary: '#d0d0d0',
  neutralPrimaryAlt: '#dadada',
  neutralPrimary: '#ffffff',
  neutralDark: '#f4f4f4',
  black: '#f8f8f8',
  white: '#201f1f'
};

export const TeamsDarkTheme: Theme = createTheme({
  palette: TeamsDarkPalette,
  components: {
    DatePicker: {
      styles: {
        callout: {
          backgroundColor: TeamsDarkPalette.black,
          color: TeamsDarkPalette.neutralPrimary,
          selectors: {
            '.ms-DatePicker-day--infocus': { color: TeamsDarkPalette.neutralPrimary },
            '.ms-DatePicker-day--outfocus': { color: TeamsDarkPalette.neutralSecondary },
            '.ms-DatePicker-day--disabled': { color: TeamsDarkPalette.neutralSecondary },
            '.ms-DatePicker-monthAndYear': { color: TeamsDarkPalette.neutralPrimary },
            '.ms-DatePicker-weekday': { color: TeamsDarkPalette.neutralSecondary },
            '.ms-DatePicker-monthOption': { color: TeamsDarkPalette.neutralPrimary },
            '.ms-DatePicker-monthOption--disabled': { color: TeamsDarkPalette.neutralSecondary },
            '.ms-DatePicker-currentYear': { color: TeamsDarkPalette.neutralPrimary },
            '.ms-DatePicker-currentDecade': { color: TeamsDarkPalette.neutralPrimary },
            '.ms-DatePicker-prevMonth': { color: TeamsDarkPalette.neutralPrimary },
            '.ms-DatePicker-prevMonth--disabled': { color: TeamsDarkPalette.neutralSecondary },
            '.ms-DatePicker-nextMonth': { color: TeamsDarkPalette.neutralPrimary },
            '.ms-DatePicker-nextMonth--disabled': { color: TeamsDarkPalette.neutralSecondary },
            '.ms-DatePicker-prevYear': { color: TeamsDarkPalette.neutralPrimary },
            '.ms-DatePicker-prevYear--disabled': { color: TeamsDarkPalette.neutralSecondary },
            '.ms-DatePicker-nextYear': { color: TeamsDarkPalette.neutralPrimary },
            '.ms-DatePicker-nextYear--disabled': { color: TeamsDarkPalette.neutralSecondary },
            '.ms-DatePicker-prevDecade': { color: TeamsDarkPalette.neutralPrimary },
            '.ms-DatePicker-prevDecade--disabled': { color: TeamsDarkPalette.neutralSecondary },
            '.ms-DatePicker-nextDecade': { color: TeamsDarkPalette.neutralPrimary },
            '.ms-DatePicker-nextDecade--disabled': { color: TeamsDarkPalette.neutralSecondary },
            '.ms-DatePicker-goToday': { color: TeamsDarkPalette.neutralPrimary },
            '.ms-DatePicker-goToday[disabled]': { display: 'none' },
            '.ms-DatePicker-yearOption': { color: TeamsDarkPalette.neutralPrimary },
            '.ms-DatePicker-yearOption--disabled': { color: TeamsDarkPalette.neutralSecondary },
            // Today and Selected day styles
            '.ms-DatePicker-day-button.ms-DatePicker-day--today': {
              backgroundColor: TeamsDarkPalette.themePrimary,
              color: TeamsDarkPalette.neutralPrimary,
            },
            '.ms-DatePicker-day-button.ms-DatePicker-day--today:active': {
              backgroundColor: TeamsDarkPalette.themePrimary,
            },
            '.ms-DatePicker-day-button.ms-DatePicker-day--today:hover': {
              color: TeamsDarkPalette.neutralPrimary,
            },
            '.ms-DatePicker-day--highlighted': {
              backgroundColor: TeamsDarkPalette.themeSecondary,
              color: TeamsDarkPalette.neutralPrimary,
            },
            '.ms-DatePicker-day--highlighted > .ms-DatePicker-day-button': {
              backgroundColor: TeamsDarkPalette.themePrimary,
            },
            '.ms-DatePicker-day--highlighted > .ms-DatePicker-day--today': {
              color: TeamsDarkPalette.neutralPrimary,
            },
            // Hover styles
            '.ms-DatePicker-day--highlighted:hover': {
              backgroundColor: TeamsDarkPalette.neutralLight,
              color: TeamsDarkPalette.neutralPrimary,
            },
            '.ms-DatePicker-day--highlighted > .ms-DatePicker-day-button:hover': {
              color: TeamsDarkPalette.neutralPrimary,
            },
            '.ms-DatePicker-day--infocus:hover': {
              backgroundColor: TeamsDarkPalette.neutralQuaternary,
              color: TeamsDarkPalette.neutralPrimary,
            },
            '.ms-DatePicker-day--outfocus:hover': {
              backgroundColor: TeamsDarkPalette.neutralQuaternary,
              color: TeamsDarkPalette.neutralPrimary,
            },
            '.ms-DatePicker-currentDecade:hover': { color: TeamsDarkPalette.neutralPrimary },
            '.ms-DatePicker-monthAndYear:hover': { color: TeamsDarkPalette.neutralPrimary },
            '.ms-DatePicker-weekday:hover': { color: TeamsDarkPalette.neutralPrimary },
            '.ms-DatePicker-monthOption:hover': {
              backgroundColor: TeamsDarkPalette.neutralQuaternary,
              color: TeamsDarkPalette.neutralPrimary,
            },
            '.ms-DatePicker-header > .ms-DatePicker-currentYear:hover': { color: TeamsDarkPalette.neutralPrimary },
            '.ms-DatePicker-prevMonth:hover': {
              backgroundColor: TeamsDarkPalette.neutralQuaternary,
              color: TeamsDarkPalette.neutralPrimary,
            },
            '.ms-DatePicker-nextMonth:hover': {
              backgroundColor: TeamsDarkPalette.neutralQuaternary,
              color: TeamsDarkPalette.neutralPrimary,
            },
            '.ms-DatePicker-prevYear:hover': {
              backgroundColor: TeamsDarkPalette.neutralQuaternary,
              color: TeamsDarkPalette.neutralPrimary,
            },
            '.ms-DatePicker-nextYear:hover': {
              color: TeamsDarkPalette.neutralPrimary,
              backgroundColor: TeamsDarkPalette.neutralQuaternary,
            },
            '.ms-DatePicker-prevDecade:hover': {
              backgroundColor: TeamsDarkPalette.neutralQuaternary,
              color: TeamsDarkPalette.neutralPrimary,
            },
            '.ms-DatePicker-nextDecade:hover': {
              backgroundColor: TeamsDarkPalette.neutralQuaternary,
              color: TeamsDarkPalette.neutralPrimary,
            },
            '.ms-DatePicker-goToday:hover': {
              backgroundColor: TeamsDarkPalette.themeSecondary,
              color: TeamsDarkPalette.neutralPrimary,
            },
            '.ms-DatePicker-yearOption:hover': {
              backgroundColor: TeamsDarkPalette.neutralQuaternary,
              color: TeamsDarkPalette.neutralPrimary,
            }
          }
        }
      }
    }
  }
});
