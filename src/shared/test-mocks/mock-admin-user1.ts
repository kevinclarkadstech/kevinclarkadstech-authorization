
import { generateUniqueId } from "../../helpers/generateUniqueId";
import type { User } from "../../models/user";

export const mockAdminUser1: User = {
    id: generateUniqueId(),
    created: new Date().toISOString(),
    updated: null,
    username: "basicUser1",
    roles: ["user", "admin"],
    blockList: {
        blockedBy: {},
        blocking: {},
    },
}