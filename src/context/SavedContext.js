import { createContext, useContext } from "react";
import { usePersistentState } from "../hooks/usePersistentState";

// Bookmarks for posts and events: [{ type: "post" | "event", id }], newest first
const SavedContext = createContext(null);

const same = (item, type, id) => item.type === type && item.id === id;

export const SavedProvider = ({ children }) => {
  const [items, setItems] = usePersistentState("saved", []);

  const toggleSaved = (type, id) => {
    setItems((prev) =>
      prev.some((item) => same(item, type, id))
        ? prev.filter((item) => !same(item, type, id))
        : [{ type, id }, ...prev]
    );
  };

  const value = {
    items,
    isSaved: (type, id) => items.some((item) => same(item, type, id)),
    toggleSaved,
  };

  return <SavedContext.Provider value={value}>{children}</SavedContext.Provider>;
};

export const useSaved = () => useContext(SavedContext);
