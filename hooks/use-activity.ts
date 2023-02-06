import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { baseUrl, email } from '@/constants/api';
import { RawTodo, Todo } from '@/types/index';

const todoAPIHandlers = {
  // TODO: Implement
  async add() {},
  async delete() {},
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
            createdAt: new Date(item.created_at),
            updatedAt: item?.updated_at ? new Date(item?.updated_at) : null,
            deletedAt: item?.deleted_at ? new Date(item?.deleted_at) : null,
            isActive: Boolean(Number(item.is_active)),
          }),
        ),
      );
  },
  async update() {},
  // async fetchOne() {},
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
