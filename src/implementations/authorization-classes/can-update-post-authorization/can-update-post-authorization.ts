import { Authorization } from "..";
import type { Post } from "../../../models/post";
import type { Subjects } from "../../../shared/types/subjects";

export class CanUpdatePostAuthorization extends Authorization<{
  subject: Subjects | null;
  action: "update-post";
  resource: Post;
}> {
  public check(): boolean {
    const post = this.resource;
    if (!this.subject) return false;
    if (this.subject.type === "user") {
      const user = this.subject.data;
      // Users can update a post if they are the creator
      const isPostCreator = post.createdBy === user.id;
      return isPostCreator;
    }
    return false; // For other types of subjects, you can define additional logic
  }
}
