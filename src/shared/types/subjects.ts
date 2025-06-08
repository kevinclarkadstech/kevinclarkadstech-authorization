import type { User } from "../../models/user";

export type Subjects = {
  type: "user";
  data: User;
};
