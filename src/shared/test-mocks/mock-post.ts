import { generateUniqueId } from "../../helpers/generateUniqueId";
import type { Post } from "../../models/post";

export const mockPost: Post = {
  id: generateUniqueId(),
  content: "This is a mock post content.",
  created: new Date().toISOString(),
  updated: null,
  createdBy: generateUniqueId(),
};
