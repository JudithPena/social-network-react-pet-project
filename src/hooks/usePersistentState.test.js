import { act, renderHook } from "@testing-library/react";
import { clearPersistentState, STORAGE_PREFIX, usePersistentState } from "./usePersistentState";

test("starts with the initial value and saves changes", () => {
  const { result } = renderHook(() => usePersistentState("counter", 1));
  expect(result.current[0]).toBe(1);

  act(() => result.current[1](2));

  expect(result.current[0]).toBe(2);
  expect(window.localStorage.getItem(`${STORAGE_PREFIX}counter`)).toBe("2");
});

test("reads a saved value", () => {
  window.localStorage.setItem(`${STORAGE_PREFIX}list`, JSON.stringify(["a", "b"]));

  const { result } = renderHook(() => usePersistentState("list", []));

  expect(result.current[0]).toEqual(["a", "b"]);
});

test("falls back to the initial value when stored JSON is broken", () => {
  window.localStorage.setItem(`${STORAGE_PREFIX}broken`, "{not json");

  const { result } = renderHook(() => usePersistentState("broken", "fallback"));

  expect(result.current[0]).toBe("fallback");
});

test("picks up changes made in another tab", () => {
  const { result } = renderHook(() => usePersistentState("shared", 1));

  act(() => {
    window.localStorage.setItem(`${STORAGE_PREFIX}shared`, "5");
    window.dispatchEvent(new StorageEvent("storage", { key: `${STORAGE_PREFIX}shared` }));
  });

  expect(result.current[0]).toBe(5);
});

test("clearPersistentState removes only the app's keys", () => {
  window.localStorage.setItem(`${STORAGE_PREFIX}posts`, "[]");
  window.localStorage.setItem("other-app", "keep me");

  clearPersistentState();

  expect(window.localStorage.getItem(`${STORAGE_PREFIX}posts`)).toBeNull();
  expect(window.localStorage.getItem("other-app")).toBe("keep me");
});
