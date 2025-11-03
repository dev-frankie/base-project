import { describe, it, expect } from "vitest";
import { cn, formatDate, debounce } from "./utils";

describe("utils", () => {
  describe("cn", () => {
    it("should merge class names", () => {
      expect(cn("foo", "bar")).toBe("foo bar");
      expect(cn("foo", undefined, "bar")).toBe("foo bar");
      expect(cn("foo", null, false, "bar")).toBe("foo bar");
    });

    it("should handle empty arrays", () => {
      expect(cn()).toBe("");
    });
  });

  describe("formatDate", () => {
    it("should format date correctly", () => {
      const date = new Date("2024-01-15");
      const formatted = formatDate(date);
      expect(formatted).toContain("2024");
      expect(formatted).toContain("1");
    });

    it("should handle string dates", () => {
      const formatted = formatDate("2024-01-15");
      expect(formatted).toContain("2024");
    });
  });

  describe("debounce", () => {
    it("should debounce function calls", async () => {
      let callCount = 0;
      const fn = () => {
        callCount++;
      };

      const debouncedFn = debounce(fn, 100);

      debouncedFn();
      debouncedFn();
      debouncedFn();

      expect(callCount).toBe(0);

      await new Promise(resolve => setTimeout(resolve, 150));

      expect(callCount).toBe(1);
    });
  });
});
