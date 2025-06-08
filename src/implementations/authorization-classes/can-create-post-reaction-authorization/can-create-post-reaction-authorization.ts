import type { Post } from "../../models/post";
import type { PostReaction } from "../../models/post-reaction";
import type { Subjects } from "../../shared/types/subjects";
import { Authorization } from "..";

export class CanCreatePostReactionAuthorization extends Authorization<{
  subject: Subjects | null;
  action: "create-post-reaction";
  resource: PostReaction;
  additionalContext: { post: Post };
}> {
  public check(): boolean {
    if (!this.subject || !this.additionalContext?.post) return false;
    if (this.subject.type === "user") {
      const userIsNotPostCreator =
        this.additionalContext.post.createdBy !== this.subject.data.id;
      const userIsNotBlockingPostCreator =
        !this.subject.data.blockList.blocking[
          this.additionalContext.post.createdBy
        ];
      const userIsNotBlockedByPostCreator =
        !this.subject.data.blockList.blockedBy[
          this.additionalContext.post.createdBy
        ];
      return (
        userIsNotPostCreator &&
        userIsNotBlockedByPostCreator &&
        userIsNotBlockingPostCreator
      );
    }
    return false; // For other types of subjects, you can define additional logic
  }
}
