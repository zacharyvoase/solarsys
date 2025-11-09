import { rem, useProps } from '@mantine/core';
import type Color from 'colorjs.io';

import { ColorSlider, type ColorSliderProps } from './ColorSlider';
import { clampAndRoundComponent, getFgColor } from '../../solarized';

export interface OKComponentSliderProps
  extends Omit<ColorSliderProps, 'maxValue' | 'overlays' | 'round'> {
  baseColor: Color;
  component: 'hue' | 'saturation' | 'lightness';
}

export function OKComponentSlider(
  props: OKComponentSliderProps & { ref?: React.Ref<HTMLDivElement> }
) {
  const {
    value,
    onChange,
    onChangeEnd,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    color,
    ref,
    baseColor,
    component,
    ...others
  } = useProps('HueSlider', {}, props);

  return (
    <ColorSlider
      {...others}
      ref={ref}
      value={
        component === 'hue'
          ? clampAndRoundComponent(component, value)
          : clampAndRoundComponent(component, value) * 1000
      }
      onChange={(v) =>
        onChange?.(
          component === 'hue'
            ? clampAndRoundComponent(component, v)
            : clampAndRoundComponent(component, v / 1000)
        )
      }
      onChangeEnd={(v) =>
        onChangeEnd?.(
          component === 'hue'
            ? clampAndRoundComponent(component, v)
            : clampAndRoundComponent(component, v / 1000)
        )
      }
      maxValue={component === 'hue' ? 360 : 1000}
      thumbColor={baseColor.toString({ format: 'oklch' })}
      thumbBorderColor={getFgColor(baseColor).toString({ format: 'oklch' })}
      size="xl"
      round
      overlays={[
        {
          backgroundImage: generateGradient(
            baseColor,
            component,
            component === 'hue' ? 36 : 100
          ),
        },
        {
          boxShadow: `rgba(0, 0, 0, .1) 0 0 0 ${rem(1)} inset, rgb(0, 0, 0, .15) 0 0 ${rem(
            4
          )} inset`,
        },
      ]}
    />
  );
}

function generateGradient(
  baseColor: Color,
  component: 'hue' | 'saturation' | 'lightness',
  steps: number
): string {
  let c = baseColor.clone();
  return `linear-gradient(to right in oklch shorter hue,${Array.from(
    { length: steps + 1 },
    (_, i) => {
      c = c.set(
        component === 'hue'
          ? 'h'
          : component === 'saturation'
            ? 's'
            : component === 'lightness'
              ? 'l'
              : 'v',
        component === 'hue' ? (i * 360) / steps : i / steps
      );
      return c.toString({ format: 'oklch' });
    }
  ).join(',')})`;
}
