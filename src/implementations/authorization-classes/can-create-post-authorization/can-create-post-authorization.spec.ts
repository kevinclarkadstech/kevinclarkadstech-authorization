import { describe, it, expect } from "bun:test";
import { CanCreatePostAuthorization } from "./can-create-post-authorization";
import { mockBasicUser1 } from "../../../shared/test-mocks/mock-basic-user1";
import { mockPost } from "../../../shared/test-mocks/mock-post";

describe("CanCreatePostAuthorization", () => {
  it("should allow any user to create a post if they are authenticated", () => {
    const authorization = new CanCreatePostAuthorization({
      subject: { type: "user", data: mockBasicUser1 },
      action: "create-post",
      resource: mockPost,
    });
    expect(authorization.check()).toBe(true);
  });

  it("should not allow an anonymous user to create a post", () => {
    const authorization = new CanCreatePostAuthorization({
      subject: null,
      action: "create-post",
      resource: mockPost,
    });
    expect(authorization.check()).toBe(false);
  });
});
