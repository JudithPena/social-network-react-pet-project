// Mock data until there is a backend

export const currentUser = {
  name: "Judith Pena",
  handle: "judithpena",
  bio: "Фронтенд-разработчица. Люблю React, путешествия и хороший кофе.",
  stats: { posts: 128, followers: 2450, following: 312 },
  about: [
    { id: "location", label: "Город", value: "Барселона, Испания" },
    { id: "work", label: "Работа", value: "Frontend Developer в Circle Studio" },
    { id: "education", label: "Образование", value: "Университет Барселоны" },
    { id: "joined", label: "На сайте с", value: "март 2023" },
    { id: "site", label: "Сайт", value: "judithpena.dev" },
  ],
};

export const friends = [
  { id: 1, name: "Alex Morgan", mutual: 12 },
  { id: 2, name: "Maria Lopez", mutual: 8 },
  { id: 3, name: "Daniel Kim", mutual: 21 },
  { id: 4, name: "Sofia Rossi", mutual: 3 },
  { id: 5, name: "Liam Carter", mutual: 15 },
  { id: 6, name: "Emma Novak", mutual: 6 },
];

export const photos = ["sunset", "ocean", "forest", "city", "sunset", "forest", "ocean", "city", "sunset"].map(
  (image, index) => ({ id: index + 1, image })
);
