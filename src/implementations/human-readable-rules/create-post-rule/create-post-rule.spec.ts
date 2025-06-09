import { describe, it, expect } from "bun:test";
import { createPostRule } from "./create-post-rule";
import { mockPost } from "../../../shared/test-mocks/mock-post";
import { mockBasicUser1 } from "../../../shared/test-mocks/mock-basic-user1";
import { mockAdminUser1 } from "../../../shared/test-mocks/mock-admin-user1";

describe("createPostRule", () => {
  it("should allow authenticated users to create a post", () => {
    expect(
      createPostRule.evaluate({
        givenASubject: { type: "user", data: mockBasicUser1 },
        tryingTo: "create-post",
        withResourceAndContext: {
          resource: mockPost,
          additionalContext: undefined,
        },
      })
    ).toBe(true);
  });

  it("should not allow anonymous users to create a post", () => {
    expect(
      createPostRule.evaluate({
        givenASubject: null,
        tryingTo: "create-post",
        withResourceAndContext: {
          resource: mockPost,
          additionalContext: undefined,
        },
      })
    ).toBe(false);
  });
  it("should allow admin users to create a post", () => {
    expect(
      createPostRule.evaluate({
        givenASubject: { type: "user", data: mockAdminUser1 },
        tryingTo: "create-post",
        withResourceAndContext: {
          resource: mockPost,
          additionalContext: undefined,
        },
      })
    ).toBe(true);
  });
});
