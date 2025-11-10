import type { SolarizedTheme } from '../solarized';

export interface ExporterConfig {
  id: string;
  name: string;
  description: string;
  fileExtension?: string;
  fileName?: string;
  colorScheme?: 'dark' | 'light';
  export: (theme: SolarizedTheme, themeName: string) => string;
}

export interface ExporterCategory {
  id: string;
  name: string;
  exporters: ExporterConfig[];
}
