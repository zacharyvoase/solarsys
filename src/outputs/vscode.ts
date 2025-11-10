import type { SolarizedTheme } from '../solarized';
import type { ExporterConfig } from './types';

function hexColor(
  theme: SolarizedTheme,
  colorName: keyof SolarizedTheme
): string {
  return theme.get(colorName).to('srgb').toString({ format: 'hex' });
}

function exportVSCodeDark(theme: SolarizedTheme, themeName: string): string {
  const result = {
    name: themeName,
    type: 'dark',
    colors: {
      'editor.background': hexColor(theme, 'base03'),
      'editor.foreground': hexColor(theme, 'base0'),
      'editorLineNumber.foreground': hexColor(theme, 'base01'),
      'editorLineNumber.activeForeground': hexColor(theme, 'base1'),
      'editorCursor.foreground': hexColor(theme, 'base1'),
      'editor.selectionBackground': hexColor(theme, 'base02'),
      'editor.lineHighlightBackground': hexColor(theme, 'base02'),
      'editorWhitespace.foreground': hexColor(theme, 'base01'),
      'editorIndentGuide.background': hexColor(theme, 'base01'),
      'editorIndentGuide.activeBackground': hexColor(theme, 'base00'),
      'sideBar.background': hexColor(theme, 'base03'),
      'sideBar.foreground': hexColor(theme, 'base0'),
      'sideBarSectionHeader.background': hexColor(theme, 'base02'),
      'list.activeSelectionBackground': hexColor(theme, 'base02'),
      'list.inactiveSelectionBackground': hexColor(theme, 'base02'),
      'list.hoverBackground': hexColor(theme, 'base02'),
      'statusBar.background': hexColor(theme, 'base02'),
      'statusBar.foreground': hexColor(theme, 'base0'),
      'titleBar.activeBackground': hexColor(theme, 'base03'),
      'titleBar.activeForeground': hexColor(theme, 'base0'),
      'activityBar.background': hexColor(theme, 'base03'),
      'activityBar.foreground': hexColor(theme, 'base1'),
      'panel.background': hexColor(theme, 'base03'),
      'panel.border': hexColor(theme, 'base02'),
      'terminal.background': hexColor(theme, 'base03'),
      'terminal.foreground': hexColor(theme, 'base0'),
      'terminal.ansiBlack': hexColor(theme, 'base02'),
      'terminal.ansiRed': hexColor(theme, 'red'),
      'terminal.ansiGreen': hexColor(theme, 'green'),
      'terminal.ansiYellow': hexColor(theme, 'yellow'),
      'terminal.ansiBlue': hexColor(theme, 'blue'),
      'terminal.ansiMagenta': hexColor(theme, 'magenta'),
      'terminal.ansiCyan': hexColor(theme, 'cyan'),
      'terminal.ansiWhite': hexColor(theme, 'base2'),
      'terminal.ansiBrightBlack': hexColor(theme, 'base03'),
      'terminal.ansiBrightRed': hexColor(theme, 'orange'),
      'terminal.ansiBrightGreen': hexColor(theme, 'base01'),
      'terminal.ansiBrightYellow': hexColor(theme, 'base00'),
      'terminal.ansiBrightBlue': hexColor(theme, 'base0'),
      'terminal.ansiBrightMagenta': hexColor(theme, 'violet'),
      'terminal.ansiBrightCyan': hexColor(theme, 'base1'),
      'terminal.ansiBrightWhite': hexColor(theme, 'base3'),
    },
    tokenColors: [
      {
        scope: ['comment', 'punctuation.definition.comment'],
        settings: {
          foreground: hexColor(theme, 'base01'),
          fontStyle: 'italic',
        },
      },
      {
        scope: ['string', 'constant.other.symbol'],
        settings: {
          foreground: hexColor(theme, 'cyan'),
        },
      },
      {
        scope: ['constant.numeric', 'constant.language', 'constant.character'],
        settings: {
          foreground: hexColor(theme, 'cyan'),
        },
      },
      {
        scope: ['variable', 'variable.other'],
        settings: {
          foreground: hexColor(theme, 'blue'),
        },
      },
      {
        scope: ['keyword', 'storage.type', 'storage.modifier'],
        settings: {
          foreground: hexColor(theme, 'green'),
        },
      },
      {
        scope: ['entity.name.function', 'support.function'],
        settings: {
          foreground: hexColor(theme, 'blue'),
        },
      },
      {
        scope: [
          'entity.name.type',
          'entity.name.class',
          'support.type',
          'support.class',
        ],
        settings: {
          foreground: hexColor(theme, 'yellow'),
        },
      },
      {
        scope: ['keyword.operator', 'punctuation'],
        settings: {
          foreground: hexColor(theme, 'base0'),
        },
      },
      {
        scope: ['entity.name.tag'],
        settings: {
          foreground: hexColor(theme, 'blue'),
        },
      },
      {
        scope: ['entity.other.attribute-name'],
        settings: {
          foreground: hexColor(theme, 'cyan'),
        },
      },
      {
        scope: ['support.constant'],
        settings: {
          foreground: hexColor(theme, 'orange'),
        },
      },
      {
        scope: ['meta.property-name'],
        settings: {
          foreground: hexColor(theme, 'blue'),
        },
      },
      {
        scope: ['invalid'],
        settings: {
          foreground: hexColor(theme, 'red'),
        },
      },
      {
        scope: ['markup.heading'],
        settings: {
          foreground: hexColor(theme, 'yellow'),
          fontStyle: 'bold',
        },
      },
      {
        scope: ['markup.italic'],
        settings: {
          foreground: hexColor(theme, 'base0'),
          fontStyle: 'italic',
        },
      },
      {
        scope: ['markup.bold'],
        settings: {
          foreground: hexColor(theme, 'base0'),
          fontStyle: 'bold',
        },
      },
      {
        scope: ['markup.underline'],
        settings: {
          foreground: hexColor(theme, 'violet'),
          fontStyle: 'underline',
        },
      },
      {
        scope: ['markup.quote'],
        settings: {
          foreground: hexColor(theme, 'green'),
        },
      },
      {
        scope: ['markup.inline.raw', 'markup.fenced_code'],
        settings: {
          foreground: hexColor(theme, 'cyan'),
        },
      },
    ],
  };

  return JSON.stringify(result, null, 2);
}

