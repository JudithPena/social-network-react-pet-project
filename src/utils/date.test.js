import { longDate, shortDate } from "./date";

test("shortDate", () => {
  expect(shortDate("2026-09-28")).toEqual({ day: 28, month: "сен" });
  expect(shortDate("2026-01-03")).toEqual({ day: 3, month: "янв" });
});

test("longDate", () => {
  expect(longDate("2026-10-12")).toBe("12 октября");
  expect(longDate("2026-05-01")).toBe("1 мая");
});
