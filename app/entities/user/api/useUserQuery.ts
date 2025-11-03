"use client";

import { useQuery } from "@tanstack/react-query";

import { getUserById, getUsers } from "./userApi";
import { type User } from "../model/types";

/**
 * 사용자 목록을 가져오는 React Query hook
 */
export function useUsers() {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 1000 * 60 * 5, // 5분
  });
}

/**
 * 특정 사용자를 가져오는 React Query hook
 */
export function useUser(userId: string) {
  return useQuery<User>({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5분
  });
}
