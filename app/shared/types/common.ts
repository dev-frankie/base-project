/**
 * Common utility types
 */

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type Nullable<T> = T | null;

export type Maybe<T> = T | null | undefined;

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export type Status = 'idle' | 'loading' | 'success' | 'error';

