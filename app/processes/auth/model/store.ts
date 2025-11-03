'use client';

import { create } from 'zustand';

import { type AuthProcessState, type AuthProcessContext } from './types';

interface AuthProcessStore extends AuthProcessState {
  context: AuthProcessContext;
  setStep: (step: AuthProcessState['step']) => void;
  setStatus: (status: AuthProcessState['status']) => void;
  setError: (error?: string) => void;
  setContext: (context: Partial<AuthProcessContext>) => void;
  reset: () => void;
}

const initialState: AuthProcessState = {
  step: 'login',
  status: 'idle',
};

const initialContext: AuthProcessContext = {};

export const useAuthProcessStore = create<AuthProcessStore>((set) => ({
  ...initialState,
  context: initialContext,
  setStep: (step) => set({ step }),
  setStatus: (status) => set({ status }),
  setError: (error) => set({ error }),
  setContext: (context) =>
    set((state) => ({
      context: { ...state.context, ...context },
    })),
  reset: () =>
    set({
      ...initialState,
      context: initialContext,
    }),
}));

