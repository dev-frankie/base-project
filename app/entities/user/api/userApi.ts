import { type User } from "../model/types";

/**
 * User API 응답 타입 (외부 API 구조)
 */
interface UserApiResponse {
  id: number;
  name: string;
  email: string;
  phone?: string;
  website?: string;
  address?: {
    street: string;
    city: string;
  };
  company?: {
    name: string;
  };
}

/**
 * API 응답을 내부 User 타입으로 변환
 */
function mapApiResponseToUser(apiUser: UserApiResponse): User {
  return {
    id: apiUser.id.toString(),
    name: apiUser.name,
    email: apiUser.email,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${apiUser.name}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * 모든 사용자 목록 가져오기
 */
export async function getUsers(): Promise<User[]> {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: UserApiResponse[] = await response.json();
    return data.map(mapApiResponseToUser);
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw error;
  }
}

/**
 * 특정 사용자 가져오기
 */
export async function getUserById(id: string): Promise<User> {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: UserApiResponse = await response.json();
    return mapApiResponseToUser(data);
  } catch (error) {
    console.error(`Failed to fetch user ${id}:`, error);
    throw error;
  }
}
