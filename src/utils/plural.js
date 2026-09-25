// Picks the Russian plural form: plural(1, ["друг", "друга", "друзей"]) -> "друг"
export const plural = (count, [one, few, many]) => {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
};

// 1250 -> "1 250 участников"
export const membersLabel = (count) =>
  `${count.toLocaleString("ru-RU")} ${plural(count, ["участник", "участника", "участников"])}`;

// 1 общий друг, 3 общих друга, 12 общих друзей
export const mutualFriendsLabel = (count) =>
  `${count} ${plural(count, ["общий друг", "общих друга", "общих друзей"])}`;
