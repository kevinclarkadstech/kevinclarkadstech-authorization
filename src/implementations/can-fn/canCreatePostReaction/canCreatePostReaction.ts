import type { Post } from "../../../models/post";
import type { PostReaction } from "../../../models/post-reaction";
import type { Subjects } from "../../../shared/types/subjects";
import type { CanFn } from "..";

export const canCreatePostReaction: CanFn<{
  subject: Subjects | null;
  resource: PostReaction;
  action: "create-post-reaction";
  additionalContext: { post: Post };
}> = ({ subject, additionalContext }) => {
  if (!subject || !additionalContext?.post) return false;
  if (subject.type === "user") {
    const userIsNotPostCreator =
      additionalContext.post.createdBy !== subject.data.id;
    const userIsNotBlockingPostCreator =
      !subject.data.blockList.blocking[additionalContext.post.createdBy];
    const userIsNotBlockedByPostCreator =
      !subject.data.blockList.blockedBy[additionalContext.post.createdBy];
    return (
      userIsNotPostCreator &&
      userIsNotBlockedByPostCreator &&
      userIsNotBlockingPostCreator
    );
  }
  return false; // For other types of subjects, you can define additional logic
};
