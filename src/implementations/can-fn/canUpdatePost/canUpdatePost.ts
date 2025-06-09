import type { Post } from "../../../models/post";
import type { Subjects } from "../../../shared/types/subjects";
import type { CanFn } from "..";

export const canUpdatePost: CanFn<{
  subject: Subjects | null;
  resource: Post;
  action: "update-post";
}> = ({ subject, resource }) => {
  if (!subject || !resource) return false;
  if (subject.type === "user") {
    // For readability
    const user = subject.data;
    const post = resource;

    // Check if the user is the creator of the post
    const isPostCreator = post.createdBy === user.id;
    const isAdmin = user.roles.includes("admin"); // Assuming 'admin' is a valid role in your system
    // could also be a priv like can-update-any-post
    return isPostCreator || isAdmin;
  }
  return false; // For other types of subjects, you can define additional logic
};
