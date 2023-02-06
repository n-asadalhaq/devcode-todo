import { Card, Flex, Text, Checkbox, UnstyledButton } from '@mantine/core';
import Image from 'next/image';
import { ChangeEventHandler } from 'react';

import { cySelectors } from '@/constants/cy-selectors';
import { Todo } from '@/types/index';

import { Bullet } from '../bullet';
import { RemoveButton } from '../buttons/remove';

interface TodoItemProps {
  todo: Todo;
  onDeleteIconClick: VoidFunction;
  onCheckClick: ChangeEventHandler<HTMLInputElement>;
  onEditIconClick: VoidFunction;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onDeleteIconClick,
  onEditIconClick,
  onCheckClick,
}) => {
  return (
    <Card shadow="xl" radius="lg" p={27}>
      <Flex>
        <Flex style={{ flex: 1 }} align="center" columnGap={12} w="100%">
          <Checkbox
            checked={!todo.isActive}
            onChange={onCheckClick}
            data-cy={cySelectors['todo-item-checkbox']}
          />
          <Bullet priority={todo.priority} />
          <Text
            size="md"
            weight="normal"
            data-cy={cySelectors['todo-item-title']}
          >
            {todo.title}
          </Text>
          <UnstyledButton onClick={onEditIconClick}>
            <Image
              src="/assets/icons/edit-icon.svg"
              width={24}
              height={24}
              alt="Pencil"
              data-cy={cySelectors['todo-item-edit-button']}
            />
          </UnstyledButton>
        </Flex>
        <Flex align="center">
          <RemoveButton
            cyId={cySelectors['todo-item-delete-button']}
            onClick={onDeleteIconClick}
            alt="Hapus Todo"
          />
        </Flex>
      </Flex>
    </Card>
  );
};

export { TodoItem };
