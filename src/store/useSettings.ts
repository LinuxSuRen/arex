import { create } from 'zustand';

export const HoppBgColors = ['system', 'light', 'dark', 'black'] as const;

export type HoppBgColor = typeof HoppBgColors[number];

export const HoppAccentColors = [
  'green',
  'teal',
  'blue',
  'indigo',
  'purple',
  'yellow',
  'orange',
  'red',
  'pink',
] as const;

export type HoppAccentColor = typeof HoppAccentColors[number];

export const HoppFontSizes = ['small', 'medium', 'large'] as const;

export type HoppFontSize = typeof HoppFontSizes[number];

export type SettingsDef = {
  syncCollections: boolean;
  syncHistory: boolean;
  syncEnvironments: boolean;

  PROXY_ENABLED: boolean;
  PROXY_URL: string;
  EXTENSIONS_ENABLED: boolean;
  URL_EXCLUDES: {
    auth: boolean;
    httpUser: boolean;
    httpPassword: boolean;
    bearerToken: boolean;
    oauth2Token: boolean;
  };
  THEME_COLOR: HoppAccentColor;
  BG_COLOR: HoppBgColor;
  TELEMETRY_ENABLED: boolean;
  EXPAND_NAVIGATION: boolean;
  SIDEBAR: boolean;
  SIDEBAR_ON_LEFT: boolean;
  ZEN_MODE: boolean;
  FONT_SIZE: HoppFontSize;
  COLUMN_LAYOUT: boolean;
};

const initialState: SettingsDef = {
  syncCollections: true,
  syncHistory: true,
  syncEnvironments: true,

  PROXY_ENABLED: false,
  PROXY_URL: 'https://proxy.hoppscotch.io/',
  EXTENSIONS_ENABLED: false,
  URL_EXCLUDES: {
    auth: true,
    httpUser: true,
    httpPassword: true,
    bearerToken: true,
    oauth2Token: true,
  },
  THEME_COLOR: 'indigo',
  BG_COLOR: 'system',
  TELEMETRY_ENABLED: true,
  EXPAND_NAVIGATION: true,
  SIDEBAR: true,
  SIDEBAR_ON_LEFT: true,
  ZEN_MODE: false,
  FONT_SIZE: 'small',
  COLUMN_LAYOUT: true,
};

export interface CollectionAction {
  applySetting: (payload: any) => void;
}

const useSettings = create<{ properties: SettingsDef } & CollectionAction>(
  (set, get) => {
    async function applySetting(payload: any) {
      set({ properties: payload });
    }

    return {
      // State,
      // ...initialState,
      properties: initialState,
      // Action
      applySetting: applySetting,
    };
  }
);

export default useSettings;
