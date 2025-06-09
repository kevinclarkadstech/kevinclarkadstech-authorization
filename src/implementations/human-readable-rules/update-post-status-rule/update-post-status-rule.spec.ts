import { describe, it, expect } from "bun:test";
import {
  updatePostStatusRule,
  type UpdatePostStatusRuleConfig,
} from "./update-post-status-rule";
import { mockBasicUser1 } from "../../../shared/test-mocks/mock-basic-user1";
import { mockPost } from "../../../shared/test-mocks/mock-post";
import { mockAdminUser1 } from "../../../shared/test-mocks/mock-admin-user1";
import { mockBasicUser2 } from "../../../shared/test-mocks/mock-basic-user2";

describe("updatePostStatusRule", () => {
  it("should allow an admin to update the post status", () => {
    const config: UpdatePostStatusRuleConfig = {
      givenASubject: { type: "user", data: mockAdminUser1 },
      tryingTo: "update-post-status",
      withResourceAndContext: {
        resource: "published",
        additionalContext: {
          post: {
            createdBy: mockBasicUser1.id,
            id: mockPost.id,
            status: "draft",
          },
        },
      },
    };
    expect(updatePostStatusRule.evaluate(config)).toBe(true);
  });

  it("should allow a post creator to update their own post status", () => {
    const config: UpdatePostStatusRuleConfig = {
      givenASubject: { type: "user", data: mockBasicUser1 },
      tryingTo: "update-post-status",
      withResourceAndContext: {
        resource: "published",
        additionalContext: {
          post: {
            createdBy: mockBasicUser1.id,
            id: mockPost.id,
            status: "draft",
          },
        },
      },
    };
    expect(updatePostStatusRule.evaluate(config)).toBe(true);
  });

  it("should not allow a user to update another user's post status", () => {
    const config: UpdatePostStatusRuleConfig = {
      givenASubject: { type: "user", data: mockBasicUser2 },
      tryingTo: "update-post-status",
      withResourceAndContext: {
        resource: "published",
        additionalContext: {
          post: {
            createdBy: mockBasicUser1.id,
            id: mockPost.id,
            status: "draft",
          },
        },
      },
    };
    expect(updatePostStatusRule.evaluate(config)).toBe(false);
  });

  it("should not allow an anonymous user to update a post status", () => {
    const config: UpdatePostStatusRuleConfig = {
      givenASubject: null,
      tryingTo: "update-post-status",
      withResourceAndContext: {
        resource: "published",
        additionalContext: {
          post: {
            createdBy: mockBasicUser1.id,
            id: mockPost.id,
            status: "draft",
          },
        },
      },
    };
    expect(updatePostStatusRule.evaluate(config)).toBe(false);
  });

  it("should not allow a user to update the post status if the status is not changed", () => {
    const config: UpdatePostStatusRuleConfig = {
      givenASubject: { type: "user", data: mockBasicUser1 },
      tryingTo: "update-post-status",
      withResourceAndContext: {
        resource: "draft",
        additionalContext: {
          post: {
            createdBy: mockBasicUser1.id,
            id: mockPost.id,
            status: "draft",
          },
        },
      },
    };
    expect(updatePostStatusRule.evaluate(config)).toBe(false);
  });
});
