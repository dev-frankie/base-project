import { create } from 'zustand';

import { type Todo, type CreateTodoDto, type UpdateTodoDto } from './types';

interface TodoState {
  todos: Todo[];
  addTodo: (todo: CreateTodoDto) => void;
  updateTodo: (id: string, updates: UpdateTodoDto) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  addTodo: (dto) =>
    set((state) => {
      const newTodo: Todo = {
        id: generateId(),
        title: dto.title,
        description: dto.description,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return { todos: [...state.todos, newTodo] };
    }),
  updateTodo: (id, updates) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id
          ? { ...todo, ...updates, updatedAt: new Date().toISOString() }
          : todo
      ),
    })),
  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              updatedAt: new Date().toISOString(),
            }
          : todo
      ),
    })),
}));

