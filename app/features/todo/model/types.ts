import { type BaseEntity } from '@/shared/types';

export interface Todo extends BaseEntity {
  title: string;
  description?: string;
  completed: boolean;
  userId?: string;
}

export interface CreateTodoDto {
  title: string;
  description?: string;
}

export interface UpdateTodoDto {
  title?: string;
  description?: string;
  completed?: boolean;
}

