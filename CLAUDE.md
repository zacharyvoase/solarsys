# SolarSystem - AI Onboarding Documentation

## Project Overview

**SolarSystem** is a sophisticated web-based color palette builder that creates Solarized-inspired color schemes with a focus on perceptual uniformity and accessibility.

### What It Does

- Generates and edits 16-color Solarized palettes (8 base + 8 accent colors)
- Uses OKHSL/OKLCH color spaces for perceptually uniform editing
- Calculates APCA contrast ratios for accessibility
- Provides real-time preview in both dark and light modes
- Supports multiple color format conversions (hex, rgb, display-p3, oklch, okhsl)
- Exports themes to 12+ formats (VSCode, terminal emulators, JSON)

### Tech Stack

- **React 19.1.1** + **TypeScript 5.9.3** + **Vite 7.1.7**
- **Jotai** for atomic state management
- **Mantine 8.3.6** for UI components
- **colorjs.io** for color manipulation
- **apcach** for APCA contrast calculation

## Project Structure

```
/src/
├── App.tsx                      # Root component, layout orchestration
├── main.tsx                     # Entry point
├── state.ts                     # Jotai atoms (theme, colors, preferences)
├── solarized.ts                 # Core Solarized theme logic & Color class
├── preferences.ts               # User preferences types
├── mantineTheme.ts              # Mantine theme configuration
├── colorconversion.js           # Color space conversion utilities
├── components/
│   ├── ThemeDisplay.tsx         # 16-color palette grid with controls
│   ├── PreviewCard.tsx          # Dark/light mode preview panel
│   ├── SingleColorEditorCard.tsx # Individual color editor (3 sliders)
│   ├── OutputCard.tsx           # Export themes to various formats
│   ├── TextFormat.tsx           # Multi-format color input/output
│   ├── CardTitle.tsx            # Reusable card title component
│   └── hueslider/               # Custom color slider components
│       ├── ColorSlider.tsx      # Base slider (adapted from Mantine)
│       └── OKHueSlider.tsx      # OKLCH-aware slider
└── outputs/                     # Export format implementations
    ├── types.ts                 # Exporter interfaces
    ├── index.ts                 # Exporter registry and categories
    ├── json.ts                  # JSON exporters (simple & detailed)
    ├── vscode.ts                # VSCode theme exporters
    ├── ghostty.ts               # Ghostty terminal exporters
    ├── iterm2.ts                # iTerm2 color scheme exporters
    ├── alacritty.ts             # Alacritty config exporters
    ├── kitty.ts                 # Kitty terminal exporters
    └── wezterm.ts               # WezTerm config exporters
```

## Key Concepts

### Solarized Color System

The palette consists of 16 colors divided into:

**8 Base Colors** (background-to-foreground spectrum):

- `base03` → `base02` → `base01` → `base00` → `base0` → `base1` → `base2` → `base3`
- Dark mode: `base03` is background, `base0` is primary foreground
- Light mode: `base3` is background, `base00` is primary foreground

**8 Accent Colors**:

- `yellow`, `orange`, `red`, `magenta`, `violet`, `blue`, `cyan`, `green`

### State Management (state.ts)

**Primary Atoms:**

1. `themeAtom` - Stores complete `SolarizedTheme` instance, persists to localStorage
2. `singleColorAtomFamily` - Per-color derived atoms with preference-aware updates
3. `selectedColorAtom` - Currently selected color name for editing
4. `preferencesAtom` - User preferences (linked hues, font size)

**Important Pattern:**
When a color is updated via `singleColorAtomFamily`, it respects user preferences:

- `linkDarkHues` - Synchronizes hue across dark base colors
- `linkLightHues` - Synchronizes hue across light base colors
- `linkColorLightness` - Synchronizes lightness across accent colors

### Color Space Strategy

- **Storage/Defaults**: LAB (original Solarized values)
- **Editing**: OKHSL (perceptually uniform, easy hue/sat/lightness control)
- **Display CSS**: OKLCH (perceptually uniform, wide gamut)
- **Legacy Output**: sRGB hex/rgb
- **Wide Gamut**: Display P3

## Common Tasks

### Adding a New Color Format

