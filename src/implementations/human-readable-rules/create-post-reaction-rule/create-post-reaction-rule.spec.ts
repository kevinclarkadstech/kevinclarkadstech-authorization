import { describe, it, expect } from "bun:test";
import { createPostReactionRule } from "./create-post-reaction-rule";
import { mockPost } from "../../../shared/test-mocks/mock-post";
import { mockBasicUser1 } from "../../../shared/test-mocks/mock-basic-user1";
import { mockBasicUser2 } from "../../../shared/test-mocks/mock-basic-user2";
import { mockAdminUser1 } from "../../../shared/test-mocks/mock-admin-user1";
import { mockPostReaction } from "../../../shared/test-mocks/mock-post-reaction";

describe("createPostReactionRule", () => {
  it("should allow a user to create a reaction if they are not the post creator and not blocked by the post creator", () => {
    expect(
      createPostReactionRule.evaluate({
        givenASubject: { type: "user", data: mockBasicUser1 },
        tryingTo: "create-post-reaction",
        withResourceAndContext: {
          resource: { ...mockPostReaction, createdBy: mockBasicUser1.id },
          additionalContext: {
            post: { ...mockPost, createdBy: mockBasicUser2.id },
          },
        },
      })
    ).toBe(true);
  });

  it("should not allow a user to create a reaction if they are the post creator", () => {
    expect(
      createPostReactionRule.evaluate({
        givenASubject: { type: "user", data: mockBasicUser1 },
        tryingTo: "create-post-reaction",
        withResourceAndContext: {
          resource: mockPostReaction,
          additionalContext: {
            post: { ...mockPost, createdBy: mockBasicUser1.id },
          },
        },
      })
    ).toBe(false);
  });

  it("should not allow a user to create a reaction if they are blocked by the post creator", () => {
    const blockingUser = {
      ...mockBasicUser1,
      blockList: { blocking: {}, blockedBy: { [mockBasicUser2.id]: true } },
    };
    expect(
      createPostReactionRule.evaluate({
        givenASubject: {
          type: "user",
          data: {
            ...mockBasicUser2,
            blockList: {
              blockedBy: { [blockingUser.id]: true },
              blocking: {},
            },
          },
        },
        tryingTo: "create-post-reaction",
        withResourceAndContext: {
          resource: mockPostReaction,
          additionalContext: {
            post: { ...mockPost, createdBy: blockingUser.id },
          },
        },
      })
    ).toBe(false);
  });

  it("should not allow a user to create a reaction if they are blocking the post creator", () => {
    const blockingUser = {
      ...mockBasicUser1,
      blockList: { blocking: { [mockBasicUser2.id]: true }, blockedBy: {} },
    };

    const blockedUser = {
      ...mockBasicUser2,
      blockList: { blocking: {}, blockedBy: { [blockingUser.id]: true } },
    };

    expect(
      createPostReactionRule.evaluate({
        givenASubject: {
          type: "user",
          data: blockedUser,
        },
        tryingTo: "create-post-reaction",
        withResourceAndContext: {
          resource: mockPostReaction,
          additionalContext: {
            post: { ...mockPost, createdBy: blockingUser.id },
          },
        },
      })
    ).toBe(false);
  });

  it("should not allow an anonymous user to create a reaction", () => {
    expect(
      createPostReactionRule.evaluate({
        givenASubject: null,
        tryingTo: "create-post-reaction",
        withResourceAndContext: {
          resource: mockPostReaction,
          additionalContext: { post: mockPost },
        },
      })
    ).toBe(false);
  });
});
