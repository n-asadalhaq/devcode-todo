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
import { initial, isNil, startCase } from 'lodash';
import { useEffect, useState } from 'react';

import { todoPriority } from '@/constants/todo-priority';
import { NewTodo, Todo, TodoPriority } from '@/types/index';

// import { cySelectors } from '@/constants/cy-selectors';

interface CreateTodoModal extends ModalProps {
  // TODO: better typing
  // cyId: keyof typeof cySelectors;
  cyId: string;
  initialTodo?: Todo | null;
  onConfirmClick: (newTodo: NewTodo) => void;
  isLoading?: boolean;
}

const initNewTodo: NewTodo = {
  title: '',
  priority: 'very-high',
};
const CreateTodoModal: React.FC<CreateTodoModal> = ({
  opened,
  initialTodo,
  cyId,
  onClose,
  onConfirmClick,
  isLoading,
}) => {
  const [newTodo, setNewTodo] = useState<NewTodo>(
    !isNil(initialTodo) ? initialTodo : initNewTodo,
  );

  const priorityOptions = todoPriority.map((p) => ({
    value: p,
    label: startCase(p === 'normal' ? 'medium' : p),
  }));

  useEffect(() => {
    if (!isNil(initialTodo)) {
      setNewTodo(initialTodo);
    }
  }, [opened, initialTodo]);

  useEffect(() => {
    if (!opened) {
      setNewTodo(initNewTodo);
    }
  }, [opened]);

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
            value={newTodo.priority}
            onChange={(v: TodoPriority) => {
              setNewTodo((prev) => ({
                ...prev,
                priority: v,
              }));
            }}
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

export { CreateTodoModal };