function exportVSCodeLight(theme: SolarizedTheme, themeName: string): string {
  const result = {
    name: themeName,
    type: 'light',
    colors: {
      'editor.background': hexColor(theme, 'base3'),
      'editor.foreground': hexColor(theme, 'base00'),
      'editorLineNumber.foreground': hexColor(theme, 'base1'),
      'editorLineNumber.activeForeground': hexColor(theme, 'base01'),
      'editorCursor.foreground': hexColor(theme, 'base01'),
      'editor.selectionBackground': hexColor(theme, 'base2'),
      'editor.lineHighlightBackground': hexColor(theme, 'base2'),
      'editorWhitespace.foreground': hexColor(theme, 'base1'),
      'editorIndentGuide.background': hexColor(theme, 'base1'),
      'editorIndentGuide.activeBackground': hexColor(theme, 'base00'),
      'sideBar.background': hexColor(theme, 'base3'),
      'sideBar.foreground': hexColor(theme, 'base00'),
      'sideBarSectionHeader.background': hexColor(theme, 'base2'),
      'list.activeSelectionBackground': hexColor(theme, 'base2'),
      'list.inactiveSelectionBackground': hexColor(theme, 'base2'),
      'list.hoverBackground': hexColor(theme, 'base2'),
      'statusBar.background': hexColor(theme, 'base2'),
      'statusBar.foreground': hexColor(theme, 'base00'),
      'titleBar.activeBackground': hexColor(theme, 'base3'),
      'titleBar.activeForeground': hexColor(theme, 'base00'),
      'activityBar.background': hexColor(theme, 'base3'),
      'activityBar.foreground': hexColor(theme, 'base01'),
      'panel.background': hexColor(theme, 'base3'),
      'panel.border': hexColor(theme, 'base2'),
      'terminal.background': hexColor(theme, 'base3'),
      'terminal.foreground': hexColor(theme, 'base00'),
      'terminal.ansiBlack': hexColor(theme, 'base2'),
      'terminal.ansiRed': hexColor(theme, 'red'),
      'terminal.ansiGreen': hexColor(theme, 'green'),
      'terminal.ansiYellow': hexColor(theme, 'yellow'),
      'terminal.ansiBlue': hexColor(theme, 'blue'),
      'terminal.ansiMagenta': hexColor(theme, 'magenta'),
      'terminal.ansiCyan': hexColor(theme, 'cyan'),
      'terminal.ansiWhite': hexColor(theme, 'base02'),
      'terminal.ansiBrightBlack': hexColor(theme, 'base3'),
      'terminal.ansiBrightRed': hexColor(theme, 'orange'),
      'terminal.ansiBrightGreen': hexColor(theme, 'base1'),
      'terminal.ansiBrightYellow': hexColor(theme, 'base00'),
      'terminal.ansiBrightBlue': hexColor(theme, 'base0'),
      'terminal.ansiBrightMagenta': hexColor(theme, 'violet'),
      'terminal.ansiBrightCyan': hexColor(theme, 'base01'),
      'terminal.ansiBrightWhite': hexColor(theme, 'base03'),
    },
    tokenColors: [
      {
        scope: ['comment', 'punctuation.definition.comment'],
        settings: {
          foreground: hexColor(theme, 'base1'),
          fontStyle: 'italic',
        },
      },
      {
        scope: ['string', 'constant.other.symbol'],
        settings: {
          foreground: hexColor(theme, 'cyan'),
        },
      },
      {
        scope: ['constant.numeric', 'constant.language', 'constant.character'],
        settings: {
          foreground: hexColor(theme, 'cyan'),
        },
      },
      {
        scope: ['variable', 'variable.other'],
        settings: {
          foreground: hexColor(theme, 'blue'),
        },
      },
      {
        scope: ['keyword', 'storage.type', 'storage.modifier'],
        settings: {
          foreground: hexColor(theme, 'green'),
        },
      },
      {
        scope: ['entity.name.function', 'support.function'],
        settings: {
          foreground: hexColor(theme, 'blue'),
        },
      },
      {
        scope: [
          'entity.name.type',
          'entity.name.class',
          'support.type',
          'support.class',
        ],
        settings: {
          foreground: hexColor(theme, 'yellow'),
        },
      },
      {
        scope: ['keyword.operator', 'punctuation'],
        settings: {
          foreground: hexColor(theme, 'base00'),
        },
      },
      {
        scope: ['entity.name.tag'],
        settings: {
          foreground: hexColor(theme, 'blue'),
        },
      },
      {
        scope: ['entity.other.attribute-name'],
        settings: {
          foreground: hexColor(theme, 'cyan'),
        },
      },
      {
        scope: ['support.constant'],
        settings: {
          foreground: hexColor(theme, 'orange'),
        },
      },
      {
        scope: ['meta.property-name'],
        settings: {
          foreground: hexColor(theme, 'blue'),
        },
      },
      {
        scope: ['invalid'],
        settings: {
          foreground: hexColor(theme, 'red'),
        },
      },
      {
        scope: ['markup.heading'],
        settings: {
          foreground: hexColor(theme, 'yellow'),
          fontStyle: 'bold',
        },
      },
      {
        scope: ['markup.italic'],
        settings: {
          foreground: hexColor(theme, 'base00'),
          fontStyle: 'italic',
        },
      },
      {
        scope: ['markup.bold'],
        settings: {
          foreground: hexColor(theme, 'base00'),
          fontStyle: 'bold',
        },
      },
      {
        scope: ['markup.underline'],
        settings: {
          foreground: hexColor(theme, 'violet'),
          fontStyle: 'underline',
        },
      },
      {
        scope: ['markup.quote'],
        settings: {
          foreground: hexColor(theme, 'green'),
        },
      },
      {
        scope: ['markup.inline.raw', 'markup.fenced_code'],
        settings: {
          foreground: hexColor(theme, 'cyan'),
        },
      },
    ],
  };

  return JSON.stringify(result, null, 2);
}

export const vscodeDarkExporter: ExporterConfig = {
  id: 'vscode-dark',
  name: 'VSCode Theme (Dark)',
  description: 'Complete VSCode color theme for dark mode',
  fileExtension: 'json',
  fileName: 'solarized-dark-theme.json',
  colorScheme: 'dark',
  export: exportVSCodeDark,
};

export const vscodeLightExporter: ExporterConfig = {
  id: 'vscode-light',
  name: 'VSCode Theme (Light)',
  description: 'Complete VSCode color theme for light mode',
  fileExtension: 'json',
  fileName: 'solarized-light-theme.json',
  colorScheme: 'light',
  export: exportVSCodeLight,
};
