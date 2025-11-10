import Color from 'colorjs.io';

import { SolarizedTheme, type SolarizedThemeColorName } from './solarized';

const COLOR_ORDER: SolarizedThemeColorName[] = [
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

// Use native base64url encoding with URL-safe alphabet
function base64urlEncode(bytes: Uint8Array): string {
  // Convert bytes to binary string
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  // Use native btoa and convert to URL-safe format
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, ''); // Remove padding
}

function base64urlDecode(str: string): Uint8Array {
  // Convert URL-safe format back to standard base64
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');

  // Add back padding
  while (base64.length % 4) {
    base64 += '=';
  }

  // Decode using native atob
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes;
}

// Pack bits into bytes efficiently
class BitPacker {
  private bytes: number[] = [];
  private currentByte = 0;
  private bitPosition = 0;

  writeBits(value: number, numBits: number) {
    for (let i = numBits - 1; i >= 0; i--) {
      const bit = (value >> i) & 1;
      this.currentByte = (this.currentByte << 1) | bit;
      this.bitPosition++;

      if (this.bitPosition === 8) {
        this.bytes.push(this.currentByte);
        this.currentByte = 0;
        this.bitPosition = 0;
      }
    }
  }

  getBytes(): Uint8Array {
    if (this.bitPosition > 0) {
      // Pad the last byte
      this.currentByte <<= 8 - this.bitPosition;
      this.bytes.push(this.currentByte);
    }
    return new Uint8Array(this.bytes);
  }
}

class BitUnpacker {
  private bytes: Uint8Array;
  private byteIndex = 0;
  private bitPosition = 0;

  constructor(bytes: Uint8Array) {
    this.bytes = bytes;
  }

  readBits(numBits: number): number {
    let value = 0;

    for (let i = 0; i < numBits; i++) {
      if (this.byteIndex >= this.bytes.length) return 0;

      const bit = (this.bytes[this.byteIndex] >> (7 - this.bitPosition)) & 1;
      value = (value << 1) | bit;
      this.bitPosition++;

      if (this.bitPosition === 8) {
        this.byteIndex++;
        this.bitPosition = 0;
      }
    }

    return value;
  }
}

export function serializeTheme(theme: SolarizedTheme): string {
  const packer = new BitPacker();

  for (const colorName of COLOR_ORDER) {
    const color = theme.get(colorName).to('okhsl');

    // Hue: 0-360 → 9 bits (0-511, wrapping at 360)
    let h = color.h ?? 0;
    if (h < 0) h += 360;
    h = Math.round(h) % 360;
    packer.writeBits(h, 9);

    // Saturation: 0-1 → 10 bits (0-1023, use 0-1000 for precision)
    const s = Math.round(Math.max(0, Math.min(1, color.s ?? 0)) * 1000);
    packer.writeBits(s, 10);

    // Lightness: 0-1 → 10 bits (0-1023, use 0-1000 for precision)
    const l = Math.round(Math.max(0, Math.min(1, color.l ?? 0)) * 1000);
    packer.writeBits(l, 10);
  }

  return base64urlEncode(packer.getBytes());
}

export function deserializeTheme(encoded: string): SolarizedTheme | null {
  try {
    const bytes = base64urlDecode(encoded);
    const unpacker = new BitUnpacker(bytes);

    const colors: Partial<Record<SolarizedThemeColorName, Color>> = {};

    for (const colorName of COLOR_ORDER) {
      const h = unpacker.readBits(9);
      const s = unpacker.readBits(10) / 1000;
      const l = unpacker.readBits(10) / 1000;

      colors[colorName] = new Color('okhsl', [h, s, l]);
    }

    return new SolarizedTheme(colors as Record<SolarizedThemeColorName, Color>);
  } catch (error) {
    console.error('Failed to deserialize theme:', error);
    return null;
  }
}

export function createShareableURL(
  theme: SolarizedTheme,
  themeName?: string
): string {
  const url = new URL(window.location.href);
  url.search = ''; // Clear existing params
  url.searchParams.set('t', serializeTheme(theme));

  if (themeName && themeName !== 'SolarSystem') {
    url.searchParams.set('n', themeName);
  }

  return url.toString();
}

export function parseThemeFromURL(): {
  theme: SolarizedTheme | null;
  name: string | null;
} {
  const params = new URLSearchParams(window.location.search);
  const themeParam = params.get('t');
  const nameParam = params.get('n');

  const theme = themeParam ? deserializeTheme(themeParam) : null;
  const name = nameParam || null;

  return { theme, name };
}

export function clearURLParams() {
  const url = new URL(window.location.href);
  url.search = '';
  window.history.replaceState({}, '', url.toString());
}
