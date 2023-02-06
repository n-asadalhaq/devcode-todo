import {
  Box,
  Button,
  Center,
  Text,
  Flex,
  Loader,
  Title,
  TextInput,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { PageHeader } from '@/components/page-header';
import { cySelectors } from '@/constants/cy-selectors';
import { fontSizes } from '@/theme/typography';
import { useActivity } from 'hooks/use-activity';

const ActivityDetail = () => {
  const router = useRouter();

  const { id } = router.query;

  // TODO: Don't refetch activity
  const { isLoading, activity, update } = useActivity(Number(id));

  const [opened, { toggle }] = useDisclosure(false);

  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const [activityTitle, setActivityTitle] = useState(activity.title);

  useEffect(() => {
    if (isEmpty(activityTitle)) setActivityTitle(activity.title);
  }, [activity.title, activityTitle]);

  const renderActivityTitle = () => {
    if (isEditingTitle) {
      return (
        <TextInput
          styles={{
            input: {
              fontWeight: 'bold',
              fontSize: fontSizes.xl,
              margin: 0,
              height: 46,
            },
            wrapper: {
              borderBottom: `1px solid black`,
              boxSizing: 'border-box',
            },
          }}
          variant="unstyled"
          size="md"
          value={activityTitle}
          onChange={({ target }) => {
            setActivityTitle(target.value);
          }}
        />
      );
    }

    return (
      <Title order={2} size="h1" data-cy={cySelectors['activity-title']}>
        {activity.title}
      </Title>
    );
  };

  return (
    <Flex direction="column" px={220} h="100%">
      {!isLoading && (
        <PageHeader
          title={
            <Flex direction="row" w={405}>
              <UnstyledButton onClick={() => router.back()}>
                <Image
                  src="/assets/icons/chevron-left.svg"
                  width={24}
                  height={24}
                  alt="Pencil"
                />
              </UnstyledButton>
              <Box style={{ flex: 2 }}>{renderActivityTitle()}</Box>
              <UnstyledButton
                onClick={async () => {
                  if (isEditingTitle) {
                    await update({ id: Number(id), title: activityTitle });
                    setIsEditingTitle(false);
                  } else {
                    setIsEditingTitle(true);
                  }
                }}
              >
                <Image
                  src="/assets/icons/edit-icon.svg"
                  width={24}
                  height={24}
                  alt="Pencil"
                />
              </UnstyledButton>
            </Flex>
          }
          trailing={
            <Button
              aria-label="tambah"
              data-cy={cySelectors['activity-add-button']}
              onClick={() => {
                toggle();
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
      )}

      <Box w="100%" mih="100%">
        {isLoading ? (
          <Center h="100%">
            <Flex direction="column" align="center" justify="center">
              <Loader />
              <Text color="gray">Memuat activity</Text>
            </Flex>
          </Center>
        ) : (
          <Text> </Text>
        )}
      </Box>
    </Flex>
  );
};

export default ActivityDetail;
