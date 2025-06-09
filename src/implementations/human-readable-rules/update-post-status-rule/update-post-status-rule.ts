import type { Rule } from "..";
import type { Post } from "../../../models/post";
import type { Subjects } from "../../../shared/types/subjects";

export type UpdatePostStatusRuleConfig = {
  givenASubject: Subjects | null;
  tryingTo: "update-post-status";
  withResourceAndContext: {
    resource: Post["status"];
    additionalContext: {
      post: Pick<Post, "createdBy" | "id" | "status"> | null;
    };
  };
};

export const updatePostStatusRule: Rule<UpdatePostStatusRuleConfig> = {
  evaluate: ({ givenASubject, withResourceAndContext }) => {
    // The post status can be updated by the post creator or an admin, only if the status is actually changing
    // and the post exists in the additional context
    if (!givenASubject || !withResourceAndContext.additionalContext.post)
      return false;
    if (givenASubject.type === "user") {
      const user = givenASubject.data;
      const originalPost = withResourceAndContext.additionalContext.post;
      const newPostStatus = withResourceAndContext.resource;

      const userIsPostCreator = user.id === originalPost.createdBy;
      const userIsAdmin = user.roles.includes("admin");
      const postStatusIsChanged = newPostStatus !== originalPost.status;

      return (userIsAdmin || userIsPostCreator) && postStatusIsChanged;
    }
    // For other types of subjects, we can define additional logic later
    return false;
  },
};
