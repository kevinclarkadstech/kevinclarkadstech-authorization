import { generateUniqueId } from "../../helpers/generateUniqueId";
import type { User } from "../../models/user";

export const mockBasicUser1: User = {
    id: generateUniqueId(),
    created: new Date().toISOString(),
    updated: null,
    username: "basicUser1",
    roles: ["user"],
    blockList: {
        blockedBy: {},
        blocking: {},
    },
}