1. Update `ColorFormat` enum in `preferences.ts`
2. Add conversion logic to `TextFormat.tsx` (both serialization and deserialization)
3. Add format detection to `detectColorFormat()` in `TextFormat.tsx`

### Modifying Color Defaults

1. Edit the default values in `solarized.ts` (search for `base03`, `yellow`, etc.)
2. Colors are defined in LAB space with L, a, b components

### Adding New UI Controls

1. Add new atom to `state.ts` if state is needed
2. Create component in `src/components/`
3. Import and use in `App.tsx` layout grid
4. Follow existing patterns: Mantine Paper/Card, glassmorphic styling

### Changing Color Editing Behavior

- Modify `SolarizedTheme.withColorUpdate()` in `solarized.ts`
- This method handles preference-aware color updates (linked hues, etc.)

### Adding a New Export Format

1. Create a new file in `src/outputs/` (e.g., `myformat.ts`)
2. Define your exporter function(s) that take a `SolarizedTheme` and return a string
3. Create `ExporterConfig` object(s) with metadata (id, name, description, fileExtension, fileName)
4. Export your exporter(s) from the file
5. Import and add to `EXPORTER_CATEGORIES` in `src/outputs/index.ts`

Example structure:

```typescript
import type { SolarizedTheme } from '../solarized';
import type { ExporterConfig } from './types';

function exportMyFormat(theme: SolarizedTheme): string {
  // Convert theme colors to your format
  return `formatted output`;
}

export const myFormatExporter: ExporterConfig = {
  id: 'myformat',
  name: 'My Format',
  description: 'Description of the format',
  fileExtension: 'ext',
  fileName: 'theme.ext',
  export: exportMyFormat,
};
```

## Important Files Reference

### Core Logic

- `src/solarized.ts:1-400` - `SolarizedTheme` class, color slots, APCA contrast
- `src/state.ts:1-100` - All Jotai atoms and storage configuration
- `src/colorconversion.js:1-50` - OKHSL/RGB conversion utilities
- `src/outputs/` - Export format implementations (12+ formats)

### Main Components

- `src/App.tsx:30-150` - Layout grid, component composition
- `src/components/ThemeDisplay.tsx:1-300` - Color grid, reset button, preference toggles
- `src/components/SingleColorEditorCard.tsx:1-200` - Color editor with 3 sliders
- `src/components/PreviewCard.tsx:1-250` - Dark/light preview, font size control
- `src/components/OutputCard.tsx:1-150` - Export UI with copy/download functionality

### Configuration

- `package.json` - Dependencies, scripts, Node version
- `vite.config.ts` - Vite configuration (allows all hosts)
- `tsconfig.json` - TypeScript strict mode, path aliases
- `eslint.config.js` - Linting rules, import sorting

## Code Conventions

### Naming

- React components: PascalCase (`ThemeDisplay.tsx`)
- Atoms: camelCase with "Atom" suffix (`themeAtom`, `selectedColorAtom`)
- Color names: lowercase (`base03`, `yellow`)
- CSS modules: ComponentName.module.css

### Immutability

- `SolarizedTheme` class is **immutable** - all updates return new instances
- Use `theme.withColorUpdate()` or `theme.withColor()` to create modified themes
- Never mutate color objects directly

### Type Safety

- Enable strict TypeScript checks
- Use Zod schemas for runtime validation (see `TextFormat.tsx`)
- Prefer explicit types over inference for public APIs

### Styling

- Use Mantine components where possible
- CSS modules for component-specific styles
- CSS-in-JS for dynamic color-dependent styles
- Follow existing glassmorphic design (backdrop-blur, translucent backgrounds)

## Development Workflow

```bash
# Setup
nvm use              # Use Node 22 (from .nvmrc)
npm install          # Install dependencies

# Development
npm run dev          # Start dev server (http://localhost:5173)
npm run lint         # Check code quality
npm run lint:fix     # Auto-fix linting issues

# Build
npm run build        # Production build → dist/
npm run preview      # Preview production build
```

### Pre-commit Hooks

Husky runs `npm run lint` before every commit. Fix issues with `npm run lint:fix`.

## Gotchas & Important Notes

### Color Object Serialization

The `Color` class from colorjs.io doesn't serialize to JSON automatically. Custom serialization in `state.ts` handles this:

