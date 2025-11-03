/**
 * 인증 프로세스 예제
 * 
 * 이 프로세스는 여러 features를 조합합니다:
 * - features/login
 * - features/register  
 * - features/email-verification
 */

import { type Status } from '@/shared/types';

export interface AuthProcessState {
  step: 'login' | 'register' | 'verification' | 'complete';
  status: Status;
  error?: string;
}

export interface AuthProcessContext {
  email?: string;
  userId?: string;
}

