import { Group, MantineProvider, Stack, Title } from '@mantine/core';

import classes from './App.module.css';
import PreviewCard from './components/PreviewCard';
import SingleColorEditorCard from './components/SingleColorEditorCard';
import ThemeDisplay from './components/ThemeDisplay';
import { theme as mantineTheme } from './mantineTheme';

function App() {
  return (
    <MantineProvider theme={mantineTheme} defaultColorScheme="auto">
      <Stack style={{ width: 'auto' }}>
        <Title order={1} className={classes.header}>
          SolarSystem
        </Title>
        <Group align="start">
          <ThemeDisplay />
          <PreviewCard />
          <SingleColorEditorCard />
        </Group>
      </Stack>
    </MantineProvider>
  );
}

export default App;
