import type { Rule } from "..";
import type { Post } from "../../../models/post";
import type { PostReaction } from "../../../models/post-reaction";
import type { Subjects } from "../../../shared/types/subjects";

export type CreatePostReactionRuleConfig = {
  givenASubject: Subjects | null;
  tryingTo: "create-post-reaction";
  withResourceAndContext: {
    resource: PostReaction;
    additionalContext: {
      post: Post | null;
    };
  };
};

export const createPostReactionRule: Rule<CreatePostReactionRuleConfig> = {
  evaluate: ({ givenASubject, withResourceAndContext }) => {
    // The rule for creating a post reaction is that the subject must be authenticated
    // and not the creator of the post, not blocking the post creator, and not blocked by the post creator.
    if (!givenASubject || !withResourceAndContext.additionalContext?.post) {
      return false;
    }

    if (givenASubject.type === "user") {
      const user = givenASubject.data;
      const post = withResourceAndContext.additionalContext.post;

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
    return false; // For other types of subjects, one can define additional logic later
  },
};
