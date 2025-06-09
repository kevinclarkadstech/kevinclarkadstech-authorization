import { describe, it, expect } from "bun:test";
import { updatePostRule, type UpdatePostRuleConfig } from "./update-post-rule";
import { mockBasicUser1 } from "../../../shared/test-mocks/mock-basic-user1";
import { mockPost } from "../../../shared/test-mocks/mock-post";
import { mockAdminUser1 } from "../../../shared/test-mocks/mock-admin-user1";
import { mockBasicUser2 } from "../../../shared/test-mocks/mock-basic-user2";

describe("updatePostRule", () => {
  it("should allow the post creator to update their own post", () => {
    const ruleConfig: UpdatePostRuleConfig = {
      givenASubject: { type: "user", data: mockBasicUser1 },
      tryingTo: "update-post",
      withResourceAndContext: {
        resource: { ...mockPost, createdBy: mockBasicUser1.id },
      },
    };
    const result = updatePostRule.evaluate(ruleConfig);
    expect(result).toBe(true);
  });

  it("should allow an admin to update any post", () => {
    const ruleConfig: UpdatePostRuleConfig = {
      givenASubject: { type: "user", data: mockAdminUser1 },
      tryingTo: "update-post",
      withResourceAndContext: {
        resource: { ...mockPost, createdBy: mockBasicUser2.id },
      },
    };
    const result = updatePostRule.evaluate(ruleConfig);
    expect(result).toBe(true);
  });

  it("should not allow a user to update another user's post", () => {
    const ruleConfig: UpdatePostRuleConfig = {
      givenASubject: { type: "user", data: mockBasicUser2 },
      tryingTo: "update-post",
      withResourceAndContext: {
        resource: { ...mockPost, createdBy: mockBasicUser1.id },
      },
    };
    const result = updatePostRule.evaluate(ruleConfig);
    expect(result).toBe(false);
  });
  it("should not allow an anonymous user to update a post", () => {
    const ruleConfig: UpdatePostRuleConfig = {
      givenASubject: null,
      tryingTo: "update-post",
      withResourceAndContext: {
        resource: mockPost,
      },
    };
    const result = updatePostRule.evaluate(ruleConfig);
    expect(result).toBe(false);
  });
});
