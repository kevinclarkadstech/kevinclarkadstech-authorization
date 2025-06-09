import { ChainingAuthorization } from "..";
import type { Post } from "../../../models/post";
import type { Subjects } from "../../../shared/types/subjects";

export class CanUpdatePostAuthorization extends ChainingAuthorization<{
  subject: Subjects | null;
  action: "update-post";
  resource: Post;
}> {
  public check(): boolean {
    const post = this.resource;
    if (!this.subject) return false;
    if (this.subject.type === "user") {
      const user = this.subject.data;
      // Only creators can update their posts
      const isPostCreator = post.createdBy === user.id;
      return isPostCreator;
    }
    return false; // For other types of subjects, you can define additional logic
  }
}
