import { Box, Button, Card, Stack, Switch } from '@mantine/core';
import { useAtom } from 'jotai';

import {
  SOLARIZED_DEFAULT,
  type SolarizedThemeColorName,
  getFgColor,
} from '../solarized';
import { themeAtom, selectedColorAtom, preferencesAtom } from '../state';

export default function ThemeDisplay() {
  const [preferences, setPreferences] = useAtom(preferencesAtom);
  const [, setTheme] = useAtom(themeAtom);
  return (
    <Card padding="md">
      <Stack>
        <Box
          display="grid"
          style={{
            gridTemplateColumns: 'repeat(2, 1fr)',
            gridTemplateRows: 'repeat(8, auto)',
            gridAutoFlow: 'column',
            gap: 0,
            overflow: 'hidden',
          }}
          bdrs="md"
        >
          <ColorBox name="base03" uses={['dark bg']} />
          <ColorBox name="base02" uses={['dark highlight']} />
          <ColorBox
            name="base01"
            uses={['dark secondary', 'light emphasis']}
            contrastDark
            contrastLight
          />
          <ColorBox name="base00" uses={['light body text']} contrastLight />
          <ColorBox name="base0" uses={['dark body text']} contrastDark />
          <ColorBox
            name="base1"
            uses={['light secondary', 'dark emphasis']}
            contrastDark
            contrastLight
          />
          <ColorBox name="base2" uses={['light highlight']} />
          <ColorBox name="base3" uses={['light bg']} />
          <ColorBox name="yellow" contrastDark contrastLight />
          <ColorBox name="orange" contrastDark contrastLight />
          <ColorBox name="red" contrastDark contrastLight />
          <ColorBox name="magenta" contrastDark contrastLight />
          <ColorBox name="violet" contrastDark contrastLight />
          <ColorBox name="blue" contrastDark contrastLight />
          <ColorBox name="cyan" contrastDark contrastLight />
          <ColorBox name="green" contrastDark contrastLight />
        </Box>
        <Switch
          label="Link dark hues"
          checked={preferences.linkDarkHues}
          onChange={(event) => {
            setPreferences((prev) => ({
              ...prev,
              linkDarkHues: event.currentTarget.checked,
            }));
          }}
        />
        <Switch
          label="Link light hues"
          checked={preferences.linkLightHues}
          onChange={(event) => {
            setPreferences((prev) => ({
              ...prev,
              linkLightHues: event.currentTarget.checked,
            }));
          }}
        />
        <Switch
          label="Link color lightness"
          checked={preferences.linkColorLightness}
          onChange={(event) => {
            setPreferences((prev) => ({
              ...prev,
              linkColorLightness: event.currentTarget.checked,
            }));
          }}
        />
        <Button variant="light" onClick={() => setTheme(SOLARIZED_DEFAULT)}>
          Reset to Solarized Default
        </Button>
      </Stack>
    </Card>
  );
}

function ColorBox({
  name,
  uses,
  contrastDark,
  contrastLight,
}: {
  name: SolarizedThemeColorName;
  uses?: string[];
  contrastDark?: boolean;
  contrastLight?: boolean;
}) {
  const [theme] = useAtom(themeAtom);
  const [selectedColor, setSelectedColor] = useAtom(selectedColorAtom);
  const selected = selectedColor === name;
  const onClick = () => {
    setSelectedColor(selected ? null : name);
  };
  const color = theme.get(name);
  const fgColor = getFgColor(color).toString({ format: 'oklch' });
  return (
    <Box
      style={{
        backgroundColor: color.to('srgb').toString(),
        color: fgColor,
        fontFamily: 'var(--mantine-font-family-monospace)',
        lineHeight: 1.1,
        fontSize: '12px',
        fontWeight: 500,
        boxSizing: 'content-box',
        padding: 16,
        border: 'none',
        boxShadow: selected ? `inset 0 0 3px 1px ${fgColor}` : 'none',
      }}
      onClick={onClick}
    >
      <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{name}</span>
      <br />
      <span style={{ fontSize: '14px' }}>
        {color.to('srgb').toString({ format: 'hex' })}
      </span>
      {uses ? (
        <>
          <br />
          {uses.join(' • ')}
        </>
      ) : null}
      {contrastDark && (
        <>
          <br />
          Dark: {theme.darkBg.contrast(color, 'APCA').toFixed(1)}
        </>
      )}
      {contrastLight && (
        <>
          <br />
          Light: {theme.lightBg.contrast(color, 'APCA').toFixed(1)}
        </>
      )}
    </Box>
  );
}
