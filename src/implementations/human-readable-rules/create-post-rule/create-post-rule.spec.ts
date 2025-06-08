import { describe, it, expect } from "bun:test";
import { CreatePostRule } from "./create-post-rule";
import { mockPost } from "../../../shared/test-mocks/mock-post";
import { mockBasicUser1 } from "../../../shared/test-mocks/mock-basic-user1";
import { mockAdminUser1 } from "../../../shared/test-mocks/mock-admin-user1";

describe("CreatePostRule", () => {
  it("should allow authenticated users to create a post", () => {
    const rule = new CreatePostRule({
      subject: { type: "user", data: mockBasicUser1 },
      action: "create-post",
      resource: mockPost,
    });
    expect(rule.evaluate()).toBe(true);
  });

  it("should not allow anonymous users to create a post", () => {
    const rule = new CreatePostRule({
      subject: null,
      action: "create-post",
      resource: mockPost,
    });
    expect(rule.evaluate()).toBe(false);
  });
  it("should allow admin users to create a post", () => {
    const rule = new CreatePostRule({
      subject: { type: "user", data: mockAdminUser1 },
      action: "create-post",
      resource: mockPost,
    });
    expect(rule.evaluate()).toBe(true);
  });
});
