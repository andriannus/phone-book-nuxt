import { RandomUserData } from "@/shared/models/random-user.model";
import { PaginatedData } from "@/shared/utils/pagination";

export interface PaginateUsersState {
  page: number;
  paginatedUsers: PaginatedData<RandomUserData>;
}
