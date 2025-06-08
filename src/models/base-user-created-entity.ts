import { z } from 'zod';
export const BaseUserCreatedEntitySchema = z.object({
    id: z.string().ulid(), // Unique identifier for the entity
    created: z.string().datetime(), // Timestamp when the entity was created
    updated: z.string().datetime().nullable(), // Timestamp when the entity was last updated, nullable if not updated
    createdBy: z.string(), // Identifier of the user who created the entity
});

export type BaseUserCreatedEntity = z.infer<typeof BaseUserCreatedEntitySchema>;