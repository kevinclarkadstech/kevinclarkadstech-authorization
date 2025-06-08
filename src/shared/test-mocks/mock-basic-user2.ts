import { generateUniqueId } from "../../helpers/generateUniqueId";
import type { User } from "../../models/user";

export const mockBasicUser2: User = {
    id: generateUniqueId(),
    created: new Date().toISOString(),
    updated: null,
    username: "basicUser2",
    roles: ["user"],
    blockList: {
        blockedBy: {},
        blocking: {},
    },
}