import * as Fluent from '@fluentui/react';

export interface IStyle {
  Palette?: Fluent.IPalette | Partial<Fluent.IPalette>;
  Theme?: Fluent.ITheme | Partial<Fluent.ITheme>;
  Customizations?: Fluent.ICustomizations | Partial<Fluent.ICustomizations>;
  DatePickerStyles?: Fluent.IDatePickerStyles | Partial<Fluent.IDatePickerStyles>;
}
