import { describe, it, expect } from "bun:test";
import { canUpdatePost } from "./canUpdatePost";
import type { Subjects } from "../../../shared/types/subjects";
import { mockBasicUser1 } from "../../../shared/test-mocks/mock-basic-user1";
import { mockPost } from "../../../shared/test-mocks/mock-post";
import { mockAdminUser1 } from "../../../shared/test-mocks/mock-admin-user1";
import { mockBasicUser2 } from "../../../shared/test-mocks/mock-basic-user2";

describe("canUpdatePost", () => {
  it("should return true if the user is the creator of the post", () => {
    const subject: Subjects = { type: "user", data: mockBasicUser1 };
    const post = { ...mockPost, createdBy: mockBasicUser1.id }; // Ensure the user is the creator
    const result = canUpdatePost({
      subject,
      resource: post,
      action: "update-post",
    });
    expect(result).toBe(true);
  });

  it("should return true if the user is an admin", () => {
    const subject: Subjects = { type: "user", data: mockAdminUser1 };

    const result = canUpdatePost({
      subject,
      resource: { ...mockPost, createdBy: mockBasicUser1.id },
      action: "update-post",
    });
    expect(result).toBe(true);
  });

  it("should return false if the user is not the creator and not an admin", () => {
    const subject: Subjects = { type: "user", data: mockBasicUser2 };
    const result = canUpdatePost({
      subject,
      resource: { ...mockPost, createdBy: mockBasicUser1.id }, // Ensure the user is not the creator
      action: "update-post",
    });
    expect(result).toBe(false);
  });

  it("should return false if subject is null", () => {
    const result = canUpdatePost({
      subject: null,
      resource: mockPost,
      action: "update-post",
    });
    expect(result).toBe(false);
  });
});
