import { Box, Button, Card, Stack, Switch, Group } from '@mantine/core';
import { useAtom } from 'jotai';

import {
  SOLARIZED_DEFAULT,
  type SolarizedThemeColorName,
  getFgColor,
} from '../solarized';
import { themeAtom, selectedColorAtom, preferencesAtom } from '../state';
import classes from './ThemeDisplay.module.css';

export default function ThemeDisplay() {
  const [preferences, setPreferences] = useAtom(preferencesAtom);
  const [, setTheme] = useAtom(themeAtom);

  return (
    <Card padding="md" style={{ gridArea: 'ThemeDisplay' }}>
      <Stack>
        <Box
          display="grid"
          style={{
            gridTemplateColumns: 'repeat(2, 1fr)',
            gridTemplateRows: 'repeat(8, auto)',
            gridAutoFlow: 'column',
            gap: 'var(--mantine-spacing-xs)',
          }}
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
        <Group justify="space-between" wrap="nowrap">
          <Button
            variant="light"
            onClick={() => setTheme(SOLARIZED_DEFAULT)}
            style={{ flex: 1 }}
          >
            Reset to Solarized Default
          </Button>
        </Group>
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
      className={[classes.colorBox, selected ? classes.selected : ''].join(' ')}
      style={{
        backgroundColor: color.to('srgb').toString(),
        color: fgColor,
        '--fg-color': fgColor,
      }}
      onClick={onClick}
    >
      <span
        className={classes.name}
        style={{ fontWeight: 'bold', fontSize: '14px' }}
      >
        {name}
      </span>
      <span className={classes.hex} style={{ fontSize: '14px' }}>
        {color.to('srgb').toString({ format: 'hex' })}
      </span>
      {uses ? (
        <ul className={classes.uses} style={{ fontSize: '12px' }}>
          {uses.map((use) => (
            <li key={use}>{use}</li>
          ))}
        </ul>
      ) : null}
      {contrastDark || contrastLight ? (
        <ul className={classes.contrasts}>
          {contrastDark && (
            <li>
              <span className={classes.contrastLabel}>Dark</span>
              <span className={classes.contrastValue}>
                {theme.darkBg.contrast(color, 'APCA').toFixed(1)}
              </span>
            </li>
          )}
          {contrastLight && (
            <li>
              <span className={classes.contrastLabel}>Light</span>
              <span className={classes.contrastValue}>
                {theme.lightBg.contrast(color, 'APCA').toFixed(1)}
              </span>
            </li>
          )}
        </ul>
      ) : null}
    </Box>
  );
}
