import { Box, Button, Center, Text, Flex, Loader } from '@mantine/core';
import { isNil } from 'lodash';
import Image from 'next/image';
import { useState } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { ActivityList } from '@/components/activity-list';
import { NotificationModal } from '@/components/modals/notification';
import { RemoveItemModal } from '@/components/modals/remove-item';
import { PageHeader } from '@/components/page-header';
import { baseUrl, email } from '@/constants/api';
import { cySelectors } from '@/constants/cy-selectors';
import { Activity } from '@/types/index';

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
  const [showNotification, setShowNotification] = useState<boolean>(false);

  return (
    <Flex direction="column" h="100%">
      <Box pb={54}>
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
      </Box>
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
            <NotificationModal
              opened={showNotification}
              onClose={() => {
                setShowNotification(false);
              }}
            />
            <RemoveItemModal
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
                setShowNotification(true);
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
  );
}

export default Home;
