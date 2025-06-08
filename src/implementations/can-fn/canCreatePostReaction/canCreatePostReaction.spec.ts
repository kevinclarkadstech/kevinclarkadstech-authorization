import { describe, it, expect } from "bun:test";
import { canCreatePostReaction } from "./canCreatePostReaction";
import type { Subjects } from "../../../shared/types/subjects";
import { mockBasicUser1 } from "../../../shared/test-mocks/mock-basic-user1";
import { mockPost } from "../../../shared/test-mocks/mock-post";
import { mockAdminUser1 } from "../../../shared/test-mocks/mock-admin-user1";
import { mockPostReaction } from "../../../shared/test-mocks/mock-post-reaction";

describe("canCreatePostReaction", () => {
  it("should return true if passes all criteria", () => {
    const subject: Subjects = { type: "user", data: mockBasicUser1 };
    const result = canCreatePostReaction({
      subject,
      resource: {
        ...mockPostReaction,
        createdBy: mockBasicUser1.id,
        postId: mockPost.id,
      },
      action: "create-post-reaction",
      additionalContext: { post: mockPost },
    });
    expect(result).toBe(true);
  });

  it("should return false if subject is null", () => {
    const result = canCreatePostReaction({
      subject: null,
      resource: mockPostReaction,
      action: "create-post-reaction",
      additionalContext: { post: mockPost },
    });
    expect(result).toBe(false);
  });

  it("should return false if user is the creator of the post", () => {
    const subject: Subjects = { type: "user", data: mockBasicUser1 };
    const post = { ...mockPost, createdBy: mockBasicUser1.id }; // Ensure the user is the creator
    const result = canCreatePostReaction({
      subject,
      resource: { ...mockPostReaction, postId: post.id },
      action: "create-post-reaction",
      additionalContext: { post },
    });
    expect(result).toBe(false);
  });

  it("should return false if user is blocking the post creator", () => {
    const subject: Subjects = {
      type: "user",
      data: {
        ...mockBasicUser1,
        blockList: { blocking: { [mockPost.createdBy]: true }, blockedBy: {} },
      },
    };
    const result = canCreatePostReaction({
      subject,
      resource: { ...mockPostReaction, postId: mockPost.id },
      action: "create-post-reaction",
      additionalContext: { post: mockPost },
    });
    expect(result).toBe(false);
  });

  it("should return false if user is blocked by the post creator", () => {
    const subject: Subjects = {
      type: "user",
      data: {
        ...mockBasicUser1,
        blockList: { blocking: {}, blockedBy: { [mockPost.createdBy]: true } },
      },
    };
    const result = canCreatePostReaction({
      subject,
      resource: { ...mockPostReaction, postId: mockPost.id },
      action: "create-post-reaction",
      additionalContext: { post: mockPost },
    });
    expect(result).toBe(false);
  });

  it("should return true if user is an admin", () => {
    const subject: Subjects = { type: "user", data: mockAdminUser1 };
    const result = canCreatePostReaction({
      subject,
      resource: { ...mockPostReaction, postId: mockPost.id },
      action: "create-post-reaction",
      additionalContext: { post: mockPost },
    });
    expect(result).toBe(true);
  });

  it("should return false for other types of subjects", () => {
    const subject = { type: "guest", data: {} as any }; // Assuming 'guest' is a type that does not have access
    const result = canCreatePostReaction({
      // @ts-expect-error: Testing with an unsupported subject type
      subject,
      resource: { ...mockPostReaction, postId: mockPost.id },
      action: "create-post-reaction",
      additionalContext: { post: mockPost },
    });
    expect(result).toBe(false);
  });

  it("should return false if additionalContext is missing", () => {
    const subject: Subjects = { type: "user", data: mockBasicUser1 };
    // @ts-expect-error: Testing with missing additionalContext
    const result = canCreatePostReaction({
      subject,
      resource: mockPostReaction,
      action: "create-post-reaction",
    });
    expect(result).toBe(false);
  });

  it("should return false if additionalContext.post is missing", () => {
    const subject: Subjects = { type: "user", data: mockBasicUser1 };
    const result = canCreatePostReaction({
      subject,
      resource: { ...mockPostReaction, postId: mockPost.id },
      action: "create-post-reaction",
      // @ts-expect-error: Testing with missing post in additionalContext
      additionalContext: {},
    });
    expect(result).toBe(false);
  });

  it("should return false if post is not provided in additionalContext", () => {
    const subject: Subjects = { type: "user", data: mockBasicUser1 };
    const result = canCreatePostReaction({
      subject,
      resource: mockPostReaction,
      action: "create-post-reaction",
      // @ts-expect-error: Testing with null post in additionalContext
      additionalContext: { post: null },
    });
    expect(result).toBe(false);
  });
});
