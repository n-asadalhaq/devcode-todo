import { Box } from '@mantine/core';

import { cySelectors } from '@/constants/cy-selectors';
import { priorityColors } from '@/theme/colors';
import { TodoPriority } from '@/types/index';

const getPriorityColor = (priority: TodoPriority) => {
  switch (priority) {
    case 'very-high':
      return priorityColors[4];
    case 'high':
      return priorityColors[3];
    case 'normal':
      return priorityColors[2];
    case 'low':
      return priorityColors[1];
    case 'very-low':
      return priorityColors[0];
  }
};

const Bullet: React.FC<{ priority: TodoPriority }> = ({ priority }) => (
  <Box
    w={12}
    h={12}
    data-cy={cySelectors['todo-item-priority-indicator']}
    bg={getPriorityColor(priority)}
    style={{ borderRadius: '100%' }}
  />
);

export { Bullet };
