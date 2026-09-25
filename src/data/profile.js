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

export const posts = [
  {
    id: 3,
    author: currentUser.name,
    time: "2 часа назад",
    text: "Наконец-то доделала шапку и меню для своего пет-проекта. Следующий шаг — лента постов!",
    likes: 24,
    comments: 5,
    shares: 1,
  },
  {
    id: 2,
    author: currentUser.name,
    time: "вчера",
    text: "Выходные на побережье. Лучший способ перезагрузиться перед новым спринтом.",
    image: "sunset",
    likes: 87,
    comments: 12,
    shares: 3,
  },
  {
    id: 1,
    author: currentUser.name,
    time: "3 дня назад",
    text: "Кто может посоветовать хорошие материалы по React Router? Делюсь своими в комментариях.",
    likes: 15,
    comments: 9,
    shares: 0,
  },
];

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
