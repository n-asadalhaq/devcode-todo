import {
  Box,
  Button,
  Divider,
  Flex,
  Group,
  Modal,
  ModalProps,
  Select,
  Text,
  TextInput,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { initial, isEmpty, isNil, startCase } from 'lodash';
import Image from 'next/image';
import { forwardRef, useEffect, useState } from 'react';

import { cySelectors } from '@/constants/cy-selectors';
import { todoPriority } from '@/constants/todo-priority';
import { priorityColors } from '@/theme/colors';
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

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  label: string;
  bulletColor: string;
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
    bulletColor: getPriorityColor(p),
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
      size="xl"
      data-cy={cyId}
      radius="lg"
      onClose={onClose}
      withCloseButton={false}
      centered={true}
      padding={0}
    >
      <Flex
        direction="row"
        justify="space-between"
        align="center"
        px="lg"
        py="lg"
      >
        <Title order={4}>Edit Item</Title>
        <UnstyledButton onClick={onClose}>
          <Image
            src="/assets/icons/close.svg"
            width={12}
            height={12}
            alt="close button"
          />
        </UnstyledButton>
      </Flex>
      <Divider color="gray.2" />
      <Box py="xl" w="100%" px="lg">
        <Flex direction="column" align="stretch" justify="center" rowGap={26}>
          <TextInput
            size="md"
            label="NAMA LIST ITEM"
            onChange={({ target }) => {
              setNewTodo((prev) => ({
                ...prev,
                title: target.value,
              }));
            }}
            value={newTodo?.title}
          />
          <Select
            data-cy={cySelectors['modal-add-priority-dropdown']}
            size="md"
            label="PRIORITY"
            data={priorityOptions}
            value={newTodo.priority}
            itemComponent={SelectItem}
            icon={<Bullet bulletColor={getPriorityColor(newTodo.priority)} />}
            onChange={(v: TodoPriority) => {
              setNewTodo((prev) => ({
                ...prev,
                priority: v,
              }));
            }}
          />
        </Flex>
      </Box>
      <Divider color="gray.2" />{' '}
      <Flex justify="flex-end" align="center" px="lg" py="lg">
        <Button
          size="lg"
          loading={isLoading}
          disabled={isEmpty(newTodo.title)}
          data-cy={cySelectors['modal-add-save-button']}
          onClick={() => onConfirmClick(newTodo)}
        >
          <Text color="white" size="md" weight="600">
            Simpan
          </Text>
        </Button>
      </Flex>
    </Modal>
  );
};

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

const Bullet: React.FC<{ bulletColor: string }> = ({ bulletColor }) => (
  <Box w={12} h={12} bg={bulletColor} style={{ borderRadius: '100%' }} />
);

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ label, bulletColor, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Flex direction="row" columnGap={8} align="center">
          <Bullet bulletColor={bulletColor} />
          <Text size="md">{label}</Text>
        </Flex>
      </Group>
    </div>
  ),
);

SelectItem.displayName = 'CustomSelectItem';

export { CreateTodoModal };
