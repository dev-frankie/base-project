'use client';

import { useTodoStore } from '@/features/todo';
import { TodoItem, CreateTodoForm } from '@/features/todo';

export const TodoList = () => {
  const todos = useTodoStore((state) => state.todos);
  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">할 일 목록</h2>
        <span className="text-sm text-gray-600">
          완료: {completedCount} / 전체: {todos.length}
        </span>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">새 할 일 추가</h3>
        <CreateTodoForm />
      </div>

      <div className="space-y-3">
        {todos.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>할 일이 없습니다. 새로운 할 일을 추가해보세요!</p>
          </div>
        ) : (
          todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        )}
      </div>
    </div>
  );
};

