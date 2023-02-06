import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { baseUrl, email } from '@/constants/api';
import { NewTodo, RawTodo, Todo } from '@/types/index';

const todoBaseUrl = `${baseUrl}/todo-items`;

const todoAPIHandlers = {
  async add(
    url: string,
    { arg }: { arg: { activityId: number; todo: NewTodo } },
  ) {
    const { activityId, todo } = arg;
    return await fetch(todoBaseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: todo.title,
        activity_group_id: activityId,
        priority: todo.priority,
      }),
    });
  },
  async delete(urL: string, { arg }: { arg: { todoId: number } }) {
    const { todoId } = arg;
    return fetch(`${todoBaseUrl}/${todoId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: '',
    });
  },
  async fetchAll(
    url: string,
    { activityId }: { activityId: number },
  ): Promise<Todo[]> {
    return fetch(`${baseUrl}/todo-items?activity_group_id=${activityId}`)
      .then((res) => res.json())
      .then((res) =>
        res.data.map(
          (item: RawTodo): Todo => ({
            ...item,
            activityGroupId: item.activity_group_id,
            createdAt: new Date(item.created_at),
            updatedAt: item?.updated_at ? new Date(item?.updated_at) : null,
            deletedAt: item?.deleted_at ? new Date(item?.deleted_at) : null,
            isActive: Boolean(Number(item.is_active)),
          }),
        ),
      );
  },
  async update() {},
};

const activityAPIHandlers = {
  async fetchOne(url: string, activityId: number) {
    return fetch(`${baseUrl}/activity-groups/${activityId}`).then((res) =>
      res.json(),
    );
  },
  async update(_: string, { arg }: { arg: { id: number; title: string } }) {
    return fetch(`${baseUrl}/activity-groups/${arg.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: arg.title }),
    }).then((res) => res.json());
  },
};

const useActivity = (activityId: number) => {
  const swrTodoId = `activity/${activityId}/todos`;

  const { trigger: triggerAddTodo, isMutating: isAddTodoLoading } =
    useSWRMutation(swrTodoId, todoAPIHandlers.add);

  const { trigger: triggerDeleteTodo, isMutating: isDeleteTodoLoading } =
    useSWRMutation(swrTodoId, todoAPIHandlers.delete);

  const { trigger: triggerUpdateTodo, isMutating: isUpdateTodoLoading } =
    useSWRMutation(swrTodoId, todoAPIHandlers.update);

  const {
    data: activity,
    isLoading: fetchActivityLoading,
    error,
  } = useSWR(
    () => (Number.isNaN(activityId) ? null : `activity/${activityId}`),
    (url) => activityAPIHandlers.fetchOne(url, activityId),
    { fallbackData: {} },
  );

  const {
    trigger: triggerUpdateActivity,
    isMutating: isUpdateActivityLoading,
  } = useSWRMutation(`activity/${activityId}`, activityAPIHandlers.update);

  const {
    data: todos,
    isLoading: fetchTodosLoading,
    isValidating,
  } = useSWR(
    swrTodoId,
    (url) => todoAPIHandlers.fetchAll(url, { activityId: activityId }),
    { fallbackData: [] },
  );

  return {
    activity: {
      ...activity,
      todos: todos,
    },
    update: triggerUpdateActivity,
    todoMutation: {
      add: triggerAddTodo,
      delete: triggerDeleteTodo,
      update: triggerUpdateTodo,
    },
    isMutating: isAddTodoLoading || isDeleteTodoLoading || isUpdateTodoLoading,
    isLoading: fetchActivityLoading,
  };
};

export { useActivity };
