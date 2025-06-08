import { describe, it, expect } from "bun:test";
import { CanCreatePostReactionAuthorization } from "./can-create-post-reaction-authorization";
import { mockBasicUser1 } from "../../../shared/test-mocks/mock-basic-user1";
import { mockPost } from "../../../shared/test-mocks/mock-post";
import { mockBasicUser2 } from "../../../shared/test-mocks/mock-basic-user2";
import { mockAdminUser1 } from "../../../shared/test-mocks/mock-admin-user1";
import { mockPostReaction } from "../../../shared/test-mocks/mock-post-reaction";

describe("CanCreatePostReactionAuthorization", () => {
  it("should allow a user to create a reaction if they are not the post creator and not blocked by the post creator", () => {
    const authorization = new CanCreatePostReactionAuthorization({
      subject: { type: "user", data: mockBasicUser1 },
      action: "create-post-reaction",
      resource: { ...mockPostReaction, createdBy: mockBasicUser1.id },
      additionalContext: {
        post: { ...mockPost, createdBy: mockBasicUser2.id },
      },
    });
    expect(authorization.check()).toBe(true);
  });

  it("should not allow a user to create a reaction if they are the post creator", () => {
    const authorization = new CanCreatePostReactionAuthorization({
      subject: { type: "user", data: mockBasicUser1 },
      action: "create-post-reaction",
      resource: mockPostReaction,
      additionalContext: {
        post: { ...mockPost, createdBy: mockBasicUser1.id },
      },
    });
    expect(authorization.check()).toBe(false);
  });

  it("should not allow a user to create a reaction if they are blocked by the post creator", () => {
    const blockingUser = {
      ...mockBasicUser1,
      blockList: { blocking: {}, blockedBy: { [mockBasicUser2.id]: true } },
    };
    const authorization = new CanCreatePostReactionAuthorization({
      subject: {
        type: "user",
        data: {
          ...mockBasicUser2,
          blockList: {
            blockedBy: { [blockingUser.id]: true },
            blocking: {},
          },
        },
      },
      action: "create-post-reaction",
      resource: mockPostReaction,
      additionalContext: { post: { ...mockPost, createdBy: blockingUser.id } },
    });
    expect(authorization.check()).toBe(false);
  });

  it("should not allow an anonymous user to create a reaction", () => {
    const authorization = new CanCreatePostReactionAuthorization({
      subject: null,
      action: "create-post-reaction",
      resource: mockPostReaction,
      additionalContext: { post: mockPost },
    });
    expect(authorization.check()).toBe(false);
  });

  it("should allow an admin user to create a reaction regardless of other conditions", () => {
    const authorization = new CanCreatePostReactionAuthorization({
      subject: { type: "user", data: mockAdminUser1 },
      action: "create-post-reaction",
      resource: mockPostReaction,
      additionalContext: { post: mockPost },
    });
    expect(authorization.check()).toBe(true);
  });
});
