// Mock conversations, keyed by friend id (see data/friends.js)
// updatedAt only orders the list: bigger is newer

export const conversations = [
  {
    id: 2,
    name: "Maria Lopez",
    unread: 2,
    updatedAt: 6,
    messages: [
      { id: 1, fromMe: false, text: "Привет! Видела пост про запуск?", time: "10:12" },
      { id: 2, fromMe: true, text: "Да, поздравляю! Огромная работа 🎉", time: "10:15" },
      { id: 3, fromMe: false, text: "Спасибо! В пятницу отмечаем, приходи", time: "10:40" },
      { id: 4, fromMe: false, text: "Будет вся команда 🙂", time: "10:41" },
    ],
  },
  {
    id: 1,
    name: "Alex Morgan",
    unread: 1,
    updatedAt: 5,
    messages: [
      { id: 1, fromMe: true, text: "Алекс, вакансия junior ещё открыта?", time: "вчера" },
      { id: 2, fromMe: false, text: "Да! Скинь резюме знакомого, посмотрим", time: "вчера" },
    ],
  },
  {
    id: 3,
    name: "Daniel Kim",
    unread: 0,
    updatedAt: 4,
    messages: [
      { id: 1, fromMe: false, text: "Бежим в субботу у моря?", time: "пн" },
      { id: 2, fromMe: true, text: "Конечно, в 8:30 у пляжа", time: "пн" },
    ],
  },
  {
    id: 4,
    name: "Sofia Rossi",
    unread: 0,
    updatedAt: 3,
    messages: [
      { id: 1, fromMe: true, text: "Какое фото с офиса! Где это?", time: "12 сен" },
      { id: 2, fromMe: false, text: "22 этаж, заходи в гости", time: "12 сен" },
    ],
  },
];
