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
