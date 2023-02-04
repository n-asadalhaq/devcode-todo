import { AppShell, Button, Header, Navbar, Title } from '@mantine/core';

export default function Home() {
  return (
    <AppShell
      padding="md"
      header={
        <Header height={60}>
          <Title>TO DO LIST APP</Title>
        </Header>
      }
    >
      Activity
    </AppShell>
  );
}
