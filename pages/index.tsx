import {
  AppShell,
  Box,
  Button,
  Center,
  Text,
  Flex,
  Header,
  Loader,
  SimpleGrid,
  Title,
} from '@mantine/core';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import useSWR from 'swr';

import { ActivityItem } from '@/components/activity-item';
import { PageHeader } from '@/components/page-header';
import { cySelectors } from '@/constants/cy-selectors';
import { Activity } from '@/types/index';

import { baseUrl } from '../constants';

interface ActivityListProps {
  activities: Activity[];
}

const pageSpacings = {
  horizontal: '220px',
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const {
    data: activities,
    isLoading,
    error,
  } = useSWR(`${baseUrl}/activity-groups?email=n.asadalhaq@gmail.com`, fetcher);

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
      <Flex direction="column" px={pageSpacings.horizontal} h="100%">
        <PageHeader
          title="Activity"
          titleProps={{
            'data-cy': cySelectors['activity-title'],
          }}
          trailing={<Button>Tambah</Button>}
        />
        <Box w="100%" mih="100%">
          {isLoading ? (
            <Center h="100%">
              <Flex direction="column" align="center" justify="center">
                <Loader />
                <Text color="gray">Memuat activity</Text>
              </Flex>
            </Center>
          ) : (
            <ActivityList activities={activities.data} />
          )}
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
