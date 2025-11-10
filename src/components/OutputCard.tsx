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
} from '@mantine/core';
import { IconCheck, IconCopy, IconDownload } from '@tabler/icons-react';
import { useAtom } from 'jotai';

import { EXPORTER_CATEGORIES } from '../outputs';
import type { ExporterConfig } from '../outputs/types';
import { themeAtom } from '../state';
import CardTitle from './CardTitle';
import classes from './OutputCard.module.css';

export default function OutputCard() {
  const [theme] = useAtom(themeAtom);
  const [selectedExporter, setSelectedExporter] = useState<ExporterConfig>(
    EXPORTER_CATEGORIES[0].exporters[0]
  );

  const output = selectedExporter.export(theme);

  // Determine colors based on exporter's color scheme
  const bgColor =
    selectedExporter.colorScheme === 'dark'
      ? theme.darkBg.to('srgb').toString({ format: 'hex' })
      : selectedExporter.colorScheme === 'light'
        ? theme.lightBg.to('srgb').toString({ format: 'hex' })
        : undefined;

  const fgColor =
    selectedExporter.colorScheme === 'dark'
      ? theme.darkFg.to('srgb').toString({ format: 'hex' })
      : selectedExporter.colorScheme === 'light'
        ? theme.lightFg.to('srgb').toString({ format: 'hex' })
        : undefined;

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download =
      selectedExporter.fileName ||
      `export.${selectedExporter.fileExtension || 'txt'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card padding="md" style={{ gridArea: 'OutputCard' }}>
      <Stack gap="md">
        <CardTitle>Output</CardTitle>

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
            <Text size="sm" fw={500}>
              {selectedExporter.name}
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
          <Text size="xs" c="dimmed">
            {selectedExporter.description}
          </Text>
        </Stack>

        <ScrollArea h="50vh" type="auto">
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
