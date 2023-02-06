interface Activity {
  title: string;
  id: number;
  createdAt: Date;
  todos?: Todo[];
}

interface Todo {
  id: number;
  activity_group_id: string;
  title: string;
  isActive: boolean;
  priority: TodoPriority;
  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

type TodoPriority = 'very-high' | 'high' | 'medium' | 'low' | 'very-low';

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

export type { Activity, Todo, TodoPriority, RawTodo };
