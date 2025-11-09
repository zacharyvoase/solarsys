import type Color from 'colorjs.io';
import { atom, type SetStateAction } from 'jotai';
import { atomFamily } from 'jotai/utils';

import type { Preferences } from './preferences';
import {
  SOLARIZED_DEFAULT,
  type SolarizedTheme,
  type SolarizedThemeColorName,
} from './solarized';

export const themeAtom = atom<SolarizedTheme>(SOLARIZED_DEFAULT);

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

export const preferencesAtom = atom<Preferences>({
  linkDarkHues: false,
  linkLightHues: false,
  linkColorLightness: false,
});
