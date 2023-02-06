import { Box, Flex, SimpleGrid } from '@mantine/core';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { ActivityItem } from '@/components/activity-item';
import { Activity } from '@/types/index';

interface ActivityListProps {
  activities: Activity[];
  onDeleteClick: (activity: Activity) => any;
}

const ActivityList: React.FC<ActivityListProps> = ({
  activities,
  onDeleteClick,
}) => {
  const router = useRouter();

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
            <ActivityItem
              key={item.id}
              activity={item}
              onDeleteIconClick={() => onDeleteClick(item)}
              onClick={() => {
                router.push(`/activity/${item.id}`);
              }}
            />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export { ActivityList };
