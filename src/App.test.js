import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

const renderAt = (path) =>
  render(
    <MemoryRouter
      initialEntries={[path]}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <App />
    </MemoryRouter>
  );

const menuLink = (name) =>
  within(screen.getByRole("navigation", { name: "Основное меню" })).getByRole("link", {
    name: new RegExp(`^${name}`),
  });

test("renders the page matching the URL and highlights its menu item", () => {
  renderAt("/friends");

  expect(screen.getByRole("heading", { name: "Друзья" })).toBeInTheDocument();
  expect(menuLink("Друзья")).toHaveAttribute("aria-current", "page");
});

test("navigates between sections via the menu", async () => {
  renderAt("/");
  expect(screen.getByRole("heading", { name: "Лента" })).toBeInTheDocument();

  await userEvent.click(menuLink("Группы"));

  expect(screen.getByRole("heading", { name: "Группы" })).toBeInTheDocument();
  expect(menuLink("Лента")).not.toHaveAttribute("aria-current");
});

test("shows a not found page for unknown URLs", () => {
  renderAt("/no-such-page");

  expect(screen.getByRole("heading", { name: "Страница не найдена" })).toBeInTheDocument();
});

describe("profile page", () => {
  const profileTab = (name) =>
    within(screen.getByRole("navigation", { name: "Разделы профиля" })).getByRole("link", { name });

  test("opens a tab by URL and keeps the profile menu item active", () => {
    renderAt("/profile/about");

    expect(profileTab("О себе")).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("heading", { level: 2, name: "О себе" })).toBeInTheDocument();
    expect(menuLink("Профиль")).toHaveAttribute("aria-current", "page");
  });

  test("switches tabs", async () => {
    renderAt("/profile");

    await userEvent.click(profileTab("Друзья"));

    expect(screen.getByText("Alex Morgan")).toBeInTheDocument();
    expect(screen.getByText("21 общий друг")).toBeInTheDocument();
  });

  test("publishes a new post", async () => {
    renderAt("/profile");
    const submit = screen.getByRole("button", { name: "Опубликовать" });
    expect(submit).toBeDisabled();

    await userEvent.type(screen.getByRole("textbox", { name: "Текст публикации" }), "Мой первый пост");
    await userEvent.click(submit);

    expect(screen.getByText("Мой первый пост")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Текст публикации" })).toHaveValue("");
  });

  test("toggles a like", async () => {
    renderAt("/profile");
    const [like] = screen.getAllByRole("button", { name: /Нравится/ });
    expect(like).toHaveTextContent("24");

    await userEvent.click(like);

    expect(like).toHaveAttribute("aria-pressed", "true");
    expect(like).toHaveTextContent("25");
  });
});

describe("feed", () => {
  test("shows stories and posts from friends and the user", () => {
    renderAt("/");

    expect(screen.getByRole("region", { name: "Истории" })).toBeInTheDocument();
    expect(screen.getByText(/запустили новую версию/)).toBeInTheDocument();
    expect(screen.getByText(/доделала шапку и меню/)).toBeInTheDocument();
  });

  test("profile shows only the user's own posts", () => {
    renderAt("/profile");

    expect(screen.getByText(/доделала шапку и меню/)).toBeInTheDocument();
    expect(screen.queryByText(/запустили новую версию/)).not.toBeInTheDocument();
  });

  test("a post published in the feed appears in the profile", async () => {
    renderAt("/");

    await userEvent.type(screen.getByRole("textbox", { name: "Текст публикации" }), "Пост из ленты");
    await userEvent.click(screen.getByRole("button", { name: "Опубликовать" }));
    await userEvent.click(menuLink("Профиль"));

    expect(screen.getByText("Пост из ленты")).toBeInTheDocument();
  });

  test("a like is kept when switching pages", async () => {
    renderAt("/profile");
    await userEvent.click(screen.getAllByRole("button", { name: /Нравится/ })[0]);

    await userEvent.click(menuLink("Лента"));

    const post = screen
      .getAllByRole("article")
      .find((article) => within(article).queryByText(/доделала шапку и меню/));
    expect(within(post).getByRole("button", { name: /Нравится/ })).toHaveAttribute("aria-pressed", "true");
  });
});

