// 850 -> "850 €" (with a non-breaking space, as Intl formats it for ru-RU)
export const formatPrice = (price) =>
  price.toLocaleString("ru-RU", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
