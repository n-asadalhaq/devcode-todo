import { Box, Button, Flex, Title } from '@mantine/core';

interface PageHeaderProps {
  title: string | React.ReactNode;
  titleProps?: Record<string, any>;
  trailing?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  trailing,
  titleProps,
}) => {
  return (
    <Box w="100%">
      <Flex align="center" justify="space-between">
        {typeof title === 'string' ? (
          <Title size="h1" order={2} {...titleProps}>
            {title}
          </Title>
        ) : (
          title
        )}
        {trailing && trailing}
      </Flex>
    </Box>
  );
};
