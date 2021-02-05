import { UserColor } from "@/shared/enums/user.enum";
import { RandomUserData } from "@/shared/models/random-user.model";

export interface ColorfulUser extends RandomUserData {
  color: UserColor;
}

export interface ColorfulUsersState {
  users: RandomUserData[];
  colorfulUsers: ColorfulUser[];
}
