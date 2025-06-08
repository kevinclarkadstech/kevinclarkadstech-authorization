import { Rule } from "..";
import type { Post } from "../../../models/post";
import type { Subjects } from "../../../shared/types/subjects";

export class CreatePostRule extends Rule<{
  subject: Subjects | null;
  Action: "create-post";
  Resource: Post;
}> {
  constructor(input: {
    subject: Subjects | null;
    action: "create-post";
    resource: Post;
  }) {
    super(input);
  }

  public evaluate(): boolean {
    // The rule for creating a post is that the subject must be authenticated
    return this.input.subject !== null;
  }
}
