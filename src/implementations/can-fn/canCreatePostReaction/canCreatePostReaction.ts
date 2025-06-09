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
  const post = additionalContext?.post;
  if (!subject || !post) return false;
  if (subject.type === "user") {
    const user = subject.data;

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
};
