import faker from "faker";

import { MOCK_USER_LOCATION, MOCK_USER_NAME } from "./mocks/user.mock";

import { Location, Name } from "@/shared/models/random-user.model";
import { transformAddress, transformFullName } from "@/shared/utils/transform";

describe("transform.util.ts", () => {
  describe("when execute transformAddress", () => {
    it("should return address", () => {
      const locationStub: Location = MOCK_USER_LOCATION;
      const expectedResult = `${locationStub.city}, ${locationStub.state}, ${locationStub.postcode}`;

      expect(transformAddress(locationStub)).toBe(expectedResult);
    });

    it("should return undefined string address WHEN parameter is INVALID", () => {
      const locationStub = {
        random: faker.random.alpha(),
      } as any;
      const expectedResult = "undefined, undefined, undefined";

      expect(transformAddress(locationStub)).toBe(expectedResult);
    });
  });

  describe("when execute transformFullName", () => {
    it("should return full name", () => {
      const userStub: Name = MOCK_USER_NAME;
      const expectedResult = `${userStub.title} ${userStub.first} ${userStub.last}`;

      expect(transformFullName(userStub)).toBe(expectedResult);
    });

    it("should return undefined string full name WHEN parameter is INVALID", () => {
      const userStub = {
        random: faker.random.alpha(),
      } as any;
      const expectedResult = "undefined undefined undefined";

      expect(transformFullName(userStub)).toBe(expectedResult);
    });
  });
});
