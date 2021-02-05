import { UserSort } from "@/shared/enums/user.enum";
import { RandomUserData } from "@/shared/models/random-user.model";
import { PaginatedData } from "@/shared/utils/pagination";

export interface LandingState {
  clientWidth: number;
  didSomethingWrong: boolean;
  isDataReady: boolean;
  paginatedUsers: PaginatedData<RandomUserData>;
}

export interface LandingUrlQuery {
  page?: string;
  sortBy?: UserSort;
}
