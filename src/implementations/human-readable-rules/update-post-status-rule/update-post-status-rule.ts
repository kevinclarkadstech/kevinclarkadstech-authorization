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
    if (!givenASubject || !withResourceAndContext.additionalContext.post)
      return false;
    if (givenASubject.type === "user") {
      // Assuming users can update the status of a post if they are the creator
      const userIsPostCreator =
        givenASubject.data.id ===
        withResourceAndContext.additionalContext.post.createdBy;
      const userIsAdmin = givenASubject.data.roles.includes("admin");
      const postStatusIsChanged =
        withResourceAndContext.resource !==
        withResourceAndContext.additionalContext.post.status;

      return (userIsAdmin || userIsPostCreator) && postStatusIsChanged;
    }
    // For other types of subjects, we can define additional logic later
    return false;
  },
};
