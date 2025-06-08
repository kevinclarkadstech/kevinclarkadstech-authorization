import type { Post } from "../../models/post";
import type { Subjects } from "../../shared/types/subjects";
import { Authorization } from "..";

export class CanCreatePostAuthorization extends Authorization<{
  subject: Subjects | null;
  action: "create-post";
  resource: Post;
}> {
  public check(): boolean {
    return this.subject !== null;
  }
}
