import type { Rule } from "..";
import type { Post } from "../../../models/post";
import type { Subjects } from "../../../shared/types/subjects";

export type UpdatePostRuleConfig = {
  givenASubject: Subjects | null;
  tryingTo: "update-post";
  withResourceAndContext: {
    resource: Post;
  };
};

export const updatePostRule: Rule<UpdatePostRuleConfig> = {
  evaluate: ({ givenASubject, withResourceAndContext }) => {
    // The rule for updating a post is that the subject must be authenticated
    // and must be the creator of the post
    if (!givenASubject || !withResourceAndContext.resource) {
      return false;
    }

    if (givenASubject.type === "user") {
      const user = givenASubject.data;
      const post = withResourceAndContext.resource;

      const userIsPostCreator = post.createdBy === user.id;
      return userIsPostCreator;
    }
    return false; // For other types of subjects, one can define additional logic later
  },
};
