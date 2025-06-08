import type { EvaluateAbacFn } from "..";
import type { Post } from "../../../models/post";
import type { Subjects } from "../../../shared/types/subjects";

export const canCreatePost: EvaluateAbacFn<{
  subject: Subjects | null;
  action: "create-post";
  resource: Post;
}> = ({ subject }) => {
  // The rule for creating a post is that the subject must be authenticated
  return subject !== null;
};