describe("right column", () => {
  test("sends and cancels a friend request", async () => {
    renderAt("/");
    const add = screen.getByRole("button", { name: "Добавить Olivia Brown в друзья" });

    await userEvent.click(add);
    const cancel = screen.getByRole("button", { name: "Отменить заявку для Olivia Brown" });
    expect(cancel).toHaveAttribute("aria-pressed", "true");

    await userEvent.click(cancel);
    expect(screen.getByRole("button", { name: "Добавить Olivia Brown в друзья" })).toBeInTheDocument();
  });

  test("marks going to an event and updates the counter", async () => {
    renderAt("/");
    expect(screen.getByText("48 участников")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Пойду на «React Meetup Barcelona»" }));

    expect(screen.getByText("49 участников")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Не пойду на «React Meetup Barcelona»" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
  });

  test("links to the full lists", () => {
    renderAt("/");
    const [friendsLink, eventsLink] = screen.getAllByRole("link", { name: "Все" });

    expect(friendsLink).toHaveAttribute("href", "/friends/suggestions");
    expect(eventsLink).toHaveAttribute("href", "/events");
  });
});

describe("friends page", () => {
  const friendsTab = (name) =>
    within(screen.getByRole("navigation", { name: "Разделы друзей" })).getByRole("link", {
      name: new RegExp(`^${name}`),
    });

  test("lists friends and filters them by name", async () => {
    renderAt("/friends");
    expect(screen.getByText("Alex Morgan")).toBeInTheDocument();

    await userEvent.type(screen.getByRole("searchbox", { name: "Поиск среди друзей" }), "mar");

    expect(screen.getByText("Maria Lopez")).toBeInTheDocument();
    expect(screen.queryByText("Alex Morgan")).not.toBeInTheDocument();

    await userEvent.type(screen.getByRole("searchbox", { name: "Поиск среди друзей" }), "xyz");
    expect(screen.getByText(/Никого не нашлось/)).toBeInTheDocument();
  });

  test("accepting a request adds a friend and updates the menu badge", async () => {
    renderAt("/friends/requests");
    expect(menuLink("Друзья")).toHaveTextContent("3");

    await userEvent.click(screen.getByRole("button", { name: "Принять заявку от Chloe Dubois" }));

    expect(screen.queryByText("Chloe Dubois")).not.toBeInTheDocument();
    expect(menuLink("Друзья")).toHaveTextContent("2");

    await userEvent.click(friendsTab("Все друзья"));
    expect(screen.getByText("Chloe Dubois")).toBeInTheDocument();
  });

  test("declining the last request shows an empty state", async () => {
    renderAt("/friends/requests");

    for (const name of ["Chloe Dubois", "Mateo Garcia", "Hannah Schmidt"]) {
      await userEvent.click(screen.getByRole("button", { name: `Отклонить заявку от ${name}` }));
    }

    expect(screen.getByText("Новых заявок нет.")).toBeInTheDocument();
    expect(menuLink("Друзья")).not.toHaveTextContent(/\d/);
  });

  test("a request sent from the right column shows up in sent requests", async () => {
    renderAt("/friends/sent");
    expect(screen.getByText(/никому не отправили заявку/)).toBeInTheDocument();

    const sideBar = screen.getByRole("complementary");
    await userEvent.click(within(sideBar).getByRole("button", { name: "Добавить Olivia Brown в друзья" }));

    // The sent tab has its own "Отменить заявку" button next to the one in the right column
    await userEvent.click(screen.getByText("Отменить заявку"));
    expect(screen.getByText(/никому не отправили заявку/)).toBeInTheDocument();
    expect(within(sideBar).getByRole("button", { name: "Добавить Olivia Brown в друзья" })).toBeInTheDocument();
  });

  test("removing a friend also updates the profile", async () => {
    renderAt("/friends");

    await userEvent.click(screen.getByRole("button", { name: "Удалить Alex Morgan из друзей" }));
    await userEvent.click(menuLink("Профиль"));
    await userEvent.click(within(screen.getByRole("navigation", { name: "Разделы профиля" })).getByRole("link", { name: "Друзья" }));

    expect(screen.queryByText("Alex Morgan")).not.toBeInTheDocument();
    expect(screen.getByText("Maria Lopez")).toBeInTheDocument();
  });

  test("hides a suggestion", async () => {
    renderAt("/friends/suggestions");
    const main = screen.getByRole("main");

    await userEvent.click(within(main).getByRole("button", { name: "Скрыть Mia Johansson из рекомендаций" }));

    expect(within(main).queryByText("Mia Johansson")).not.toBeInTheDocument();
  });
});

describe("messages page", () => {
  const dialogs = () => screen.getByRole("region", { name: "Диалоги" });
  const dialogLink = (name) => within(dialogs()).getByRole("link", { name: new RegExp(name) });
  const headerMessages = () => screen.getByRole("link", { name: "Сообщения" });

  test("lists conversations and hides the right column", () => {
    renderAt("/messages");

    expect(dialogLink("Maria Lopez")).toHaveTextContent("Будет вся команда");
    expect(screen.getByText("Выберите диалог слева, чтобы начать переписку")).toBeInTheDocument();
    expect(screen.queryByRole("complementary")).not.toBeInTheDocument();
  });

  test("opening a conversation marks it as read", async () => {
    renderAt("/messages");
    expect(menuLink("Сообщения")).toHaveTextContent("2");
    expect(headerMessages()).toHaveTextContent("2");

    await userEvent.click(dialogLink("Maria Lopez"));

    const chat = screen.getByRole("region", { name: "Диалог с Maria Lopez" });
    expect(within(chat).getByText("Спасибо! В пятницу отмечаем, приходи")).toBeInTheDocument();
    expect(within(dialogLink("Maria Lopez")).queryByLabelText(/непрочитанных/)).not.toBeInTheDocument();
    expect(within(dialogLink("Alex Morgan")).getByLabelText("1 непрочитанных")).toBeInTheDocument();
    expect(menuLink("Сообщения")).toHaveTextContent("1");
    expect(headerMessages()).toHaveTextContent("1");
  });

  test("sends a message with the button and with Enter", async () => {
    renderAt("/messages/3");
    const input = screen.getByRole("textbox", { name: "Текст сообщения" });
    expect(screen.getByRole("button", { name: "Отправить" })).toBeDisabled();

    await userEvent.type(input, "Привет!");
    await userEvent.click(screen.getByRole("button", { name: "Отправить" }));
    await userEvent.type(input, "Как дела?{Enter}");

    const chat = screen.getByRole("region", { name: "Диалог с Daniel Kim" });
    expect(within(chat).getByText("Привет!")).toBeInTheDocument();
    expect(within(chat).getByText("Как дела?")).toBeInTheDocument();
    expect(input).toHaveValue("");
    // The conversation moves to the top with a preview of the last message
    const [first] = within(dialogs()).getAllByRole("link");
    expect(first).toHaveTextContent("Daniel Kim");
    expect(first).toHaveTextContent("Вы: Как дела?");
  });

  test("Shift+Enter adds a new line instead of sending", async () => {
    renderAt("/messages/3");
    const input = screen.getByRole("textbox", { name: "Текст сообщения" });

    await userEvent.type(input, "Первая{Shift>}{Enter}{/Shift}вторая");

    expect(input).toHaveValue("Первая\nвторая");
  });

  test("'Написать' on the friends page starts a new conversation", async () => {
    renderAt("/friends");
    // Emma Novak is the last friend in the list and has no conversation yet
    await userEvent.click(screen.getAllByRole("link", { name: "Написать" })[5]);

    const chat = screen.getByRole("region", { name: "Диалог с Emma Novak" });
    expect(within(chat).getByText("Напишите первое сообщение")).toBeInTheDocument();
    expect(within(dialogs()).queryByText("Emma Novak")).not.toBeInTheDocument();

    await userEvent.type(screen.getByRole("textbox", { name: "Текст сообщения" }), "Привет, Эмма!{Enter}");

    expect(dialogLink("Emma Novak")).toHaveTextContent("Вы: Привет, Эмма!");
  });

  test("shows not found for an unknown conversation", () => {
    renderAt("/messages/999");

    expect(screen.getByText("Диалог не найден")).toBeInTheDocument();
  });
});

describe("saving data between visits", () => {
  // Unmounting and rendering again works like reloading the page
  const reload = (unmount, path) => {
    unmount();
    return renderAt(path);
  };

  test("keeps posts, likes, friends and read messages after a reload", async () => {
    const { unmount } = renderAt("/");
    await userEvent.type(screen.getByRole("textbox", { name: "Текст публикации" }), "Пост до перезагрузки");
    await userEvent.click(screen.getByRole("button", { name: "Опубликовать" }));
    await userEvent.click(screen.getAllByRole("button", { name: /Нравится/ })[1]);
    await userEvent.click(menuLink("Друзья"));
    await userEvent.click(screen.getByRole("link", { name: /^Заявки/ }));
    await userEvent.click(screen.getByRole("button", { name: "Принять заявку от Chloe Dubois" }));
    await userEvent.click(menuLink("Сообщения"));
    await userEvent.click(screen.getByRole("link", { name: /Maria Lopez/ }));

    reload(unmount, "/");

    expect(screen.getByText("Пост до перезагрузки")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /Нравится/ })[1]).toHaveAttribute("aria-pressed", "true");
    expect(menuLink("Друзья")).toHaveTextContent("2");
    expect(menuLink("Сообщения")).toHaveTextContent("1");
  });

  test("keeps the 'going' mark on an event", async () => {
    const { unmount } = renderAt("/");
    await userEvent.click(screen.getByRole("button", { name: "Пойду на «React Meetup Barcelona»" }));

    reload(unmount, "/");

    expect(screen.getByText("49 участников")).toBeInTheDocument();
  });

  test("the settings page resets everything to the mock data", async () => {
    renderAt("/");
    await userEvent.type(screen.getByRole("textbox", { name: "Текст публикации" }), "Временный пост");
    await userEvent.click(screen.getByRole("button", { name: "Опубликовать" }));
    await userEvent.click(menuLink("Настройки"));

    await userEvent.click(screen.getByRole("button", { name: "Сбросить демо-данные" }));
    await userEvent.click(screen.getByRole("button", { name: "Отмена" }));
    await userEvent.click(screen.getByRole("button", { name: "Сбросить демо-данные" }));
    await userEvent.click(screen.getByRole("button", { name: "Да, сбросить" }));

    expect(screen.getByRole("status")).toHaveTextContent("Демо-данные сброшены");
    await userEvent.click(menuLink("Лента"));
    expect(screen.queryByText("Временный пост")).not.toBeInTheDocument();
    expect(screen.getByText(/доделала шапку и меню/)).toBeInTheDocument();
  });
});

