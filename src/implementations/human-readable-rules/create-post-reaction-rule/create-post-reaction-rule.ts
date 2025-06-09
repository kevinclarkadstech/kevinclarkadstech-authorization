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
      post: Post;
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
      const userIsNotPostCreator =
        withResourceAndContext.additionalContext.post.createdBy !==
        givenASubject.data.id;
      const userIsNotBlockingPostCreator =
        !givenASubject.data.blockList.blocking[
          withResourceAndContext.additionalContext.post.createdBy
        ];
      const userIsNotBlockedByPostCreator =
        !givenASubject.data.blockList.blockedBy[
          withResourceAndContext.additionalContext.post.createdBy
        ];
      return (
        userIsNotPostCreator &&
        userIsNotBlockedByPostCreator &&
        userIsNotBlockingPostCreator
      );
    }
    return false; // For other types of subjects, one can define additional logic later
  },
};
