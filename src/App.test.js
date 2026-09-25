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
