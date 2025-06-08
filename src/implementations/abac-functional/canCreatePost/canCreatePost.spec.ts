import { expect, it, describe } from "bun:test";
import { canCreatePost } from "./canCreatePost";
import { mockBasicUser1 } from "../../../shared/test-mocks/mock-basic-user1";
import { mockPost } from "../../../shared/test-mocks/mock-post";
import { mockAdminUser1 } from "../../../shared/test-mocks/mock-admin-user1";

describe("canCreatePost", () => {
  it("should allow authenticated users to create a post", () => {
    const result = canCreatePost({
      subject: { type: "user", data: mockBasicUser1 },
      action: "create-post",
      resource: mockPost,
    });
    expect(result).toBe(true);
  });

  it("should not allow anonymous users to create a post", () => {
    const result = canCreatePost({
      subject: null,
      action: "create-post",
      resource: mockPost,
    });
    expect(result).toBe(false);
  });

  it("should allow admin users to create a post", () => {
    const result = canCreatePost({
      subject: { type: "user", data: mockAdminUser1 },
      action: "create-post",
      resource: mockPost,
    });
    expect(result).toBe(true);
  });
});
