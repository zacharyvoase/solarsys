import { Group, MantineProvider, Stack, Title } from '@mantine/core';

import classes from './App.module.css';
import PreviewCard from './components/PreviewCard';
import SingleColorEditorCard from './components/SingleColorEditorCard';
import ThemeDisplay from './components/ThemeDisplay';
import { theme as mantineTheme } from './mantineTheme';

function App() {
  return (
    <MantineProvider theme={mantineTheme} defaultColorScheme="auto">
      <div className={classes.container}>
        <Title order={1} className={classes.header}>
          SolarSystem
        </Title>
        <ThemeDisplay />
        <PreviewCard />
        <SingleColorEditorCard />
      </div>
    </MantineProvider>
  );
}

export default App;
