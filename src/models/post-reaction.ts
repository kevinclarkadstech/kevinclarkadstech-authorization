import {z } from 'zod';
import { BaseUserCreatedEntitySchema } from './base-user-created-entity';
import { PostSchema } from './post';

export const PostReactionSchema = BaseUserCreatedEntitySchema.extend({
    postId: PostSchema.shape.id, // Identifier of the post this reaction belongs to
    type: z.enum(['like', 'dislike', 'love', 'laugh', 'sad', 'angry']), // Type of reaction
});

export type PostReaction = z.infer<typeof PostReactionSchema>;