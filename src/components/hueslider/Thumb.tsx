import { Box } from '@mantine/core';

export interface ThumbProps extends React.ComponentProps<'div'> {
  variant?: string;
  position: { x: number; y: number };
}

export function Thumb({ position, ref, ...others }: ThumbProps) {
  return (
    <Box
      ref={ref}
      __vars={{
        '--thumb-y-offset': `${position.y * 100}%`,
        '--thumb-x-offset': `${position.x * 100}%`,
      }}
      {...others}
    />
  );
}

Thumb.displayName = 'ColorPickerThumb';
