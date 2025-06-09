import { describe, it, expect } from "bun:test";
import { CanUpdatePostAuthorization } from "./can-update-post-authorization";
import { mockAdminUser1 } from "../../../shared/test-mocks/mock-admin-user1";
import { mockPost } from "../../../shared/test-mocks/mock-post";
import { mockBasicUser1 } from "../../../shared/test-mocks/mock-basic-user1";
import { mockBasicUser2 } from "../../../shared/test-mocks/mock-basic-user2";

describe("CanUpdatePostAuthorization", () => {
  it("should not allow a user to update any post if they are an admin", () => {
    const authorization = CanUpdatePostAuthorization.instantiate(
      "can-update-post"
    )
      .withSubject({ type: "user", data: mockAdminUser1 })
      .withResource(mockPost)
      .withAdditionalContext(undefined);
    expect(authorization.check()).toBe(false);
  });

  it("should allow a user to update their own post", () => {
    const authorization = CanUpdatePostAuthorization.instantiate(
      "can-update-post"
    )
      .withSubject({ type: "user", data: mockBasicUser1 })
      .withResource({ ...mockPost, createdBy: mockBasicUser1.id })
      .withAdditionalContext(undefined);
    expect(authorization.check()).toBe(true);
  });

  it("should not allow a user to update another user's post", () => {
    const authorization = CanUpdatePostAuthorization.instantiate(
      "can-update-post"
    )
      .withSubject({ type: "user", data: mockBasicUser2 })
      .withResource({ ...mockPost, createdBy: mockBasicUser1.id })
      .withAdditionalContext(undefined);
    expect(authorization.check()).toBe(false);
  });
  it("should not allow an anonymous user to update a post", () => {
    const authorization = CanUpdatePostAuthorization.instantiate(
      "can-update-post"
    )
      .withSubject(null)
      .withResource(mockPost)
      .withAdditionalContext(undefined);
    expect(authorization.check()).toBe(false);
  });
});
