import {
  defineComponent,
  onMounted,
  onUnmounted,
  PropType,
  reactive,
} from "@nuxtjs/composition-api";

import { LandingMobileState } from "./landing-mobile.model";

import { useColorfulCard } from "../../hooks/colorful-card";

import QButtonToTop from "@/shared/components/button-to-top/button-to-top.component.vue";
import QCard from "@/shared/components/card/card.component.vue";
import { UPDATED } from "@/shared/constants/emit.constant";
import { QOA_POSITION_Y } from "@/shared/constants/storage.constant";
import { UserColor } from "@/shared/enums/user.enum";
import {
  Location,
  Name,
  RandomUserData,
} from "@/shared/models/random-user.model";
import { useLocalStorage } from "@/shared/services/local-storage";
import { debounce } from "@/shared/utils/debounce";
import { PaginatedData } from "@/shared/utils/pagination";
import { transformAddress, transformFullName } from "@/shared/utils/transform";

export default defineComponent({
  name: "LandingMobile",

  components: {
    QButtonToTop,
    QCard,
  },

  props: {
    paginatedUsers: {
      type: Object as PropType<PaginatedData<RandomUserData>>,
      default: (): object => {
        return {};
      },
    },
  },

  emits: [UPDATED],

  setup(props, { emit }) {
    const ls = useLocalStorage();

    const state = reactive<LandingMobileState>({
      container: null,
      scrollTop: 0,
    });

    onMounted((): void => {
      state.container = document.querySelector(".LandingMobile");
      window.addEventListener("scroll", onVerticalScroll);

      if (ls.isExist(QOA_POSITION_Y)) {
        scrollToLastPosition();
      }
    });

    onUnmounted((): void => {
      window.removeEventListener("scroll", onVerticalScroll);
    });

    function scrollToLastPosition(): void {
      state.container!.scrollTo({
        top: ls.get<number>(QOA_POSITION_Y),
      });
    }

    const onVerticalScroll = debounce((): void => {
      const { body, documentElement } = document;
      state.scrollTop = body.scrollTop || documentElement.scrollTop;

      ls.set(QOA_POSITION_Y, state.scrollTop);

      if (!props.paginatedUsers.meta.nextPage || !isStillScrollable()) return;

      emit(UPDATED, props.paginatedUsers.meta.nextPage);
    }, 250);

    function isStillScrollable(): boolean {
      const bottomOfPage =
        state.container!.scrollHeight - window.screen.height - 100;

      return state.scrollTop >= bottomOfPage;
    }

    function fullName(name: Name): string {
      return transformFullName(name);
    }

    function address(location: Location): string {
      return transformAddress(location);
    }

    function cardClassName(userColor: UserColor): string {
      const className = "LandingMobile-card";
      const colorfulCard = useColorfulCard(userColor);

      return `${className} ${colorfulCard}`;
    }

    return { address, cardClassName, fullName };
  },
});
