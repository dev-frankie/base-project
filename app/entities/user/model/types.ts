import { type BaseEntity } from '@/shared/types';

export interface User extends BaseEntity {
  name: string;
  email: string;
  avatar?: string;
}

export interface UserProfile {
  userId: string;
  bio?: string;
  location?: string;
}

