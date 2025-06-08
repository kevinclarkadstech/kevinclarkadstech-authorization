import { generateUniqueId } from "../../helpers/generateUniqueId";
import type { PostReaction } from "../../models/post-reaction";

export const mockPostReaction: PostReaction = {
    id: generateUniqueId(),
    postId: generateUniqueId(),
    created: new Date().toISOString(),
    updated: null,
    createdBy: generateUniqueId(),
    type: "like", // or "dislike", "love", etc.
};