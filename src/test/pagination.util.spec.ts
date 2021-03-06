import { MOCK_USER_DATA } from "./mocks/user.mock";

import { ColorfulUser } from "@/module/landing/hooks/colorful-users";
import { UserColor } from "@/shared/enums/user.enum";
import { paginate, PaginationOptions } from "@/shared/utils/pagination";

describe("pagination.util.ts", () => {
  let userStub: ColorfulUser;
  let optionsStub: PaginationOptions;

  beforeEach(() => {
    userStub = {
      ...MOCK_USER_DATA,
      color: UserColor.Blue,
    };

    optionsStub = {
      limit: 10,
      page: 1,
      total: 1,
    };
  });

  afterEach(() => {
    userStub = {} as ColorfulUser;
    optionsStub = {} as PaginationOptions;
  });

  it("should return paginated data", () => {
    const mockPaginatedUsers = paginate([userStub], optionsStub);
    const expectedResult = {
      data: [userStub],
      meta: {
        page: 1,
        perPage: 10,
        prevPage: null,
        nextPage: null,
        total: 1,
        totalPage: 1,
      },
    };

    expect(mockPaginatedUsers).toEqual(expectedResult);
  });
});
