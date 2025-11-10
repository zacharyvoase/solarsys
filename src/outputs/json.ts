import type { SolarizedTheme, SolarizedThemeColorName } from '../solarized';
import type { ExporterConfig } from './types';

const COLOR_NAMES: SolarizedThemeColorName[] = [
  'base03',
  'base02',
  'base01',
  'base00',
  'base0',
  'base1',
  'base2',
  'base3',
  'yellow',
  'orange',
  'red',
  'magenta',
  'violet',
  'blue',
  'cyan',
  'green',
];

function exportSimpleJSON(theme: SolarizedTheme): string {
  const colors: Record<string, string> = {};
  for (const name of COLOR_NAMES) {
    colors[name] = theme.get(name).to('srgb').toString({ format: 'hex' });
  }
  return JSON.stringify(colors, null, 2);
}

function exportDetailedJSON(theme: SolarizedTheme, themeName: string): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: Record<string, any> = {
    name: themeName,
    colors: {},
    ansiColors: {
      dark: {},
      light: {},
    },
  };

  // All colors with multiple formats
  for (const name of COLOR_NAMES) {
    const color = theme.get(name);
    result.colors[name] = {
      hex: color.to('srgb').toString({ format: 'hex' }),
      rgb: color.to('srgb').toString(),
      oklch: color.to('oklch').toString(),
    };
  }

  // ANSI color mappings for terminals
  result.ansiColors.dark = {
    black: theme.base02.to('srgb').toString({ format: 'hex' }),
    red: theme.red.to('srgb').toString({ format: 'hex' }),
    green: theme.green.to('srgb').toString({ format: 'hex' }),
    yellow: theme.yellow.to('srgb').toString({ format: 'hex' }),
    blue: theme.blue.to('srgb').toString({ format: 'hex' }),
    magenta: theme.magenta.to('srgb').toString({ format: 'hex' }),
    cyan: theme.cyan.to('srgb').toString({ format: 'hex' }),
    white: theme.base2.to('srgb').toString({ format: 'hex' }),
    brightBlack: theme.base03.to('srgb').toString({ format: 'hex' }),
    brightRed: theme.orange.to('srgb').toString({ format: 'hex' }),
    brightGreen: theme.base01.to('srgb').toString({ format: 'hex' }),
    brightYellow: theme.base00.to('srgb').toString({ format: 'hex' }),
    brightBlue: theme.base0.to('srgb').toString({ format: 'hex' }),
    brightMagenta: theme.violet.to('srgb').toString({ format: 'hex' }),
    brightCyan: theme.base1.to('srgb').toString({ format: 'hex' }),
    brightWhite: theme.base3.to('srgb').toString({ format: 'hex' }),
  };

  result.ansiColors.light = {
    black: theme.base2.to('srgb').toString({ format: 'hex' }),
    red: theme.red.to('srgb').toString({ format: 'hex' }),
    green: theme.green.to('srgb').toString({ format: 'hex' }),
    yellow: theme.yellow.to('srgb').toString({ format: 'hex' }),
    blue: theme.blue.to('srgb').toString({ format: 'hex' }),
    magenta: theme.magenta.to('srgb').toString({ format: 'hex' }),
    cyan: theme.cyan.to('srgb').toString({ format: 'hex' }),
    white: theme.base02.to('srgb').toString({ format: 'hex' }),
    brightBlack: theme.base3.to('srgb').toString({ format: 'hex' }),
    brightRed: theme.orange.to('srgb').toString({ format: 'hex' }),
    brightGreen: theme.base1.to('srgb').toString({ format: 'hex' }),
    brightYellow: theme.base00.to('srgb').toString({ format: 'hex' }),
    brightBlue: theme.base0.to('srgb').toString({ format: 'hex' }),
    brightMagenta: theme.violet.to('srgb').toString({ format: 'hex' }),
    brightCyan: theme.base01.to('srgb').toString({ format: 'hex' }),
    brightWhite: theme.base03.to('srgb').toString({ format: 'hex' }),
  };

  return JSON.stringify(result, null, 2);
}

export const jsonSimpleExporter: ExporterConfig = {
  id: 'json-simple',
  name: 'JSON (Simple)',
  description: 'Simple color name to hex mapping',
  fileExtension: 'json',
  fileName: 'solarized-colors.json',
  export: exportSimpleJSON,
};

export const jsonDetailedExporter: ExporterConfig = {
  id: 'json-detailed',
  name: 'JSON (Detailed)',
  description: 'Complete color data with multiple formats and ANSI mappings',
  fileExtension: 'json',
  fileName: 'solarized-theme.json',
  export: exportDetailedJSON,
};
