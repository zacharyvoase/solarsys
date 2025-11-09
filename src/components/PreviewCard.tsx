import { Box, Card, Stack } from '@mantine/core';
import { useAtom } from 'jotai';

import { themeAtom } from '../state';
import CardTitle from './CardTitle';
import type { SolarizedTheme, SolarizedThemeSlot } from '../solarized';

export default function PreviewCard() {
  return (
    <Card>
      <Stack style={{ width: 400 }}>
        <CardTitle>Preview</CardTitle>
        <PreviewBlock mode="dark" />
        <PreviewBlock mode="light" />
      </Stack>
    </Card>
  );
}

function PreviewBlock({ mode }: { mode: 'dark' | 'light' }) {
  const [theme] = useAtom(themeAtom);
  return (
    <Box
      component="p"
      m={0}
      bdrs="sm"
      p="md"
      ff="monospace"
      style={{
        backgroundColor: theme.bg(mode).to('srgb').toString(),
        color: theme.fg(mode).to('srgb').toString(),
      }}
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
  slot: keyof SolarizedTheme | SolarizedThemeSlot;
}) {
  const [theme] = useAtom(themeAtom);
  return (
    <>
      <span
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
