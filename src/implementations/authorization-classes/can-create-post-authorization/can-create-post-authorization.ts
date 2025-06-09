import { Authorization } from "..";
import type { Post } from "../../../models/post";
import type { Subjects } from "../../../shared/types/subjects";

export class CanCreatePostAuthorization extends Authorization<{
  subject: Subjects | null;
  action: "create-post";
  resource: Post;
}> {
  public check(): boolean {
    if (!this.subject) return false;
    if (this.subject.type === "user") {
      return true; // Users can create posts
    }

    return false;
  }
}