describe("events page", () => {
  const eventTitles = () =>
    within(screen.getByRole("main"))
      .getAllByRole("article")
      .map((card) => within(card).getByRole("heading").textContent);
  const eventsTab = (name) =>
    within(screen.getByRole("navigation", { name: "Разделы событий" })).getByRole("link", {
      name: new RegExp(`^${name}`),
    });

  test("lists events by date and filters them by category", async () => {
    renderAt("/events");
    expect(eventTitles()).toEqual([
      "React Meetup Barcelona",
      "Воркшоп по дизайн-системам",
      "Пробежка у моря",
      "Вечер настольных игр",
      "Frontend Conf 2026",
      "Велопрогулка на Монжуик",
    ]);

    await userEvent.click(screen.getByRole("button", { name: "IT" }));

    expect(screen.getByRole("button", { name: "IT" })).toHaveAttribute("aria-pressed", "true");
    expect(eventTitles()).toEqual(["React Meetup Barcelona", "Frontend Conf 2026"]);
  });

  test("reads the category from the URL", () => {
    renderAt("/events?category=sport");

    expect(eventTitles()).toEqual(["Пробежка у моря", "Велопрогулка на Монжуик"]);
  });

  test("going marks are shared with the right column and the 'Я иду' tab", async () => {
    renderAt("/events/going");
    expect(screen.getByText(/никуда не собираетесь/)).toBeInTheDocument();

    await userEvent.click(eventsTab("Все события"));
    const card = within(screen.getByRole("main"))
      .getAllByRole("article")
      .find((article) => within(article).queryByText("Вечер настольных игр"));
    await userEvent.click(within(card).getByRole("button", { name: "Пойду на «Вечер настольных игр»" }));
    // The first event is also in the right column; mark it there
    const sideBar = screen.getByRole("complementary");
    await userEvent.click(within(sideBar).getByRole("button", { name: "Пойду на «React Meetup Barcelona»" }));

    expect(eventsTab("Я иду")).toHaveTextContent("2");
    await userEvent.click(eventsTab("Я иду"));
    expect(eventTitles()).toEqual(["React Meetup Barcelona", "Вечер настольных игр"]);
  });

  test("shows event details", async () => {
    renderAt("/events/1");

    expect(screen.getByRole("heading", { level: 1, name: "React Meetup Barcelona" })).toBeInTheDocument();
    expect(screen.getByText("28 сентября, 19:00")).toBeInTheDocument();
    expect(screen.getByText("48 человек")).toBeInTheDocument();
    expect(screen.getByText("Maria Lopez")).toBeInTheDocument();

    const main = screen.getByRole("main");
    await userEvent.click(within(main).getAllByRole("button", { name: "Пойду на «React Meetup Barcelona»" })[0]);

    expect(screen.getByText("49 человек")).toBeInTheDocument();
    expect(menuLink("События")).toHaveAttribute("aria-current", "page");
  });

  test("the right column links to event details", async () => {
    renderAt("/");

    await userEvent.click(within(screen.getByRole("complementary")).getByRole("link", { name: "Пробежка у моря" }));

    expect(screen.getByRole("heading", { level: 1, name: "Пробежка у моря" })).toBeInTheDocument();
  });

  test("shows not found for an unknown event", () => {
    renderAt("/events/999");

    expect(screen.getByRole("heading", { name: "Событие не найдено" })).toBeInTheDocument();
  });
});

