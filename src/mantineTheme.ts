import { createTheme } from '@mantine/core';
import { apcach, apcachToCss, crToBg } from 'apcach';

const darkHue = 300;

const backgroundColor = `oklch(0.10 0.0236 ${darkHue})`;

export const theme = createTheme({
  primaryShade: { light: 7, dark: 7 },
  primaryColor: 'green',
  fontFamily:
    '"DM Sans", -apple-system, "system-ui", "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  fontFamilyMonospace: '"JetBrains Mono", monospace',
  colors: {
    dark: [
      apcachToCss(apcach(crToBg(backgroundColor, 90), 0.0236, darkHue)),
      apcachToCss(apcach(crToBg(backgroundColor, 75), 0.0236, darkHue)),
      apcachToCss(apcach(crToBg(backgroundColor, 70), 0.0236, darkHue)),
      apcachToCss(apcach(crToBg(backgroundColor, 60), 0.0236, darkHue)),
      `oklch(0.50 0.0236 ${darkHue})`,
      `oklch(0.42 0.0236 ${darkHue})`,
      `oklch(0.34 0.0136 ${darkHue})`,
      `oklch(0.26 0.0445 ${darkHue})`,
      `oklch(0.18 0.0445 ${darkHue})`,
      `oklch(0.10 0.0236 ${darkHue})`,
    ],
  },
  headings: {
    fontFamily: '"Russo One", sans-serif',
    fontWeight: '400',
  },
  components: {
    Card: {
      defaultProps: {
        shadow: 'md',
      },
    },
    Paper: {
      classNames: {
        root: 'paper-transparent',
      },
    },
    Input: {
      classNames: {
        input: 'input-transparent',
      },
    },
  },
});
