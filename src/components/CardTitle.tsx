import { Title } from '@mantine/core';

export default function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <Title
      order={2}
      style={{
        fontSize: 16,
      }}
    >
      {children}
    </Title>
  );
}
