import { describe, it, expect, vi, beforeEach, afterEach, type Mock } from "vitest";

import { getUsers, getUserById } from "./userApi";

type FetchMock = Mock<typeof fetch>;

describe("userApi", () => {
  let mockFetch: FetchMock;

  beforeEach(() => {
    mockFetch = vi.fn() as FetchMock;
    global.fetch = mockFetch;
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks();
  });

  describe("getUsers", () => {
    it("should fetch and transform users correctly", async () => {
      const mockUsers = [
        {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          phone: "123-456-7890",
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane@example.com",
          phone: "098-765-4321",
        },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockUsers,
      } as Response);

      const result = await getUsers();

      expect(mockFetch).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/users",
      );
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe("1");
      expect(result[0].name).toBe("John Doe");
      expect(result[0].email).toBe("john@example.com");
      expect(result[0].avatar).toBeDefined();
    });

    it("should throw error when fetch fails", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      } as Response);

      await expect(getUsers()).rejects.toThrow();
    });
  });

  describe("getUserById", () => {
    it("should fetch and transform a single user correctly", async () => {
      const mockUser = {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockUser,
      } as Response);

      const result = await getUserById("1");

      expect(mockFetch).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/users/1",
      );
      expect(result.id).toBe("1");
      expect(result.name).toBe("John Doe");
      expect(result.email).toBe("john@example.com");
      expect(result.avatar).toBeDefined();
    });

    it("should throw error when fetch fails", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      } as Response);

      await expect(getUserById("999")).rejects.toThrow();
    });
  });
});
