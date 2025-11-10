import { useEffect, useRef, useState } from 'react';
import { Group, NativeSelect, TextInput } from '@mantine/core';
import Color from 'colorjs.io';

const TextFormats = {
  hex: 'sRGB Hex',
  srgb: 'sRGB',
  p3: 'Display P3',
  okhsl: 'OKHSL',
  oklch: 'OKLCH',
} as const;

type TextFormat = keyof typeof TextFormats;

export default function TextFormat({
  color,
  setColor,
}: {
  color: Color;
  setColor: (color: Color) => void;
}) {
  const [format, setFormat] = useState<TextFormat>('hex');

  const [colorString, setColorString] = useState<string>(
    formatColor(color, format)
  );
  const colorUpdatedFromInput = useRef(false);

  useEffect(() => {
    if (!colorUpdatedFromInput.current) {
      setColorString(formatColor(color, format));
    }
    colorUpdatedFromInput.current = false;
  }, [color, format]);

  return (
    <Group gap="md">
      <TextInput
        size="md"
        styles={{
          root: { flexGrow: 1 },
          input: { fontFamily: 'var(--mantine-font-family-monospace)' },
        }}
        value={colorString}
        onChange={(ev) => {
          const colorString = ev.target.value;
          setColorString(colorString);
          let newColor: Color;
          try {
            newColor = new Color(colorString.trim());
          } catch {
            return;
          }
          if (
            newColor.spaceId === 'srgb' &&
            (colorString.startsWith('#') ||
              colorString.match(/^[a-f0-9]{3}|[a-f0-9]{6}$/i))
          ) {
            setFormat('hex');
            colorUpdatedFromInput.current = true;
          } else if (Object.keys(TextFormats).includes(newColor.spaceId)) {
            setFormat(newColor.spaceId as TextFormat);
            colorUpdatedFromInput.current = true;
          }
          setColor(newColor);
        }}
      />
      <NativeSelect
        size="md"
        value={format}
        onChange={(event) => {
          const format = event.currentTarget.value as TextFormat;
          setFormat(format);
          setColorString(formatColor(color, format));
        }}
        data={Object.entries(TextFormats).map(([value, label]) => ({
          value,
          label,
        }))}
      />
    </Group>
  );
}

function formatColor(color: Color, format: TextFormat) {
  if (format === 'hex') {
    return color.to('srgb').toString({ format: 'hex' });
  } else {
    return color.to(format).toString();
  }
}
