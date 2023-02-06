import { Box, Flex } from '@mantine/core';
import { isEmpty } from 'lodash';
import Image from 'next/image';

import { cySelectors } from '@/constants/cy-selectors';
import { Todo } from '@/types/index';

import { TodoItem } from '../todo-item';

interface TodoListProps {
  todos: Todo[];
  onDeleteClick: (todo: Todo) => any;
  onEditClick: (todo: Todo) => any;
  onCheckClick: (todo: Todo) => Promise<any>;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onDeleteClick,
  onEditClick,
  onCheckClick,
}) => {
  return (
    <Box w="100%">
      {isEmpty(todos) ? (
        <Flex justify="center" align="center">
          <Image
            width={767}
            height={490}
            src="/assets/illustrations/todo-empty-state.svg"
            alt="You don't have any todo. Click add button to create one."
            data-cy={cySelectors['todo-empty-state']}
          />
        </Flex>
      ) : (
        <Flex direction="column" rowGap={10}>
          {todos.map((item) => (
            <TodoItem
              key={item.id}
              todo={item}
              onDeleteIconClick={() => onDeleteClick(item)}
              onCheckClick={({ currentTarget }) =>
                onCheckClick({
                  ...item,
                  isActive: !currentTarget.checked,
                })
              }
              onEditIconClick={() => onEditClick(item)}
            />
          ))}
        </Flex>
      )}
    </Box>
  );
};

export { TodoList };
