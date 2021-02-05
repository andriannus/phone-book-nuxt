import {
  defineComponent,
  onMounted,
  onUnmounted,
  PropType,
  reactive,
} from "@nuxtjs/composition-api";

import { LandingDesktopState } from "./landing-desktop.model";

import { useColorfulCard } from "../../hooks/colorful-card";

import QButtonToLeft from "@/shared/components/button-to-left/button-to-left.component.vue";
import QCard from "@/shared/components/card/card.component.vue";
import { UPDATED } from "@/shared/constants/emit.constant";
import { QOA_POSITION_X } from "@/shared/constants/storage.constant";
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
  name: "LandingDesktop",

  components: {
    QButtonToLeft,
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

    const state = reactive<LandingDesktopState>({
      container: null,
    });

    onMounted((): void => {
      state.container = document.querySelector(".LandingDesktop");
      state.container!.addEventListener("wheel", onMouseWheel);

      if (ls.isExist(QOA_POSITION_X)) {
        scrollToLastPosition();
      }
    });

    onUnmounted((): void => {
      state.container!.removeEventListener("wheel", onMouseWheel);
    });

    function onMouseWheel(e: Event): void {
      const isGoRight = (e as WheelEvent).deltaY > 0;

      if (isGoRight) {
        state.container!.scrollLeft += 100;
        return;
      }

      state.container!.scrollLeft -= 100;
    }

    function scrollToLastPosition(): void {
      state.container!.scrollTo({
        left: ls.get<number>(QOA_POSITION_X),
      });
    }

    const onHorizontalScroll = debounce((): void => {
      ls.set(QOA_POSITION_X, state.container!.scrollLeft);

      if (!props.paginatedUsers.meta.nextPage || !isStillScrollable()) return;

      emit(UPDATED, props.paginatedUsers.meta.nextPage);
    }, 250);

    function isStillScrollable(): boolean {
      const rightOfPage =
        state.container!.scrollWidth - state.container!.clientWidth - 100;

      return state.container!.scrollLeft >= rightOfPage;
    }

    function fullName(name: Name): string {
      return transformFullName(name);
    }

    function address(location: Location): string {
      return transformAddress(location);
    }

    function cardClassName(userColor: UserColor): string {
      const className = "LandingDesktop-card";
      const colorfulCard = useColorfulCard(userColor);

      return `${className} ${colorfulCard}`;
    }

    return { address, cardClassName, fullName, onHorizontalScroll };
  },
});
