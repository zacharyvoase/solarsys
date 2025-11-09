/**
 * Type declarations for apcach module
 * https://www.npmjs.com/package/apcach
 */

declare module 'apcach' {
  // ============ Types ============

  export type ColorSpace = 'p3' | 'srgb';
  export type ContrastModel = 'apca' | 'wcag';
  export type SearchDirection = 'auto' | 'lighter' | 'darker';
  export type CSSFormat = 'oklch' | 'rgb' | 'hex' | 'p3' | 'figma-p3';

  /**
   * A CSS color string (e.g., "oklch(0.5 0.1 180)", "#ff0000", "white", "black")
   */
  export type CSSColor = string;

  /**
   * Configuration for contrast calculation
   */
  export interface ContrastConfig {
    bgColor: CSSColor | 'apcach';
    fgColor: CSSColor | 'apcach';
    cr: number;
    contrastModel: ContrastModel;
    searchDirection: SearchDirection;
  }

  /**
   * The apcach color object returned by the main apcach function
   */
  export interface ApcachColor {
    alpha: number;
    chroma: number;
    colorSpace: ColorSpace;
    contrastConfig: ContrastConfig;
    hue: number;
    lightness: number;
  }

  /**
   * Antagonist configuration for cssToApcach
   */
  export interface AntagonistConfig {
    bg?: CSSColor;
    fg?: CSSColor;
  }

  /**
   * Max chroma function type
   */
  export type MaxChromaFunction = (
    contrastConfig: ContrastConfig,
    hue: number,
    alpha: number,
    colorSpace: ColorSpace
  ) => ApcachColor;

  // ============ Main Function ============

  /**
   * Creates an apcach color with the specified contrast, chroma, hue, alpha, and color space
   * @param contrast - Contrast ratio (number) or ContrastConfig object
   * @param chroma - Chroma value (0-0.37) or maxChroma function
   * @param hue - Hue value (0-360) or undefined
   * @param alpha - Alpha value (0-100), default 100
   * @param colorSpace - Color space ('p3' or 'srgb'), default 'p3'
   */
  export function apcach(
    contrast: number | ContrastConfig,
    chroma: number | MaxChromaFunction,
    hue?: number | null,
    alpha?: number,
    colorSpace?: ColorSpace
  ): ApcachColor;

  // ============ Conversion Functions ============

  /**
   * Converts a CSS color to an apcach color
   * @param color - CSS color string
   * @param antagonist - Object with bg or fg antagonist color
   * @param colorSpace - Color space, default 'p3'
   * @param contrastModel - Contrast model, default 'apca'
   */
  export function cssToApcach(
    color: CSSColor,
    antagonist: AntagonistConfig,
    colorSpace?: ColorSpace,
    contrastModel?: ContrastModel
  ): ApcachColor;

  /**
   * Converts an apcach color to CSS format
   * @param color - Apcach color object
   * @param format - Output format, default 'oklch'
   */
  export function apcachToCss(color: ApcachColor, format?: CSSFormat): string;

  // ============ Contrast Config Helpers ============

  /**
   * Creates contrast config with apcach as foreground and specified background
   */
  export function crToBg(
    bgColor: CSSColor,
    cr: number,
    contrastModel?: ContrastModel,
    searchDirection?: SearchDirection
  ): ContrastConfig;

  /**
   * Alias for crToBg
   */
  export function crTo(
    bgColor: CSSColor,
    cr: number,
    contrastModel?: ContrastModel,
    searchDirection?: SearchDirection
  ): ContrastConfig;

  /**
   * Creates contrast config with apcach as foreground and white background
   */
  export function crToBgWhite(
    cr: number,
    contrastModel?: ContrastModel,
    searchDirection?: SearchDirection
  ): ContrastConfig;

  /**
   * Creates contrast config with apcach as foreground and black background
   */
  export function crToBgBlack(
    cr: number,
    contrastModel?: ContrastModel,
    searchDirection?: SearchDirection
  ): ContrastConfig;

  /**
   * Creates contrast config with apcach as background and specified foreground
   */
  export function crToFg(
    fgColor: CSSColor,
    cr: number,
    contrastModel?: ContrastModel,
    searchDirection?: SearchDirection
  ): ContrastConfig;

  /**
   * Creates contrast config with apcach as background and white foreground
   */
  export function crToFgWhite(
    cr: number,
    contrastModel?: ContrastModel,
    searchDirection?: SearchDirection
  ): ContrastConfig;

  /**
   * Creates contrast config with apcach as background and black foreground
   */
  export function crToFgBlack(
    cr: number,
    contrastModel?: ContrastModel,
    searchDirection?: SearchDirection
  ): ContrastConfig;

  // ============ Color Manipulation Functions ============

  /**
   * Sets or updates the contrast of an apcach color
   * @param colorInApcach - Apcach color object
   * @param cr - New contrast value or function to calculate from current value
   */
  export function setContrast(
    colorInApcach: ApcachColor,
    cr: number | ((currentCr: number) => number)
  ): ApcachColor;

  /**
   * Sets or updates the chroma of an apcach color
   * @param colorInApcach - Apcach color object
   * @param c - New chroma value or function to calculate from current value
   */
  export function setChroma(
    colorInApcach: ApcachColor,
    c: number | ((currentChroma: number) => number)
  ): ApcachColor;

  /**
   * Sets or updates the hue of an apcach color
   * @param colorInApcach - Apcach color object
   * @param h - New hue value or function to calculate from current value
   */
  export function setHue(
    colorInApcach: ApcachColor,
    h: number | ((currentHue: number) => number)
  ): ApcachColor;

  /**
   * Returns a max chroma function with optional chroma cap
   * @param chromaCap - Maximum chroma value, default 0.4
   */
  export function maxChroma(chromaCap?: number): MaxChromaFunction;

  // ============ Utility Functions ============

  /**
   * Calculates the contrast between foreground and background colors
   * @param fgColor - Foreground color (CSS string)
   * @param bgColor - Background color (CSS string)
   * @param contrastModel - Contrast model, default 'apca'
   * @param colorSpace - Color space, default 'p3'
   */
  export function calcContrast(
    fgColor: CSSColor,
    bgColor: CSSColor,
    contrastModel?: ContrastModel,
    colorSpace?: ColorSpace
  ): number;

  /**
   * Checks if a color is within the specified color space gamut
   * @param color - Color to check (ApcachColor or CSS string)
   * @param colorSpace - Color space, default 'p3'
   */
  export function inColorSpace(
    color: ApcachColor | CSSColor,
    colorSpace?: ColorSpace
  ): boolean;
}
