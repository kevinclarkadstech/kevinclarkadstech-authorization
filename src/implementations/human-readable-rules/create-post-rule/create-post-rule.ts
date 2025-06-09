// import { Given, Rule, TryingTo, WithResourceAndContext } from "..";
// import type { Post } from "../../../models/post";
// import type { Subjects } from "../../../shared/types/subjects";

import type { Rule } from "..";
import type { Post } from "../../../models/post";
import type { Subjects } from "../../../shared/types/subjects";

// export class CreatePostRuleGiven extends Given<Subjects | null> {

// }

// export class CreatePostRuleTryingTo extends TryingTo<"create-post"> {

// }

// export class CreatePostRuleWithResourceAndContext extends WithResourceAndContext<Post> {

// }

// export class CreatePostRule extends Rule<{
//   given: CreatePostRuleGiven;
//   tryingTo: CreatePostRuleTryingTo;
//   withResourceAndContext: CreatePostRuleWithResourceAndContext;
// }> {
//   public evaluate(): boolean {
//     // The rule for creating a post is that the subject must be authenticated
//     return this.input.given !== null;
//   }
// }

// export function createPostRule(
//   subject: Subjects,
//   post: Post
// ): CreatePostRule {
//   return new CreatePostRule({
//     given: new CreatePostRuleGiven(null),
//     tryingTo: new CreatePostRuleTryingTo("create-post"),
//     withResourceAndContext: new CreatePostRuleWithResourceAndContext(post),
//   });
// }

export type CreatePostRuleConfig = {
  givenASubject: Subjects | null;
  tryingTo: "create-post";
  withResourceAndContext: {
    resource: Post;
    additionalContext?: undefined;
  };
};

export const createPostRule: Rule<CreatePostRuleConfig> = {
  evaluate: function ({ givenASubject }) {
    // The rule for creating a post is only that the subject must be authenticated
    if (givenASubject?.type === "user") {
      return true;
    }

    return false;
  },
};
