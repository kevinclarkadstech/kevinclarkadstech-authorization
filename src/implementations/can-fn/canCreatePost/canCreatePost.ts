import type { Post } from "../../../models/post";
import type { Subjects } from "../../../shared/types/subjects";
import type { CanFn } from "..";

export const canCreatePost: CanFn<{
  subject: Subjects | null;
  resource: Post;
  action: "create-post";
}> = ({ subject }) => {
  return subject !== null;
};
