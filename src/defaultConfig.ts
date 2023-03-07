import { I18nextLng } from './i18n';
import { ColorPrimary, CompactMode, DarkMode, Theme } from './theme';

export type DefaultConfig = {
  language: I18nextLng;
  colorPrimary: ColorPrimary;
  darkMode: DarkMode;
  theme: Theme;
  compactMode: CompactMode;
};

const defaultConfig: Readonly<DefaultConfig> = {
  language: 'en-US',
  colorPrimary: ColorPrimary.green,
  darkMode: false,
  theme: Theme.light,
  compactMode: false,
};

export default defaultConfig;
