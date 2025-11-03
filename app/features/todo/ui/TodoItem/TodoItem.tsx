'use client';

import { Button } from '@/shared/ui';
import { useTodoStore } from '../../model/store';
import { type Todo } from '../../model/types';

export interface TodoItemProps {
  todo: Todo;
}

export const TodoItem = ({ todo }: TodoItemProps) => {
  const { toggleTodo, deleteTodo } = useTodoStore();

  return (
    <div
      className={`p-4 border rounded-lg ${
        todo.completed ? 'bg-gray-50 opacity-75' : 'bg-white'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <h3
              className={`font-semibold ${
                todo.completed ? 'line-through text-gray-500' : 'text-gray-900'
              }`}
            >
              {todo.title}
            </h3>
          </div>
          {todo.description && (
            <p
              className={`mt-2 text-sm ${
                todo.completed ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              {todo.description}
            </p>
          )}
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => deleteTodo(todo.id)}
        >
          삭제
        </Button>
      </div>
    </div>
  );
};

