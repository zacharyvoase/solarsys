import { Card, Divider, Group, Stack, Text } from '@mantine/core';
import type Color from 'colorjs.io';
import { useAtom } from 'jotai';

import { clampAndRound, type SolarizedThemeColorName } from '../solarized';
import { selectedColorAtom, singleColorAtomFamily } from '../state';
import CardTitle from './CardTitle';
import { OKComponentSlider } from './hueslider/OKHueSlider';
import TextFormat from './TextFormat';

export default function SingleColorEditorCard() {
  const [selectedColor] = useAtom(selectedColorAtom);

  if (!selectedColor) {
    return (
      <Card style={{ gridArea: 'EditorCard' }}>
        <Stack gap="md">
          <CardTitle>Edit</CardTitle>
          <Text variant="text" c="dimmed">
            Select a color to edit
          </Text>
        </Stack>
      </Card>
    );
  } else {
    return <EditorCard selectedColor={selectedColor} />;
  }
}

function EditorCard({
  selectedColor: selectedColorName,
}: {
  selectedColor: SolarizedThemeColorName;
}) {
  const [selectedColor, setSelectedColor] = useAtom(
    singleColorAtomFamily(selectedColorName)
  );

  const color = clampAndRound(selectedColor.to('okhsl'));

  return (
    <Card style={{ gridArea: 'EditorCard' }}>
      <Stack gap="md">
        <CardTitle>
          Edit{' '}
          <span
            style={{
              fontWeight: 800,
              fontVariantNumeric: 'tabular-nums',
              fontFeatureSettings: "'tnum'",
            }}
          >
            {selectedColorName}
          </span>
        </CardTitle>
        <SliderWrapper label="Hue" value={color.h!.toFixed(0)}>
          <OKComponentSlider
            baseColor={color}
            component="hue"
            value={color.h!}
            onChange={(h) => {
              setSelectedColor((c) => setOkHslComponent(c, 'hue', h));
            }}
          />
        </SliderWrapper>
        <SliderWrapper label="Saturation" value={color.s!.toFixed(2)}>
          <OKComponentSlider
            baseColor={color}
            component="saturation"
            value={color.s!}
            onChange={(s) => {
              setSelectedColor((c) => setOkHslComponent(c, 'saturation', s));
            }}
          />
        </SliderWrapper>
        <SliderWrapper label="Lightness" value={color.l!.toFixed(2)}>
          <OKComponentSlider
            baseColor={color}
            component="lightness"
            value={color.l!}
            onChange={(l) => {
              setSelectedColor((c) => setOkHslComponent(c, 'lightness', l));
            }}
          />
        </SliderWrapper>
        <Card.Section>
          <Divider />
        </Card.Section>
        <TextFormat
          color={color}
          setColor={(c) => setSelectedColor(clampAndRound(c.to('okhsl')))}
        />
      </Stack>
    </Card>
  );
}

function SliderWrapper({
  label,
  value,
  children,
}: {
  label: string;
  value: string;
  children: React.ReactNode;
}) {
  return (
    <Stack gap="xs">
      <Group justify="space-between">
        <Text component="span" size="sm" fw={500} variant="text">
          {label}
        </Text>
        <Text component="span" c="dimmed" fw={400} size="sm">
          {value}
        </Text>
      </Group>
      {children}
    </Stack>
  );
}

function setOkHslComponent(
  color: Color,
  component: 'hue' | 'saturation' | 'lightness',
  value: number
) {
  return clampAndRound(color.to('okhsl')).set(
    component === 'hue' ? 'h' : component === 'saturation' ? 's' : 'l',
    value
  );
}
