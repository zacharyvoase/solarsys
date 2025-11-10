import { Box, Card, Input, Slider, Stack } from '@mantine/core';
import { useAtom } from 'jotai';

import { preferencesAtom, selectedColorAtom, themeAtom } from '../state';
import CardTitle from './CardTitle';
import {
  resolveSlotToColorName,
  type SolarizedThemeColorName,
  type SolarizedThemeSlot,
} from '../solarized';
import classes from './PreviewCard.module.css';

export default function PreviewCard() {
  const [preferences, setPreferences] = useAtom(preferencesAtom);
  return (
    <Card style={{ gridArea: 'PreviewCard', alignSelf: 'start' }}>
      <Stack>
        <CardTitle>Preview</CardTitle>
        <PreviewBlock mode="dark" />
        <PreviewBlock mode="light" />
        <Input.Wrapper label="Font Size (px)" mb="lg">
          <Slider
            label={preferences.fontSize ?? 14}
            min={8}
            max={24}
            step={1}
            marks={[
              { value: 8, label: '8' },
              { value: 12, label: '12' },
              { value: 16, label: '16' },
              { value: 20, label: '20' },
              { value: 24, label: '24' },
            ]}
            value={preferences.fontSize ?? 14}
            onChange={(value) => {
              setPreferences({ ...preferences, fontSize: value });
            }}
          />
        </Input.Wrapper>
      </Stack>
    </Card>
  );
}

function PreviewBlock({ mode }: { mode: 'dark' | 'light' }) {
  const [theme] = useAtom(themeAtom);
  const [preferences] = useAtom(preferencesAtom);
  const [, setSelectedColor] = useAtom(selectedColorAtom);
  return (
    <Box
      className={classes.previewCard}
      component="p"
      style={{
        backgroundColor: theme.bg(mode).to('srgb').toString(),
        color: theme.fg(mode).to('srgb').toString(),
        '--selection-bg-color': theme.highlight(mode).to('srgb').toString(),
        fontSize: preferences.fontSize ?? 14,
      }}
      onClick={() => setSelectedColor(mode === 'dark' ? 'base03' : 'base3')}
    >
      <PreviewChunk slot={mode === 'dark' ? 'darkFg' : 'lightFg'} />
      <PreviewChunk
        slot={mode === 'dark' ? 'darkHighlight' : 'lightHighlight'}
      />
      <PreviewChunk slot={mode === 'dark' ? 'darkEmphasis' : 'lightEmphasis'} />
      <PreviewChunk
        slot={mode === 'dark' ? 'darkSecondary' : 'lightSecondary'}
      />
      <br />
      <PreviewChunk slot="yellow" />
      <PreviewChunk slot="orange" />
      <PreviewChunk slot="red" />
      <PreviewChunk slot="magenta" />
      <PreviewChunk slot="violet" />
      <PreviewChunk slot="blue" />
      <PreviewChunk slot="cyan" />
      <PreviewChunk slot="green" />
    </Box>
  );
}

function PreviewChunk({
  slot,
}: {
  slot: SolarizedThemeColorName | SolarizedThemeSlot;
}) {
  const [theme] = useAtom(themeAtom);
  const [, setSelectedColor] = useAtom(selectedColorAtom);
  return (
    <>
      <span
        onClick={(ev) => {
          ev.stopPropagation();
          setSelectedColor(resolveSlotToColorName(slot));
        }}
        style={{
          fontWeight: slot.endsWith('Emphasis') ? 'bold' : 'normal',
          color: slot.endsWith('Highlight')
            ? 'inherit'
            : theme.get(slot).to('srgb').toString(),
          backgroundColor: slot.endsWith('Highlight')
            ? theme.get(slot).to('srgb').toString()
            : undefined,
        }}
      >
        {slot}
      </span>{' '}
    </>
  );
}
