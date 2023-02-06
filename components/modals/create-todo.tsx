import {
  Box,
  Button,
  Flex,
  Modal,
  ModalProps,
  Select,
  Text,
  TextInput,
} from '@mantine/core';
import { startCase } from 'lodash';
import { useEffect, useState } from 'react';

import { todoPriority } from '@/constants/todo-priority';
import { NewTodo, Todo, TodoPriority } from '@/types/index';

// import { cySelectors } from '@/constants/cy-selectors';

interface CreateTodoDialog extends ModalProps {
  // TODO: better typing
  // cyId: keyof typeof cySelectors;
  cyId: string;
  onConfirmClick: (newTodo: NewTodo) => void;
  isLoading?: boolean;
}

const initNewTodo: NewTodo = {
  title: '',
  priority: 'very-high',
};
const CreateTodoDialog: React.FC<CreateTodoDialog> = ({
  opened,
  cyId,
  onClose,
  onConfirmClick,
  isLoading,
}) => {
  const [newTodo, setNewTodo] = useState<NewTodo>(initNewTodo);

  const priorityOptions = todoPriority.map((p) => ({
    value: p,
    label: startCase(p),
  }));

  useEffect(() => {
    if (!opened) {
      setNewTodo(initNewTodo);
    }
  }, [opened, newTodo]);

  return (
    <Modal
      opened={opened}
      size="md"
      data-cy={cyId}
      onClose={onClose}
      withCloseButton={false}
    >
      <Box p={8}>
        <Flex direction="column" align="center" justify="center" rowGap={40}>
          <TextInput
            onChange={({ target }) => {
              setNewTodo((prev) => ({
                ...prev,
                title: target.value,
              }));
            }}
            value={newTodo?.title}
          />

          <Select
            data={priorityOptions}
            value={newTodo?.priority ?? 'very-high'}
          />

          <Flex justify="center" align="flex-end">
            <Button size="lg" loading={isLoading}>
              <Text
                color="white"
                size="md"
                weight="600"
                onClick={() => onConfirmClick(newTodo)}
              >
                Simpan
              </Text>
            </Button>
          </Flex>
        </Flex>
      </Box>
    </Modal>
  );
};

export { CreateTodoDialog };
