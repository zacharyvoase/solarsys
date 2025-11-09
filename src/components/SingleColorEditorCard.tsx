import { Card, Input, Stack, Text } from '@mantine/core';
import type Color from 'colorjs.io';
import { useAtom } from 'jotai';

import { clampAndRound, type SolarizedThemeColorName } from '../solarized';
import { selectedColorAtom, singleColorAtomFamily } from '../state';
import CardTitle from './CardTitle';
import { OKComponentSlider } from './hueslider/OKHueSlider';

export default function SingleColorEditorCard() {
  const [selectedColor] = useAtom(selectedColorAtom);

  if (!selectedColor) {
    return (
      <Card style={{ gridArea: 'EditorCard' }}>
        <CardTitle>Edit</CardTitle>
        <Text variant="text">Select a color to edit</Text>
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
      <Stack>
        <CardTitle>Edit {selectedColorName}</CardTitle>
        <Input.Wrapper label="Hue" description={color.h!.toFixed(0)}>
          <OKComponentSlider
            baseColor={color}
            component="hue"
            value={color.h!}
            onChange={(h) => {
              setSelectedColor((c) => setOkHslComponent(c, 'hue', h));
            }}
          />
        </Input.Wrapper>
        <Input.Wrapper label="Saturation" description={color.s!.toFixed(2)}>
          <OKComponentSlider
            baseColor={color}
            component="saturation"
            value={color.s!}
            onChange={(s) => {
              setSelectedColor((c) => setOkHslComponent(c, 'saturation', s));
            }}
          />
        </Input.Wrapper>
        <Input.Wrapper label="Lightness" description={color.l!.toFixed(2)}>
          <OKComponentSlider
            baseColor={color}
            component="lightness"
            value={color.l!}
            onChange={(l) => {
              setSelectedColor((c) => setOkHslComponent(c, 'lightness', l));
            }}
          />
        </Input.Wrapper>
      </Stack>
    </Card>
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
