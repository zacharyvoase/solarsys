import Color, { type Coords } from 'colorjs.io';
import { atom, type SetStateAction } from 'jotai';
import { atomFamily, atomWithStorage, createJSONStorage } from 'jotai/utils';

import type { Preferences } from './preferences';
import {
  SOLARIZED_DEFAULT,
  SolarizedTheme,
  type SolarizedThemeColorName,
  type SolarizedThemeParams,
} from './solarized';

// Custom storage for SolarizedTheme that handles Color object serialization
export const ThemeStorage = createJSONStorage<SolarizedTheme>(
  () => localStorage,
  {
    reviver: (_key, value) => {
      // Check if this is a color property by looking at the value structure
      if (
        value &&
        typeof value === 'object' &&
        'spaceId' in value &&
        'coords' in value &&
        'alpha' in value &&
        !('base03' in value) // Make sure it's not the root theme object
      ) {
        // Reconstruct Color object from serialized data
        return new Color(
          value.spaceId as string,
          value.coords as Coords,
          value.alpha as number
        );
      }

      // Check if this is the root theme object (has all color properties)
      if (
        value &&
        typeof value === 'object' &&
        'base03' in value &&
        'base02' in value &&
        'yellow' in value
      ) {
        // All color properties should already be revived by this point
        // So we can construct a SolarizedTheme instance
        return new SolarizedTheme(value as SolarizedThemeParams);
      }

      return value;
    },
    replacer: (_key, value) => {
      // Serialize Color objects to a plain object format
      if (value instanceof Color) {
        return value.toJSON();
      }
      // Handle SolarizedTheme instances
      if (value instanceof SolarizedTheme) {
        const params: SolarizedThemeParams = {
          base03: value.base03,
          base02: value.base02,
          base01: value.base01,
          base00: value.base00,
          base0: value.base0,
          base1: value.base1,
          base2: value.base2,
          base3: value.base3,
          yellow: value.yellow,
          orange: value.orange,
          red: value.red,
          magenta: value.magenta,
          violet: value.violet,
          blue: value.blue,
          cyan: value.cyan,
          green: value.green,
        };
        return params;
      }
      return value;
    },
  }
);

export const themeAtom = atomWithStorage<SolarizedTheme>(
  'theme',
  SOLARIZED_DEFAULT,
  ThemeStorage,
  { getOnInit: true }
);

export const singleColorAtomFamily = atomFamily(
  (colorName: SolarizedThemeColorName) =>
    atom(
      (get) => get(themeAtom).get(colorName),
      (get, set, newColor: SetStateAction<Color>) => {
        const preferences = get(preferencesAtom);
        set(themeAtom, (theme) =>
          theme.set(
            colorName,
            typeof newColor === 'function'
              ? newColor(theme.get(colorName))
              : newColor,
            preferences
          )
        );
      }
    )
);

export const selectedColorAtom = atom<SolarizedThemeColorName | null>(null);

export const preferencesAtom = atomWithStorage<Preferences>(
  'preferences',
  {
    linkDarkHues: false,
    linkLightHues: false,
    linkColorLightness: false,
  },
  undefined,
  { getOnInit: true }
);
