import { z } from "zod";
import { BaseUserCreatedEntitySchema } from "./base-user-created-entity";

export const PostSchema = BaseUserCreatedEntitySchema.extend({
  content: z.string().min(1), // Content of the post, must be at least 1 character long
  status: z.enum(["draft", "published", "archived"]), // Status of the post
});
export type Post = z.infer<typeof PostSchema>;
