import { createTheme } from '@fluentui/react';
import { Theme } from '@fluentui/react-theme-provider';

export const TeamsDefaultPalette = {
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

export const TeamsDefaultTheme: Theme = createTheme({
  palette: TeamsDefaultPalette,
  components: {
    DatePicker: {
      styles: {
        callout: {
          backgroundColor: TeamsDefaultPalette.black,
          color: TeamsDefaultPalette.neutralPrimary,
          selectors: {
            '.ms-DatePicker-day--infocus': { color: TeamsDefaultPalette.neutralPrimary },
            '.ms-DatePicker-day--outfocus': { color: TeamsDefaultPalette.neutralSecondary },
            '.ms-DatePicker-day--disabled': { color: TeamsDefaultPalette.neutralSecondary },
            '.ms-DatePicker-monthAndYear': { color: TeamsDefaultPalette.neutralPrimary },
            '.ms-DatePicker-weekday': { color: TeamsDefaultPalette.neutralSecondary },
            '.ms-DatePicker-monthOption': { color: TeamsDefaultPalette.neutralPrimary },
            '.ms-DatePicker-monthOption--disabled': { color: TeamsDefaultPalette.neutralSecondary },
            '.ms-DatePicker-currentYear': { color: TeamsDefaultPalette.neutralPrimary },
            '.ms-DatePicker-currentDecade': { color: TeamsDefaultPalette.neutralPrimary },
            '.ms-DatePicker-prevMonth': { color: TeamsDefaultPalette.neutralPrimary },
            '.ms-DatePicker-prevMonth--disabled': { color: TeamsDefaultPalette.neutralSecondary },
            '.ms-DatePicker-nextMonth': { color: TeamsDefaultPalette.neutralPrimary },
            '.ms-DatePicker-nextMonth--disabled': { color: TeamsDefaultPalette.neutralSecondary },
            '.ms-DatePicker-prevYear': { color: TeamsDefaultPalette.neutralPrimary },
            '.ms-DatePicker-prevYear--disabled': { color: TeamsDefaultPalette.neutralSecondary },
            '.ms-DatePicker-nextYear': { color: TeamsDefaultPalette.neutralPrimary },
            '.ms-DatePicker-nextYear--disabled': { color: TeamsDefaultPalette.neutralSecondary },
            '.ms-DatePicker-prevDecade': { color: TeamsDefaultPalette.neutralPrimary },
            '.ms-DatePicker-prevDecade--disabled': { color: TeamsDefaultPalette.neutralSecondary },
            '.ms-DatePicker-nextDecade': { color: TeamsDefaultPalette.neutralPrimary },
            '.ms-DatePicker-nextDecade--disabled': { color: TeamsDefaultPalette.neutralSecondary },
            '.ms-DatePicker-goToday': { color: TeamsDefaultPalette.neutralPrimary },
            '.ms-DatePicker-goToday[disabled]': { display: 'none' },
            '.ms-DatePicker-yearOption': { color: TeamsDefaultPalette.neutralPrimary },
            '.ms-DatePicker-yearOption--disabled': { color: TeamsDefaultPalette.neutralSecondary },
            // Today and Selected day styles
            '.ms-DatePicker-day-button.ms-DatePicker-day--today': {
              backgroundColor: TeamsDefaultPalette.themePrimary,
              color: TeamsDefaultPalette.neutralPrimary,
            },
            '.ms-DatePicker-day-button.ms-DatePicker-day--today:active': {
              backgroundColor: TeamsDefaultPalette.themePrimary,
            },
            '.ms-DatePicker-day-button.ms-DatePicker-day--today:hover': {
              color: TeamsDefaultPalette.neutralPrimary,
            },
            '.ms-DatePicker-day--highlighted': {
              backgroundColor: TeamsDefaultPalette.themeSecondary,
              color: TeamsDefaultPalette.neutralPrimary,
            },
            '.ms-DatePicker-day--highlighted > .ms-DatePicker-day-button': {
              backgroundColor: TeamsDefaultPalette.themePrimary,
            },
            '.ms-DatePicker-day--highlighted > .ms-DatePicker-day--today': {
              color: TeamsDefaultPalette.neutralPrimary,
            },
            // Hover styles
            '.ms-DatePicker-day--highlighted:hover': {
              backgroundColor: TeamsDefaultPalette.neutralLight,
              color: TeamsDefaultPalette.neutralPrimary,
            },
            '.ms-DatePicker-day--highlighted > .ms-DatePicker-day-button:hover': {
              color: TeamsDefaultPalette.neutralPrimary,
            },
            '.ms-DatePicker-day--infocus:hover': {
              backgroundColor: TeamsDefaultPalette.neutralQuaternary,
              color: TeamsDefaultPalette.neutralPrimary,
            },
            '.ms-DatePicker-day--outfocus:hover': {
              backgroundColor: TeamsDefaultPalette.neutralQuaternary,
              color: TeamsDefaultPalette.neutralPrimary,
            },
            '.ms-DatePicker-currentDecade:hover': { color: TeamsDefaultPalette.neutralPrimary },
            '.ms-DatePicker-monthAndYear:hover': { color: TeamsDefaultPalette.neutralPrimary },
            '.ms-DatePicker-weekday:hover': { color: TeamsDefaultPalette.neutralPrimary },
            '.ms-DatePicker-monthOption:hover': {
              backgroundColor: TeamsDefaultPalette.neutralQuaternary,
              color: TeamsDefaultPalette.neutralPrimary,
            },
            '.ms-DatePicker-header > .ms-DatePicker-currentYear:hover': { color: TeamsDefaultPalette.neutralPrimary },
            '.ms-DatePicker-prevMonth:hover': {
              backgroundColor: TeamsDefaultPalette.neutralQuaternary,
              color: TeamsDefaultPalette.neutralPrimary,
            },
            '.ms-DatePicker-nextMonth:hover': {
              backgroundColor: TeamsDefaultPalette.neutralQuaternary,
              color: TeamsDefaultPalette.neutralPrimary,
            },
            '.ms-DatePicker-prevYear:hover': {
              backgroundColor: TeamsDefaultPalette.neutralQuaternary,
              color: TeamsDefaultPalette.neutralPrimary,
            },
            '.ms-DatePicker-nextYear:hover': {
              color: TeamsDefaultPalette.neutralPrimary,
              backgroundColor: TeamsDefaultPalette.neutralQuaternary,
            },
            '.ms-DatePicker-prevDecade:hover': {
              backgroundColor: TeamsDefaultPalette.neutralQuaternary,
              color: TeamsDefaultPalette.neutralPrimary,
            },
            '.ms-DatePicker-nextDecade:hover': {
              backgroundColor: TeamsDefaultPalette.neutralQuaternary,
              color: TeamsDefaultPalette.neutralPrimary,
            },
            '.ms-DatePicker-goToday:hover': {
              backgroundColor: TeamsDefaultPalette.themeSecondary,
              color: TeamsDefaultPalette.neutralPrimary,
            },
            '.ms-DatePicker-yearOption:hover': {
              backgroundColor: TeamsDefaultPalette.neutralQuaternary,
              color: TeamsDefaultPalette.neutralPrimary,
            }
          }
        }
      }
    }
  }
});