```typescript
storage: createJSONStorage(() => localStorage, {
  reviver: (key, value) => {
    // Deserializes {space, coords} back to Color
  },
  replacer: (key, value) => {
    // Serializes Color to {space, coords}
  },
});
```

### OKLCH in CSS

When generating OKLCH CSS, chroma values may need clamping for sRGB gamut:

- Use `color.to('srgb').to('oklch')` for gamut mapping
- Or use `@supports (color: oklch(0 0 0))` and provide sRGB fallback

### Contrast Calculation

APCA contrast is **directional** (text-on-background ≠ background-on-text):

```typescript
// Correct usage in solarized.ts
APCAcontrast(fgRgbArray, bgRgbArray); // Foreground first!
```

### State Updates with Preferences

When updating colors via `singleColorAtomFamily`, the update automatically propagates to linked colors based on preferences. Don't manually update multiple colors - let the preference system handle it.

### Color Clamping

OKHSL can produce out-of-gamut colors. The codebase uses:

- `clampChroma()` - Reduce chroma until color fits in sRGB
- `roundColor()` - Round coordinates to reduce precision

### React 19 Notes

This project uses React 19, which has breaking changes from 18:

- StrictMode is enabled (components mount twice in dev)
- Some deprecated APIs removed (check React 19 changelog if upgrading deps)

## Accessibility Considerations

- All accent colors show APCA contrast against both dark and light backgrounds
- Target contrast: Lc 60+ for body text, Lc 90+ for small text
- Foreground color on colored backgrounds uses `theme.foregroundOn()` for safe contrast
- Font size adjustable in preview (accessibility testing)

## Extending the Project

### Adding New Theme Slots

1. Add new slot to `ColorSlot` enum in `solarized.ts`
2. Update `slotToColorName()` mapping
3. Add new slot usage in components (e.g., `ThemeDisplay.tsx`, `PreviewCard.tsx`)

### Supporting New Color Spaces

1. Add to colorjs.io's supported spaces (check documentation)
2. Update `ColorFormat` enum in `preferences.ts`
3. Add serialization/deserialization in `TextFormat.tsx`
4. Update slider overlays if needed (`OKHueSlider.tsx`)

### Persistence Beyond localStorage

Replace `createJSONStorage(() => localStorage)` in `state.ts` with custom storage:

- IndexedDB for larger data
- URL parameters for sharing
- Server sync for multi-device

### Adding Export Formats for New Platforms

The export system in `src/outputs/` is designed for extensibility:

1. **Terminal Emulators**: Follow the pattern in `ghostty.ts`, `kitty.ts`, etc.
   - ANSI color mappings (0-15)
   - Background, foreground, cursor colors
   - Selection colors

2. **Code Editors**: Follow the pattern in `vscode.ts`
   - UI colors (sidebar, editor, statusbar)
   - Syntax highlighting token scopes
   - Terminal ANSI colors

3. **Data Formats**: Follow the pattern in `json.ts`
   - Multiple representations (hex, rgb, oklch)
   - ANSI color mappings for terminal use

All exporters receive a `SolarizedTheme` instance and use helper functions like:

- `theme.get(colorName)` - Get a Color object
- `.to('srgb').toString({ format: 'hex' })` - Convert to hex
- `theme.darkBg`, `theme.lightFg`, etc. - Access semantic color slots

## Performance Notes

- Color calculations are memoized where possible
- Jotai's atomic updates prevent unnecessary re-renders
- Slider interactions are throttled (check `ColorSlider.tsx`)
- CSS gradients generated once and cached in component state

## Testing Strategy (Not Yet Implemented)

Consider adding:

- Unit tests for `solarized.ts` color logic
- Integration tests for preference-linked updates
- Visual regression tests for color output
- Accessibility tests (contrast ratios, keyboard navigation)

## Resources

- [Solarized Color Scheme](https://ethanschoonover.com/solarized/)
- [OKLCH Color Space](https://oklch.com/)
- [APCA Contrast](https://git.apcacontrast.com/)
- [colorjs.io Docs](https://colorjs.io/)
- [Jotai Documentation](https://jotai.org/)
- [Mantine UI](https://mantine.dev/)

---

**Last Updated:** Generated for onboarding purposes on 2025-11-09
