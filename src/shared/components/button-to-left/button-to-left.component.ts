import {
  defineComponent,
  onMounted,
  onUnmounted,
  reactive,
} from "@nuxtjs/composition-api";

import { ButtonToLeftState } from "./button-to-left.model";

import QSlideUpTransition from "@/shared/components/slide-up-transition/slide-up-transition.component.vue";
import {
  SCROLL_INTERVAL,
  SCROLL_STEP_DIVIDER,
} from "@/shared/constants/scroll.constant";

export default defineComponent({
  name: "ButtonToLeft",

  components: {
    QSlideUpTransition,
  },

  props: {
    selector: {
      type: String,
      default: "body",
    },
  },

  setup(props) {
    const state = reactive<ButtonToLeftState>({
      container: null,
      isShowButton: false,
    });

    onMounted((): void => {
      state.container = document.querySelector(props.selector);
      state.container?.addEventListener("scroll", toggleToLeftButton);
    });

    onUnmounted((): void => {
      state.container?.removeEventListener("scroll", toggleToLeftButton);
    });

    function toggleToLeftButton(): void {
      if (!state.container) return;
      state.isShowButton = state.container.scrollLeft >= 900;
    }

    function onClickButton(): void {
      if (!state.container) return;

      const scrollStep = state.container.scrollLeft / SCROLL_STEP_DIVIDER;
      const scrollInterval = setInterval((): void => {
        if (state.container!.scrollLeft === 0) {
          window.clearInterval(scrollInterval);
        }

        state.container!.scrollLeft -= scrollStep;
      }, SCROLL_INTERVAL);
    }

    return { onClickButton, state };
  },
});
