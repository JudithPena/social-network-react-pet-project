const monthsShort = ["янв", "фев", "мар", "апр", "мая", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];
const monthsLong = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

// "2026-09-28" -> { day: 28, month: 8 }, parsed by hand to avoid time zone shifts
const parse = (isoDate) => {
  const [, month, day] = isoDate.split("-").map(Number);
  return { day, month: month - 1 };
};

// "2026-09-28" -> { day: 28, month: "сен" }
export const shortDate = (isoDate) => {
  const { day, month } = parse(isoDate);
  return { day, month: monthsShort[month] };
};

// "2026-09-28" -> "28 сентября"
export const longDate = (isoDate) => {
  const { day, month } = parse(isoDate);
  return `${day} ${monthsLong[month]}`;
};
