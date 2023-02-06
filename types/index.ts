import { todoPriority } from '@/constants/todo-priority';

interface Activity {
  title: string;
  id: number;
  createdAt: Date;
  todos?: Todo[];
}

interface Todo {
  id: number;
  activityGroupId: string;
  title: string;
  isActive: boolean;
  priority: TodoPriority;
  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

type NewTodo = Pick<Todo, 'title' | 'priority'> &
  Partial<Pick<Todo, 'isActive'>>;

type TodoPriority = (typeof todoPriority)[number];

// enum TodoPriority {
//   'very-high' = 'very-high',
//   'high' = 'high',
//   'medium' = 'medium',
//   'low' = 'low',
//   'very-low' = 'very-low',
// }

interface RawTodo {
  id: number;
  activity_group_id: string;
  title: string;
  is_active: string;
  priority: TodoPriority;
  created_at: string;
  updated_at?: string;
  deleted_at?: string;
}

export type { Activity, Todo, TodoPriority, RawTodo, NewTodo };
