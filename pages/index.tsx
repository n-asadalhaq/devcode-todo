import {
  AppShell,
  Box,
  Button,
  Center,
  Text,
  Flex,
  Header,
  Loader,
  Title,
} from '@mantine/core';
import { isEmpty, isNil } from 'lodash';
import Image from 'next/image';
import { useState } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { ActivityList } from '@/components/activity-list';
import { RemoveItemDialog } from '@/components/dialogs/remove-item';
import { PageHeader } from '@/components/page-header';
import { cySelectors } from '@/constants/cy-selectors';
import { Activity } from '@/types/index';

import { baseUrl, email } from '../constants/api';

const pageSpacings = {
  horizontal: '220px',
};

const fetchActivities = (url: string) =>
  fetch(`${url}?email=${email}`)
    .then((res) => res.json())
    .then((res) => ({
      ...res,
      data: res.data.map((item: any) => ({
        ...item,
        createdAt: new Date(item?.created_at),
      })),
    }));

const deleteActivity = async (
  url: string,
  { arg }: { arg: { id: number } },
) => {
  return await fetch(`${url}/${arg.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: '',
  });
};

const createActivity = async (url: string) => {
  return await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: 'New Activity',
      email,
    }),
  });
};

function Home() {
  const { data, isLoading, isValidating } = useSWR(
    `${baseUrl}/activity-groups`,
    fetchActivities,
  );

  const activities: Activity[] = isNil(data?.data) ? [] : data.data;

  const { trigger: triggerCreate, isMutating: isCreateLoading } =
    useSWRMutation(`${baseUrl}/activity-groups`, createActivity);

  const { trigger: triggerDelete, isMutating: isDeleteLoading } =
    useSWRMutation(`${baseUrl}/activity-groups`, deleteActivity);

  const [deleteTarget, setDeleteTarget] = useState<Activity | null>(null);

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
          trailing={
            <Button
              aria-label="tambah"
              data-cy={cySelectors['activity-add-button']}
              onClick={() => {
                triggerCreate();
              }}
              leftIcon={
                <Image
                  src="/assets/icons/add.svg"
                  width={14}
                  height={14}
                  alt="Tambah"
                />
              }
            >
              Tambah
            </Button>
          }
        />
        <Box w="100%" mih="100%">
          {isLoading || isValidating || isCreateLoading || isDeleteLoading ? (
            <Center h="100%">
              <Flex direction="column" align="center" justify="center">
                <Loader />
                <Text color="gray">Memuat activity</Text>
              </Flex>
            </Center>
          ) : (
            <>
              <RemoveItemDialog
                isLoading={isDeleteLoading}
                dialogMessage={
                  deleteTarget && (
                    <Text size="md" align="center">
                      Apakah anda yakin menghapus activity
                      <Text weight="700">“{deleteTarget.title}”?</Text>
                    </Text>
                  )
                }
                cyId={cySelectors['modal-delete']}
                onClose={() => {
                  setDeleteTarget(null);
                }}
                opened={!isNil(deleteTarget)}
                onConfirmClick={async () => {
                  if (isNil(deleteTarget)) return;

                  await triggerDelete({ id: deleteTarget.id });
                  setDeleteTarget(null);
                }}
              />
              <ActivityList
                activities={activities}
                onDeleteClick={(id) => setDeleteTarget(id)}
              />
            </>
          )}
        </Box>
      </Flex>
    </AppShell>
  );
}

export default Home;
