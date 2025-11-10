import { Group, MantineProvider, Title } from '@mantine/core';

import classes from './App.module.css';
import OutputCard from './components/OutputCard';
import PreviewCard from './components/PreviewCard';
import SingleColorEditorCard from './components/SingleColorEditorCard';
import ThemeDisplay from './components/ThemeDisplay';
import { theme as mantineTheme } from './mantineTheme';

function App() {
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
