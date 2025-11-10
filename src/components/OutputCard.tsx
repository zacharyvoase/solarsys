import { useState } from 'react';
import {
  Card,
  Stack,
  Tabs,
  Text,
  Group,
  Code,
  ScrollArea,
  CopyButton,
  ActionIcon,
  Tooltip,
  NativeSelect,
  TextInput,
  Input,
  Button,
} from '@mantine/core';
import {
  IconCheck,
  IconCopy,
  IconDownload,
  IconShare,
} from '@tabler/icons-react';
import { useAtom } from 'jotai';
import { useDarkMode } from 'usehooks-ts';

import { EXPORTER_CATEGORIES } from '../outputs';
import type { ExporterConfig } from '../outputs/types';
import { themeAtom, themeNameAtom } from '../state';
import CardTitle from './CardTitle';
import classes from './OutputCard.module.css';
import { createShareableURL } from '../serialization';

export default function OutputCard() {
  const { isDarkMode } = useDarkMode();
  const [theme] = useAtom(themeAtom);
  const [themeName, setThemeName] = useAtom(themeNameAtom);
  const [selectedExporter, setSelectedExporter] = useState<ExporterConfig>(
    EXPORTER_CATEGORIES[0].exporters[0]
  );

  // Compute full theme name with mode suffix
  const fullThemeName = selectedExporter.colorScheme
    ? `${themeName} (${selectedExporter.colorScheme === 'dark' ? 'Dark' : 'Light'})`
    : themeName;

  const shareableURL = createShareableURL(theme, themeName);

  const output = selectedExporter.export(theme, fullThemeName);

  // Determine colors based on the current color scheme
  const bgColor = theme
    .bg(isDarkMode ? 'dark' : 'light')
    .to('srgb')
    .toString({ format: 'hex' });
  const fgColor = theme
    .fg(isDarkMode ? 'dark' : 'light')
    .to('srgb')
    .toString({ format: 'hex' });

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;

    // Generate filename using theme name
    const sanitizedName = fullThemeName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-');
    const defaultFilename = `${sanitizedName}.${selectedExporter.fileExtension || 'txt'}`;
    a.download = selectedExporter.fileName || defaultFilename;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card padding="md" style={{ gridArea: 'OutputCard' }}>
      <Stack gap="md">
        <CardTitle>Output</CardTitle>

        <Input.Wrapper label="Theme Name">
          <Group gap="xs">
            <TextInput
              styles={{ root: { flexGrow: 1 } }}
              value={themeName}
              onChange={(event) => setThemeName(event.currentTarget.value)}
              placeholder="Enter theme name"
            />
            <CopyButton value={shareableURL} timeout={2000}>
              {({ copied, copy }) => (
                <Tooltip
                  label={
                    copied ? 'Copied!' : 'Copy a shareable link to this theme'
                  }
                  withArrow
                >
                  <Button
                    color={copied ? 'teal' : 'blue'}
                    variant="light"
                    onClick={copy}
                    size="sm"
                    rightSection={
                      copied ? <IconCheck size={18} /> : <IconShare size={18} />
                    }
                  >
                    Copy Shareable Link
                  </Button>
                </Tooltip>
              )}
            </CopyButton>
          </Group>
        </Input.Wrapper>

        <Tabs
          defaultValue={EXPORTER_CATEGORIES[0].id}
          onChange={(value) => {
            const category = EXPORTER_CATEGORIES.find(
              (cat) => cat.id === value
            );
            if (category && category.exporters.length > 0) {
              setSelectedExporter(category.exporters[0]);
            }
          }}
        >
          <Tabs.List>
            {EXPORTER_CATEGORIES.map((category) => (
              <Tabs.Tab key={category.id} value={category.id}>
                {category.name}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          {EXPORTER_CATEGORIES.map((category) => (
            <Tabs.Panel key={category.id} value={category.id} pt="md">
              <NativeSelect
                value={selectedExporter.id}
                onChange={(event) => {
                  const exporter = category.exporters.find(
                    (exp) => exp.id === event.currentTarget.value
                  );
                  if (exporter) {
                    setSelectedExporter(exporter);
                  }
                }}
                data={category.exporters.map((exporter) => ({
                  value: exporter.id,
                  label: exporter.name,
                }))}
              />
            </Tabs.Panel>
          ))}
        </Tabs>

        <Stack gap="xs">
          <Group justify="space-between">
            <Text size="xs" c="dimmed">
              {selectedExporter.description}
            </Text>
            <Group gap="xs">
              <CopyButton value={output} timeout={2000}>
                {({ copied, copy }) => (
                  <Tooltip
                    label={copied ? 'Copied' : 'Copy'}
                    withArrow
                    position="left"
                  >
                    <ActionIcon
                      color={copied ? 'teal' : 'gray'}
                      variant="subtle"
                      onClick={copy}
                    >
                      {copied ? (
                        <IconCheck size={16} />
                      ) : (
                        <IconCopy size={16} />
                      )}
                    </ActionIcon>
                  </Tooltip>
                )}
              </CopyButton>
              <Tooltip label="Download" withArrow position="left">
                <ActionIcon variant="subtle" onClick={handleDownload}>
                  <IconDownload size={16} />
                </ActionIcon>
              </Tooltip>
            </Group>
          </Group>
        </Stack>

        <ScrollArea h="60vh" type="auto" bdrs="sm">
          <Code
            block
            className={classes.codeBlock}
            style={{
              backgroundColor: bgColor,
              color: fgColor,
            }}
          >
            {output}
          </Code>
        </ScrollArea>
      </Stack>
    </Card>
  );
}
