import { useEffect, useState } from "react";

// Bump the version when the shape of stored data changes, old data is then ignored
export const STORAGE_PREFIX = "circlehub:v1:";

const read = (key, initialValue) => {
  try {
    const stored = window.localStorage.getItem(STORAGE_PREFIX + key);
    return stored === null ? initialValue : JSON.parse(stored);
  } catch {
    // Storage is unavailable (private mode) or holds broken JSON
    return initialValue;
  }
};

// Like useState, but the value survives page reloads via localStorage
export const usePersistentState = (key, initialValue) => {
  const [value, setValue] = useState(() => read(key, initialValue));

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
    } catch {
      // Quota exceeded or storage disabled: keep working in memory
    }
  }, [key, value]);

  // Keep several open tabs in sync
  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === STORAGE_PREFIX + key) setValue(read(key, initialValue));
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
    // initialValue is only a fallback, a new array on each render must not resubscribe
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return [value, setValue];
};

// Removes everything the app saved, used by the "reset demo data" button
export const clearPersistentState = () => {
  try {
    Object.keys(window.localStorage)
      .filter((key) => key.startsWith(STORAGE_PREFIX))
      .forEach((key) => window.localStorage.removeItem(key));
  } catch {
    // Nothing to clear
  }
};
