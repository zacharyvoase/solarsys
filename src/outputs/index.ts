import { alacrittyDarkExporter, alacrittyLightExporter } from './alacritty';
import { ghosttyDarkExporter, ghosttyLightExporter } from './ghostty';
import { iterm2DarkExporter, iterm2LightExporter } from './iterm2';
import { jsonSimpleExporter, jsonDetailedExporter } from './json';
import { kittyDarkExporter, kittyLightExporter } from './kitty';
import type { ExporterCategory } from './types';
import { vscodeDarkExporter, vscodeLightExporter } from './vscode';
import { weztermDarkExporter, weztermLightExporter } from './wezterm';

export * from './types';

export const EXPORTER_CATEGORIES: ExporterCategory[] = [
  {
    id: 'data',
    name: 'Data Formats',
    exporters: [jsonSimpleExporter, jsonDetailedExporter],
  },
  {
    id: 'editors',
    name: 'Code Editors',
    exporters: [vscodeDarkExporter, vscodeLightExporter],
  },
  {
    id: 'terminals',
    name: 'Terminal Emulators',
    exporters: [
      ghosttyDarkExporter,
      ghosttyLightExporter,
      iterm2DarkExporter,
      iterm2LightExporter,
      alacrittyDarkExporter,
      alacrittyLightExporter,
      kittyDarkExporter,
      kittyLightExporter,
      weztermDarkExporter,
      weztermLightExporter,
    ],
  },
];
