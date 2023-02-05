import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Flex,
  UnstyledButton,
} from '@mantine/core';

import { cySelectors } from '@/constants/cy-selectors';
import { Activity } from '@/types/index';

interface ActivityItemProps {
  activity: Activity;
}

const dateFormatter = new Intl.DateTimeFormat('id', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export const ActivityItem: React.FC<ActivityItemProps> = ({ activity }) => {
  return (
    <Card
      shadow="sm"
      p="lg"
      radius="md"
      h={234}
      data-cy={cySelectors['activity-item']}
    >
      <Flex direction="column" justify="space-between" h="100%">
        <Text size="md" weight="700">
          {activity.title}
        </Text>
        <Flex justify="space-between" align="center">
          <Text size="xs" color="gray.3">
            {dateFormatter.format(activity.createdAt)}
          </Text>
          <UnstyledButton>
            <Image
              src="/assets/icons/trash.svg"
              w={24}
              h={24}
              alt="Hapus activity"
            />
          </UnstyledButton>
        </Flex>
      </Flex>
    </Card>
  );
};
