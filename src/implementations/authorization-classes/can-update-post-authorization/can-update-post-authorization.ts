import type { Post } from "../../models/post";
import type { Subjects } from "../../shared/types/subjects";
import { Authorization } from "..";

export class CanUpdatePostAuthorization extends Authorization<{
  subject: Subjects | null;
  action: "update-post";
  resource: Post;
}> {
  public check(): boolean {
    if (!this.subject) return false;
    if (this.subject.type === "user") {
      return (
        this.subject.data.roles.includes("admin") ||
        this.resource.createdBy === this.subject.data.id
      );
    }
    return false; // For other types of subjects, you can define additional logic
  }
}
