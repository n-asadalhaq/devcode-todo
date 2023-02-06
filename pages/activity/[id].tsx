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
  Card,
  Checkbox,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { isEmpty, isNil } from 'lodash';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { RemoveButton } from '@/components/buttons/remove';
import { CreateTodoDialog } from '@/components/modals/create-todo';
import { RemoveItemDialog } from '@/components/modals/remove-item';
import { PageHeader } from '@/components/page-header';
import { cySelectors } from '@/constants/cy-selectors';
import { fontSizes } from '@/theme/typography';
import { NewTodo, Todo } from '@/types/index';
import { useActivity } from 'hooks/use-activity';

const ActivityDetail = () => {
  const router = useRouter();

  const { id } = router.query;

  // TODO: Don't refetch activity
  const { isLoading, activity, update, todoMutation } = useActivity(Number(id));

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

  const [deleteTarget, setDeleteTarget] = useState<Todo | null>(null);

  return (
    <Flex direction="column" h="100%">
      {!isLoading && (
        <Box pb={54}>
          <PageHeader
            title={
              <Flex direction="row" miw={405} w="auto" columnGap={22}>
                <UnstyledButton
                  onClick={() => router.back()}
                  data-cy={cySelectors['todo-back-button']}
                >
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
                data-cy={cySelectors['todo-add-button']}
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
        </Box>
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
          <>
            <RemoveItemDialog
              isLoading={isLoading}
              dialogMessage={
                deleteTarget && (
                  <Text size="md" align="center">
                    Apakah anda yakin menghapus item
                    <Text weight="700">“{deleteTarget.title}”?</Text>
                  </Text>
                )
              }
              cyId={cySelectors['modal-delete']}
              onClose={() => {
                setDeleteTarget(null);
              }}
              opened={!isNil(deleteTarget)}
              onConfirmClick={async () => {
                if (isNil(deleteTarget)) return;

                await todoMutation.delete({ todoId: deleteTarget.id });
                setDeleteTarget(null);
              }}
            />
            <CreateTodoDialog
              opened={opened}
              onClose={toggle}
              cyId={cySelectors['modal-add']}
              onConfirmClick={async (newTodo: NewTodo) => {
                if (!isNil(newTodo)) {
                  await todoMutation.add({
                    activityId: Number(id),
                    todo: newTodo,
                  });
                  toggle();
                }
              }}
            />
            <TodoList
              todos={activity.todos || []}
              onDeleteClick={(todo: Todo) => setDeleteTarget(todo)}
              onEditClick={(todo: Todo) => {}}
              onCheckClick={(todo: Todo) => {}}
            />
          </>
        )}
      </Box>
    </Flex>
  );
};

interface TodoListProps {
  todos: Todo[];
  onDeleteClick: (todo: Todo) => any;
  onEditClick: (todo: Todo) => any;
  onCheckClick: (todo: Todo) => any;
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
        <Flex direction="column" rowGap={26}>
          {todos.map((item) => (
            <TodoItem
              key={item.id}
              todo={item}
              onDeleteIconClick={() => onDeleteClick(item)}
              onCheckClick={() => onCheckClick(item)}
              onEditIconClick={() => onEditClick(item)}
            />
          ))}
        </Flex>
      )}
    </Box>
  );
};

interface TodoItemProps {
  todo: Todo;
  onDeleteIconClick: VoidFunction;
  onCheckClick: VoidFunction;
  onEditIconClick: VoidFunction;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onDeleteIconClick,
  onEditIconClick,
  onCheckClick,
}) => {
  return (
    <Card>
      <Flex>
        <Flex style={{ flex: 1 }} align="center" columnGap={8} w="100%">
          <Checkbox checked={!todo.isActive} onChange={onCheckClick} />
          <Text size="md" weight="normal">
            {todo.title}
          </Text>
          <UnstyledButton onClick={onEditIconClick}>
            <Image
              src="/assets/icons/edit-icon.svg"
              width={24}
              height={24}
              alt="Pencil"
            />
          </UnstyledButton>
        </Flex>
        <Flex align="center">
          <RemoveButton onClick={onDeleteIconClick} alt="Hapus Todo" />
        </Flex>
      </Flex>
    </Card>
  );
};

export default ActivityDetail;