describe("saved page", () => {
  const savedTab = (name) =>
    within(screen.getByRole("navigation", { name: "Разделы сохранённого" })).getByRole("link", {
      name: new RegExp(`^${name}`),
    });
  const savedHeadings = () =>
    within(screen.getByRole("main"))
      .getAllByRole("article")
      .map((article) => within(article).queryByRole("heading")?.textContent ?? article.textContent.slice(0, 20));

  test("is empty at first", () => {
    renderAt("/saved");

    expect(screen.getByText("Здесь появится всё, что вы сохраните.")).toBeInTheDocument();
    expect(savedTab("Всё")).not.toHaveTextContent(/\d/);
  });

  test("a post saved in the feed shows up and can be removed", async () => {
    renderAt("/");
    await userEvent.click(screen.getByRole("button", { name: /^Сохранить «Сегодня запустили/ }));
    expect(screen.getByRole("button", { name: /^Убрать «Сегодня запустили/ })).toHaveAttribute("aria-pressed", "true");

    await userEvent.click(menuLink("Сохранённое"));
    expect(screen.getByText(/запустили новую версию/)).toBeInTheDocument();
    expect(savedTab("Публикации")).toHaveTextContent("1");

    await userEvent.click(screen.getByRole("button", { name: /^Убрать «Сегодня запустили/ }));
    expect(screen.queryByText(/запустили новую версию/)).not.toBeInTheDocument();
  });

  test("events are saved from the card and the details page, newest first", async () => {
    renderAt("/events");
    await userEvent.click(screen.getByRole("button", { name: "Сохранить «Пробежка у моря»" }));
    await userEvent.click(screen.getByRole("link", { name: "Frontend Conf 2026" }));
    await userEvent.click(screen.getByRole("button", { name: "Сохранить «Frontend Conf 2026»" }));
    await userEvent.click(menuLink("Сохранённое"));

    expect(savedHeadings()).toEqual(["Frontend Conf 2026", "Пробежка у моря"]);

    await userEvent.click(savedTab("Публикации"));
    expect(screen.getByText("Сохранённых публикаций пока нет.")).toBeInTheDocument();
    await userEvent.click(savedTab("События"));
    expect(savedHeadings()).toHaveLength(2);
  });

  test("keeps bookmarks after a reload", async () => {
    const { unmount } = renderAt("/events/2");
    await userEvent.click(screen.getByRole("button", { name: "Сохранить «Воркшоп по дизайн-системам»" }));

    unmount();
    renderAt("/saved/events");

    expect(screen.getByRole("heading", { name: "Воркшоп по дизайн-системам" })).toBeInTheDocument();
  });
});

