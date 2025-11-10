import { useEffect } from 'react';
import { Group, MantineProvider, Title } from '@mantine/core';
import { useSetAtom } from 'jotai';

import classes from './App.module.css';
import OutputCard from './components/OutputCard';
import PreviewCard from './components/PreviewCard';
import SingleColorEditorCard from './components/SingleColorEditorCard';
import ThemeDisplay from './components/ThemeDisplay';
import { theme as mantineTheme } from './mantineTheme';
import { parseThemeFromURL, clearURLParams } from './serialization';
import { themeAtom, themeNameAtom } from './state';

function App() {
  const setTheme = useSetAtom(themeAtom);
  const setThemeName = useSetAtom(themeNameAtom);

  // Load theme from URL on mount
  useEffect(() => {
    const { theme, name } = parseThemeFromURL();

    if (theme) {
      setTheme(theme);
      if (name) {
        setThemeName(name);
      }
      // Remove query params from URL without navigation
      clearURLParams();
    }
  }, [setTheme, setThemeName]);

  return (
    <MantineProvider theme={mantineTheme} defaultColorScheme="auto">
      <div className={classes.container}>
        <Group className={classes.header}>
          <Title order={1}>SolarSystem</Title>
        </Group>

        <ThemeDisplay />
        <PreviewCard />
        <SingleColorEditorCard />
        <OutputCard />
      </div>
    </MantineProvider>
  );
}

export default App;
