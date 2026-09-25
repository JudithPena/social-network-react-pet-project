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

export const photos = ["sunset", "ocean", "forest", "city", "sunset", "forest", "ocean", "city", "sunset"].map(
  (image, index) => ({ id: index + 1, image })
);
