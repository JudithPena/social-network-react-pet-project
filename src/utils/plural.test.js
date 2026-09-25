import { mutualFriendsLabel, plural } from "./plural";

test.each([
  [1, "друг"],
  [2, "друга"],
  [5, "друзей"],
  [11, "друзей"],
  [12, "друзей"],
  [21, "друг"],
  [22, "друга"],
  [111, "друзей"],
])("plural(%i)", (count, expected) => {
  expect(plural(count, ["друг", "друга", "друзей"])).toBe(expected);
});

test("mutualFriendsLabel", () => {
  expect(mutualFriendsLabel(21)).toBe("21 общий друг");
  expect(mutualFriendsLabel(3)).toBe("3 общих друга");
  expect(mutualFriendsLabel(14)).toBe("14 общих друзей");
});
