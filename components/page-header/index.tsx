import { Box, Button, Flex, Title } from '@mantine/core';
import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  titleProps?: Record<string, any>;
  trailing?: ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  trailing,
  titleProps,
}) => {
  return (
    <Box w="100%">
      <Flex align="center" justify="space-between">
        <Title size="h1" order={2} {...titleProps}>
          {title}
        </Title>
        {trailing && trailing}
      </Flex>
    </Box>
  );
};
