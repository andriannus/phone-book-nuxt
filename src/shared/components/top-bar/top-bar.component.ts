import { defineComponent } from "@nuxtjs/composition-api";

import { SORTED } from "@/shared/constants/emit.constant";
import { UserSort } from "@/shared/enums/user.enum";

export default defineComponent({
  name: "TopBar",

  setup(_, { emit }) {
    function sortUser(value: UserSort): void {
      emit(SORTED, value);
    }

    return { sortUser, UserSort };
  },
});
