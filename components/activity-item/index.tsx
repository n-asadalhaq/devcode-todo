import { Card, Image, Text, Flex, UnstyledButton } from '@mantine/core';

import { cySelectors } from '@/constants/cy-selectors';
import { Activity } from '@/types/index';

interface ActivityItemProps {
  activity: Activity;
  onDeleteIconClick?: VoidFunction;
  onClick?: VoidFunction;
}

const dateFormatter = new Intl.DateTimeFormat('id', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export const ActivityItem: React.FC<ActivityItemProps> = ({
  activity,
  onDeleteIconClick,
  onClick,
}) => {
  return (
    <Card
      shadow="sm"
      p="lg"
      radius="md"
      h={234}
      data-cy={cySelectors['activity-item']}
      onClick={onClick}
    >
      <Flex direction="column" justify="space-between" h="100%">
        <Text
          size="md"
          weight="700"
          data-cy={cySelectors['activity-item-title']}
        >
          {activity.title}
        </Text>
        <Flex justify="space-between" align="center">
          <Text
            size="xs"
            color="gray.3"
            data-cy={cySelectors['activity-item-date']}
          >
            {dateFormatter.format(activity.createdAt)}
          </Text>
          <UnstyledButton
            onClick={onDeleteIconClick}
            data-cy={cySelectors['activity-item-delete-button']}
          >
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
