import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  reactive,
  useContext,
  useMeta,
  watch,
} from "@nuxtjs/composition-api";

import { LandingState, LandingUrlQuery } from "./landing.model";

import LandingDesktop from "@/module/landing/components/landing-desktop/landing-desktop.component.vue";
import LandingMobile from "@/module/landing/components/landing-mobile/landing-mobile.component.vue";
import { QUERY_PARAMS } from "@/module/landing/constants/landing.constant";
import { useColorfulUsers } from "@/module/landing/hooks/colorful-users";
import { usePaginateUsers } from "@/module/landing/hooks/paginate-users";
import { useSortUsers } from "@/module/landing/hooks/sort-users";
import QTopBar from "@/shared/components/top-bar/top-bar.component.vue";
import { QOA_USERS } from "@/shared/constants/storage.constant";
import { UserSort } from "@/shared/enums/user.enum";
import {
  RandomUserData,
  RandomUserResponse,
} from "@/shared/models/random-user.model";
import { useApiInvoker } from "@/shared/services/api-invoker";
import { useLocalStorage } from "@/shared/services/local-storage";
import { PaginatedData } from "@/shared/utils/pagination";

export default defineComponent({
  name: "Landing",

  components: {
    LandingDesktop,
    LandingMobile,
    QTopBar,
  },

  setup() {
    useMeta({ title: "Home | Phone Book" });

    const { apiInvoker } = useApiInvoker({});
    const ls = useLocalStorage();
    const {
      app: { router },
      query: routeQuery,
    } = useContext();

    const state = reactive<LandingState>({
      clientWidth: process.client ? document.body.clientWidth : 0,
      didSomethingWrong: false,
      isDataReady: false,
      paginatedUsers: {} as PaginatedData<RandomUserData>,
    });

    const isMobile = computed(() => state.clientWidth < 768);

    onMounted((): void => {
      initializePage();
      window.addEventListener("resize", onResize);
    });

    onUnmounted((): void => {
      window.removeEventListener("resize", onResize);
    });

    watch(routeQuery, ({ page }): void => {
      paginateUsers(page as string);
    });

    function initializePage(): void {
      const { page = "" } = routeQuery.value;
      const validPage = page || "1";

      if (!page) {
        return handlePageWithoutQuery(validPage as string);
      }

      paginateUsers(validPage as string);
    }

    function onResize(): void {
      state.clientWidth = process.client ? document.body.clientWidth : 0;
    }

    function reloadCurrentPage(): void {
      location.reload();
    }

    function paginateUsers(page: string = "1"): void {
      navigate({ page });

      if (ls.isExist(QOA_USERS)) {
        return getPaginatedUsers();
      }

      fetchPaginatedUsers();
    }

    function handleSort(sortBy: UserSort): void {
      navigate({ sortBy });
    }

    function navigate(query: LandingUrlQuery): void {
      router?.push({
        query: {
          ...routeQuery.value,
          ...query,
        },
      });
    }

    function transformRandomUsers(
      users: RandomUserData[],
    ): PaginatedData<RandomUserData> {
      const { page = "1", sortBy = "" } = routeQuery.value;

      const colorfulUsers = useColorfulUsers(users);
      const sortedUsers = useSortUsers(colorfulUsers, sortBy as UserSort);
      const paginatedUsers = usePaginateUsers(sortedUsers, page as string);

      return paginatedUsers;
    }

    async function fetchPaginatedUsers(): Promise<void> {
      try {
        const { data: Data } = await apiInvoker.get<RandomUserResponse>(
          QUERY_PARAMS,
        );

        state.paginatedUsers = transformRandomUsers(Data.results);
        ls.set(QOA_USERS, Data.results);
      } catch {
        state.didSomethingWrong = true;
      } finally {
        state.isDataReady = true;
      }
    }

    function getPaginatedUsers(): void {
      const results = ls.get<RandomUserData[]>(QOA_USERS);

      state.paginatedUsers = transformRandomUsers(results);
      state.isDataReady = true;
    }

    function handlePageWithoutQuery(page: string): void {
      router?.replace({
        query: { page },
      });
    }

    return {
      handleSort,
      isMobile,
      paginateUsers,
      reloadCurrentPage,
      state,
    };
  },

  head: {},
});
