import { AppShell, Header, Flex, Title } from '@mantine/core';

import { cySelectors } from '@/constants/cy-selectors';

const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <AppShell
      padding="md"
      header={
        <Header height={105}>
          <Flex h="100%" bg="blue.3" px="220px" align="center">
            <Title
              data-cy={cySelectors['header-title']}
              size="h2"
              order={1}
              color="white"
            >
              TO DO LIST APP
            </Title>
          </Flex>
        </Header>
      }
      styles={(theme) => ({
        main: {
          background: theme.colors.gray[1],
        },
      })}
    >
      {children}
    </AppShell>
  );
};

export { DefaultLayout };
