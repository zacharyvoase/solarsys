import { apcachToCss, apcach, crToBg } from 'apcach';
import Color from 'colorjs.io';

import type { Preferences } from './preferences';

export interface SolarizedThemeParams {
  base03: Color;
  base02: Color;
  base01: Color;
  base00: Color;
  base0: Color;
  base1: Color;
  base2: Color;
  base3: Color;
  yellow: Color;
  orange: Color;
  red: Color;
  magenta: Color;
  violet: Color;
  blue: Color;
  cyan: Color;
  green: Color;
}

export type SolarizedThemeColorName = keyof SolarizedThemeParams;

export type SolarizedThemeSlot =
  | 'darkBg'
  | 'darkFg'
  | 'darkHighlight'
  | 'darkEmphasis'
  | 'darkSecondary'
  | 'lightBg'
  | 'lightFg'
  | 'lightHighlight'
  | 'lightEmphasis'
  | 'lightSecondary';

export const DARK_NAMES: SolarizedThemeColorName[] = [
  'base03',
  'base02',
  'base01',
  'base00',
  'base0',
  'base1',
];

export const LIGHT_NAMES: SolarizedThemeColorName[] = ['base3', 'base2'];

export const COLOR_NAMES: SolarizedThemeColorName[] = [
  'yellow',
  'orange',
  'red',
  'magenta',
  'violet',
  'blue',
  'cyan',
  'green',
];

export class SolarizedTheme implements SolarizedThemeParams {
  public readonly base03: Color;
  public readonly base02: Color;
  public readonly base01: Color;
  public readonly base00: Color;
  public readonly base0: Color;
  public readonly base1: Color;
  public readonly base2: Color;
  public readonly base3: Color;
  public readonly yellow: Color;
  public readonly orange: Color;
  public readonly red: Color;
  public readonly magenta: Color;
  public readonly violet: Color;
  public readonly blue: Color;
  public readonly cyan: Color;
  public readonly green: Color;

  constructor(params: SolarizedThemeParams) {
    this.base03 = params.base03;
    this.base02 = params.base02;
    this.base01 = params.base01;
    this.base00 = params.base00;
    this.base0 = params.base0;
    this.base1 = params.base1;
    this.base2 = params.base2;
    this.base3 = params.base3;
    this.yellow = params.yellow;
    this.orange = params.orange;
    this.red = params.red;
    this.magenta = params.magenta;
    this.violet = params.violet;
    this.blue = params.blue;
    this.cyan = params.cyan;
    this.green = params.green;
  }

  get darkBg() {
    return this.base03;
  }
  get darkFg() {
    return this.base0;
  }
  get darkHighlight() {
    return this.base02;
  }
  get darkEmphasis() {
    return this.base1;
  }
  get darkSecondary() {
    return this.base01;
  }

  get lightBg() {
    return this.base3;
  }
  get lightFg() {
    return this.base00;
  }
  get lightHighlight() {
    return this.base2;
  }
  get lightEmphasis() {
    return this.base01;
  }
  get lightSecondary() {
    return this.base1;
  }

  bg(mode: 'dark' | 'light'): Color {
    return mode === 'dark' ? this.darkBg : this.lightBg;
  }

  fg(mode: 'dark' | 'light'): Color {
    return mode === 'dark' ? this.darkFg : this.lightFg;
  }

  highlight(mode: 'dark' | 'light'): Color {
    return mode === 'dark' ? this.darkHighlight : this.lightHighlight;
  }

  secondary(mode: 'dark' | 'light'): Color {
    return mode === 'dark' ? this.darkSecondary : this.lightSecondary;
  }

  emphasis(mode: 'dark' | 'light'): Color {
    return mode === 'dark' ? this.darkEmphasis : this.lightEmphasis;
  }

  get(colorName: keyof SolarizedTheme | SolarizedThemeSlot): Color {
    return this[colorName] as Color;
  }

  set(
    colorName: SolarizedThemeColorName,
    newColor: Color,
    preferences?: Preferences
  ): SolarizedTheme {
    const newTheme = { ...this, [colorName]: newColor } as SolarizedThemeParams;
    if (preferences?.linkDarkHues && DARK_NAMES.includes(colorName)) {
      for (const darkHue of DARK_NAMES) {
        if (darkHue !== colorName) {
          newTheme[darkHue] = (newTheme[darkHue] as Color)
            .to(newColor.space)
            .set('h', newColor.h!);
        }
      }
    } else if (preferences?.linkLightHues && LIGHT_NAMES.includes(colorName)) {
      for (const lightHue of LIGHT_NAMES) {
        if (lightHue !== colorName) {
          newTheme[lightHue] = (newTheme[lightHue] as Color)
            .to(newColor.space)
            .set('h', newColor.h!);
        }
      }
    } else if (
      preferences?.linkColorLightness &&
      COLOR_NAMES.includes(colorName)
    ) {
      for (const colorHue of COLOR_NAMES) {
        if (colorHue !== colorName) {
          newTheme[colorHue] = (newTheme[colorHue] as Color)
            .to(newColor.space)
            .set('l', newColor.l!);
        }
      }
    }
    return new SolarizedTheme(newTheme);
  }
}

// The L*A*B* values from Solarized itself
export const SOLARIZED_DEFAULT: SolarizedTheme = new SolarizedTheme({
  base03: new Color('lab', [15, -12, -12]),
  base02: new Color('lab', [20, -12, -12]),
  base01: new Color('lab', [45, -7, -7]),
  base00: new Color('lab', [50, -7, -7]),
  base0: new Color('lab', [60, -6, -3]),
  base1: new Color('lab', [65, -5, -2]),
  base2: new Color('lab', [92, 0, 10]),
  base3: new Color('lab', [97, 0, 10]),
  yellow: new Color('lab', [60, 10, 65]),
  orange: new Color('lab', [50, 50, 55]),
  red: new Color('lab', [50, 65, 45]),
  magenta: new Color('lab', [50, 65, -5]),
  violet: new Color('lab', [50, 15, -45]),
  blue: new Color('lab', [55, -10, -45]),
  cyan: new Color('lab', [60, -35, -5]),
  green: new Color('lab', [60, -20, 65]),
});

export function clampAndRoundComponent(
  component: 'hue' | 'saturation' | 'lightness' | 'value',
  v: number
) {
  if (component === 'hue') {
    let hv = v % 360;
    if (hv < 0) {
      hv += 360;
    }
    return Math.round(hv);
  } else {
    return Math.round(Math.min(Math.max(v, 0), 1) * 1000) / 1000;
  }
}

export function clampAndRound(color: Color) {
  if (color.spaceId === 'okhsl') {
    return new Color('okhsl', [
      clampAndRoundComponent('hue', color.h!),
      clampAndRoundComponent('saturation', color.s!),
      clampAndRoundComponent('lightness', color.l!),
    ]);
  } else if (color.spaceId === 'okhsv') {
    return new Color('okhsv', [
      clampAndRoundComponent('hue', color.h!),
      clampAndRoundComponent('saturation', color.s!),
      clampAndRoundComponent('value', color.v!),
    ]);
  } else {
    return color;
  }
}

export function getFgColor(bgColor: Color): Color {
  return new Color(
    apcachToCss(apcach(crToBg(bgColor.to('srgb').toString(), 80), 0, 0))
  );
}
