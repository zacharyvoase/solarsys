/**
 * Type declarations for colorconversion module
 * Color conversion utilities for OkHSL, OkHSV, and RGB color spaces
 */

/**
 * RGB color tuple [r, g, b] where values are in range 0-255
 */
export type RGB = [number, number, number];

/**
 * HSL color tuple [h, s, l] where:
 * - h (hue) is in range 0-1 (representing 0-360 degrees)
 * - s (saturation) is in range 0-1
 * - l (lightness) is in range 0-1
 */
export type HSL = [number, number, number];

/**
 * HSV color tuple [h, s, v] where:
 * - h (hue) is in range 0-1 (representing 0-360 degrees)
 * - s (saturation) is in range 0-1
 * - v (value) is in range 0-1
 */
export type HSV = [number, number, number];

/**
 * Converts OkHSL color to sRGB
 * @param h - Hue (0-1)
 * @param s - Saturation (0-1)
 * @param l - Lightness (0-1)
 * @returns RGB tuple [r, g, b] with values 0-255
 */
export function okhsl_to_srgb(h: number, s: number, l: number): RGB;

/**
 * Converts sRGB color to OkHSL
 * @param r - Red component (0-255)
 * @param g - Green component (0-255)
 * @param b - Blue component (0-255)
 * @returns HSL tuple [h, s, l] with values 0-1
 */
export function srgb_to_okhsl(r: number, g: number, b: number): HSL;

/**
 * Converts OkHSV color to sRGB
 * @param h - Hue (0-1)
 * @param s - Saturation (0-1)
 * @param v - Value (0-1)
 * @returns RGB tuple [r, g, b] with values 0-255
 */
export function okhsv_to_srgb(h: number, s: number, v: number): RGB;

/**
 * Converts sRGB color to OkHSV
 * @param r - Red component (0-255)
 * @param g - Green component (0-255)
 * @param b - Blue component (0-255)
 * @returns HSV tuple [h, s, v] with values 0-1
 */
export function srgb_to_okhsv(r: number, g: number, b: number): HSV;

/**
 * Converts hexadecimal color string to RGB
 * @param hex - Hex color string (with or without #, supports 1, 2, 3, or 6 digit formats)
 * @returns RGB tuple [r, g, b] with values 0-255, or null if invalid format
 */
export function hex_to_rgb(hex: string): RGB | null;

/**
 * Converts RGB color to hexadecimal string
 * @param r - Red component (0-255)
 * @param g - Green component (0-255)
 * @param b - Blue component (0-255)
 * @returns Hex color string with # prefix
 */
export function rgb_to_hex(r: number, g: number, b: number): string;
