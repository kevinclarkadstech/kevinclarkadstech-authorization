import type { EvaluateAbacFn, WithAction, WithResource, WithSubject } from "..";
import type { Post } from "../../../models/post";
import type { Subjects } from "../../../shared/types/subjects";

export const canCreatePost: EvaluateAbacFn<
  WithSubject<Subjects | null>,
  WithAction<"create-post">,
  WithResource<Post>
> = ({ subject }) => {
  // The rule for creating a post is that the subject must be authenticated
  if (!subject) return false;
  if (subject.type === "user") {
    return true; // Users can create posts
  }
  return false; // Other subjects cannot create posts
};
