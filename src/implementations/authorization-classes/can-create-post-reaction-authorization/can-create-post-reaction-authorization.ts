import { Authorization } from "..";
import type { Post } from "../../../models/post";
import type { PostReaction } from "../../../models/post-reaction";
import type { Subjects } from "../../../shared/types/subjects";

export class CanCreatePostReactionAuthorization extends Authorization<{
  subject: Subjects | null;
  action: "create-post-reaction";
  resource: PostReaction;
  additionalContext: { post: Post };
}> {
  public check(): boolean {
    const post = this.additionalContext?.post;

    if (!this.subject || !post) return false;
    if (this.subject.type === "user") {
      const user = this.subject.data;

      const userIsNotPostCreator = post.createdBy !== user.id;
      const userIsNotBlockingPostCreator =
        !user.blockList.blocking[post.createdBy];
      const userIsNotBlockedByPostCreator =
        !user.blockList.blockedBy[post.createdBy];
      return (
        userIsNotPostCreator &&
        userIsNotBlockedByPostCreator &&
        userIsNotBlockingPostCreator
      );
    }
    return false; // For other types of subjects, you can define additional logic
  }
}
