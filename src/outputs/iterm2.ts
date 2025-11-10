import Color from 'colorjs.io';

import type { SolarizedTheme } from '../solarized';
import type { ExporterConfig } from './types';

interface RGB {
  r: number;
  g: number;
  b: number;
}

function toRGB(color: Color): RGB {
  const srgb = color.to('srgb');
  return {
    r: srgb.r ?? 0,
    g: srgb.g ?? 0,
    b: srgb.b ?? 0,
  };
}

function colorToXML(name: string, rgb: RGB): string {
  return `\t<key>${name}</key>
\t<dict>
\t\t<key>Alpha Component</key>
\t\t<real>1</real>
\t\t<key>Blue Component</key>
\t\t<real>${rgb.b.toFixed(6)}</real>
\t\t<key>Color Space</key>
\t\t<string>sRGB</string>
\t\t<key>Green Component</key>
\t\t<real>${rgb.g.toFixed(6)}</real>
\t\t<key>Red Component</key>
\t\t<real>${rgb.r.toFixed(6)}</real>
\t</dict>`;
}

function exportITerm2Dark(theme: SolarizedTheme): string {
  const colors = {
    'Background Color': toRGB(theme.base03),
    'Foreground Color': toRGB(theme.base0),
    'Bold Color': toRGB(theme.base1),
    'Cursor Color': toRGB(theme.base1),
    'Cursor Text Color': toRGB(theme.base03),
    'Selection Color': toRGB(theme.base02),
    'Selected Text Color': toRGB(theme.base1),
    'Ansi 0 Color': toRGB(theme.base02),
    'Ansi 1 Color': toRGB(theme.red),
    'Ansi 2 Color': toRGB(theme.green),
    'Ansi 3 Color': toRGB(theme.yellow),
    'Ansi 4 Color': toRGB(theme.blue),
    'Ansi 5 Color': toRGB(theme.magenta),
    'Ansi 6 Color': toRGB(theme.cyan),
    'Ansi 7 Color': toRGB(theme.base2),
    'Ansi 8 Color': toRGB(theme.base03),
    'Ansi 9 Color': toRGB(theme.orange),
    'Ansi 10 Color': toRGB(theme.base01),
    'Ansi 11 Color': toRGB(theme.base00),
    'Ansi 12 Color': toRGB(theme.base0),
    'Ansi 13 Color': toRGB(theme.violet),
    'Ansi 14 Color': toRGB(theme.base1),
    'Ansi 15 Color': toRGB(theme.base3),
  };

  const entries = Object.entries(colors)
    .map(([name, rgb]) => colorToXML(name, rgb))
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
${entries}
</dict>
</plist>
`;
}

function exportITerm2Light(theme: SolarizedTheme): string {
  const colors = {
    'Background Color': toRGB(theme.base3),
    'Foreground Color': toRGB(theme.base00),
    'Bold Color': toRGB(theme.base01),
    'Cursor Color': toRGB(theme.base01),
    'Cursor Text Color': toRGB(theme.base3),
    'Selection Color': toRGB(theme.base2),
    'Selected Text Color': toRGB(theme.base01),
    'Ansi 0 Color': toRGB(theme.base2),
    'Ansi 1 Color': toRGB(theme.red),
    'Ansi 2 Color': toRGB(theme.green),
    'Ansi 3 Color': toRGB(theme.yellow),
    'Ansi 4 Color': toRGB(theme.blue),
    'Ansi 5 Color': toRGB(theme.magenta),
    'Ansi 6 Color': toRGB(theme.cyan),
    'Ansi 7 Color': toRGB(theme.base02),
    'Ansi 8 Color': toRGB(theme.base3),
    'Ansi 9 Color': toRGB(theme.orange),
    'Ansi 10 Color': toRGB(theme.base1),
    'Ansi 11 Color': toRGB(theme.base00),
    'Ansi 12 Color': toRGB(theme.base0),
    'Ansi 13 Color': toRGB(theme.violet),
    'Ansi 14 Color': toRGB(theme.base01),
    'Ansi 15 Color': toRGB(theme.base03),
  };

  const entries = Object.entries(colors)
    .map(([name, rgb]) => colorToXML(name, rgb))
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
${entries}
</dict>
</plist>
`;
}

export const iterm2DarkExporter: ExporterConfig = {
  id: 'iterm2-dark',
  name: 'iTerm2 (Dark)',
  description: 'iTerm2 color preset for dark mode',
  fileExtension: 'itermcolors',
  fileName: 'Solarized Dark.itermcolors',
  colorScheme: 'dark',
  export: exportITerm2Dark,
};

export const iterm2LightExporter: ExporterConfig = {
  id: 'iterm2-light',
  name: 'iTerm2 (Light)',
  description: 'iTerm2 color preset for light mode',
  fileExtension: 'itermcolors',
  fileName: 'Solarized Light.itermcolors',
  colorScheme: 'light',
  export: exportITerm2Light,
};