describe("groups page", () => {
  const groupNames = () =>
    within(screen.getByRole("main"))
      .getAllByRole("article")
      .map((card) => within(card).getByRole("heading").textContent);
  const groupsTab = (name) =>
    within(screen.getByRole("navigation", { name: "Разделы групп" })).getByRole("link", {
      name: new RegExp(`^${name}`),
    });

  test("lists groups, searches and shows the user's groups", async () => {
    renderAt("/groups");
    expect(groupNames()).toHaveLength(6);

    await userEvent.type(screen.getByRole("searchbox", { name: "Поиск групп" }), "design");
    expect(groupNames()).toEqual(["UI/UX Design Community"]);

    // The search query stays when switching tabs, so clear it first
    await userEvent.clear(screen.getByRole("searchbox", { name: "Поиск групп" }));
    await userEvent.click(groupsTab("Мои группы"));
    expect(groupNames()).toEqual(["React Developers Barcelona", "Бегуны Барселоны"]);
  });

  test("joining a group updates members and the 'Мои группы' tab", async () => {
    renderAt("/groups");
    expect(screen.getByText("Дизайн · 3 400 участников")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Вступить в группу «UI/UX Design Community»" }));

    expect(screen.getByText("Дизайн · 3 401 участник")).toBeInTheDocument();
    expect(groupsTab("Мои группы")).toHaveTextContent("3");
  });

  test("only members can post in a group", async () => {
    renderAt("/groups/2");
    expect(screen.getByRole("heading", { level: 1, name: "UI/UX Design Community" })).toBeInTheDocument();
    expect(screen.getByText(/подборку лучших дашбордов/)).toBeInTheDocument();
    expect(screen.getByText("Вступите в группу, чтобы публиковать посты.")).toBeInTheDocument();
    expect(screen.queryByRole("textbox", { name: "Текст публикации" })).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Вступить в группу «UI/UX Design Community»" }));
    await userEvent.type(screen.getByRole("textbox", { name: "Текст публикации" }), "Всем привет из группы!");
    await userEvent.click(screen.getByRole("button", { name: "Опубликовать" }));

    expect(screen.getByText("Всем привет из группы!")).toBeInTheDocument();
  });

  test("group posts can be liked and saved", async () => {
    renderAt("/groups/1");
    const likeButton = screen.getAllByRole("button", { name: /Нравится/ })[0];
    await userEvent.click(likeButton);
    expect(likeButton).toHaveTextContent("13");
    await userEvent.click(screen.getByRole("button", { name: /^Сохранить «Кто идёт на митап/ }));

    await userEvent.click(menuLink("Сохранённое"));

    expect(screen.getByText(/Кто идёт на митап 28-го/)).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /Нравится/ })[0]).toHaveAttribute("aria-pressed", "true");
  });

  test("keeps membership after a reload", async () => {
    const { unmount } = renderAt("/groups/1");
    await userEvent.click(screen.getByRole("button", { name: "Выйти из группы «React Developers Barcelona»" }));

    unmount();
    renderAt("/groups/mine");

    expect(groupNames()).toEqual(["Бегуны Барселоны"]);
  });

  test("shows not found for an unknown group", () => {
    renderAt("/groups/999");

    expect(screen.getByRole("heading", { name: "Группа не найдена" })).toBeInTheDocument();
  });
});
