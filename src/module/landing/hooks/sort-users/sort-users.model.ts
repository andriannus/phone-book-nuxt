import { ColorfulUser } from "../colorful-users";

import { UserSort } from "@/shared/enums/user.enum";

export interface SortUsersState {
  users: ColorfulUser[];
  sort: UserSort;
}
