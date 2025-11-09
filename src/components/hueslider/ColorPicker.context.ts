import {
  createOptionalContext,
  type GetStylesApi,
  type ColorPickerFactory,
} from '@mantine/core';

interface ColorPickerContextValue {
  getStyles: GetStylesApi<ColorPickerFactory>;
  unstyled: boolean | undefined;
}

export const [ColorPickerProvider, useColorPickerContext] =
  createOptionalContext<ColorPickerContextValue>(null);
