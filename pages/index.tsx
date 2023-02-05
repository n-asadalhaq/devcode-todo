import {
  AppShell,
  Box,
  Button,
  Flex,
  Header,
  SimpleGrid,
  Title,
} from '@mantine/core';
import { isEmpty } from 'lodash';
import Image from 'next/image';

import { ActivityItem } from '@/components/activity-item';
import { PageHeader } from '@/components/page-header';
import { cySelectors } from '@/constants/cy-selectors';
import { Activity } from '@/types/index';

interface ActivityListProps {
  activities: Activity[];
}

const pageSpacings = {
  horizontal: '220px',
};

export default function Home() {
  return (
    <AppShell
      padding="md"
      header={
        <Header height={105}>
          <Flex
            h="100%"
            bg="blue.3"
            px={pageSpacings.horizontal}
            align="center"
          >
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
      <Flex direction="column" px={pageSpacings.horizontal}>
        <PageHeader
          title="Activity"
          titleProps={{
            'data-cy': cySelectors['activity-title'],
          }}
          trailing={<Button>Tambah</Button>}
        />
        <Box w="100%">
          <ActivityList activities={[]} />{' '}
        </Box>
      </Flex>
    </AppShell>
  );
}

export const ActivityList: React.FC<ActivityListProps> = ({ activities }) => {
  return (
    <Box w="100%">
      {isEmpty(activities) ? (
        <Flex justify="center" align="center">
          <Image
            width={767}
            height={490}
            src="/assets/illustrations/empty-state.svg"
            alt="You don't have any activity. Click add button to create one."
          />
        </Flex>
      ) : (
        <SimpleGrid cols={4} spacing={26}>
          {activities.map((item) => (
            <ActivityItem key={item.id} activity={item} />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};
