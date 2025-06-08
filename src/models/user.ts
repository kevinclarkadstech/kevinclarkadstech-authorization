import { z } from 'zod';

export const UserSchema = z.object({
    id: z.string().ulid(), // Unique identifier for the user
    username: z.string().min(1).max(50), // Username of the user, must be between 1 and 50 characters
    roles: z.array(z.enum(['admin', 'user'])), // Roles assigned to the user, can be 'admin', 'editor', or 'viewer'
    created: z.string().datetime(), // Timestamp when the user was created
    updated: z.string().datetime().nullable(), // Timestamp when the user was last updated, nullable if not updated
    blockList: z.object({
        blockedBy: z.record(z.string(), z.boolean()), // Users who have blocked this user
        blocking: z.record(z.string(), z.boolean()), // Users this user has blocked
    }),
});

export type User = z.infer<typeof UserSchema>;