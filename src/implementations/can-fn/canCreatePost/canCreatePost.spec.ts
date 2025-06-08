import { describe, it, expect } from "bun:test";
import { canCreatePost } from "./canCreatePost";
import type { Subjects } from "../../../shared/types/subjects";
import { mockBasicUser1 } from "../../../shared/test-mocks/mock-basic-user1";
import { mockPost } from "../../../shared/test-mocks/mock-post";

describe("canCreatePost", () => {
  it("should return true if passes all criteria", () => {
    const subject: Subjects = { type: "user", data: mockBasicUser1 };
    const result = canCreatePost({
      subject,
      resource: mockPost,
      action: "create-post",
    });
    expect(result).toBe(true);
  });

  it("should return false if subject is null", () => {
    const result = canCreatePost({
      subject: null,
      resource: mockPost,
      action: "create-post",
    });
    expect(result).toBe(false);
  });
});
