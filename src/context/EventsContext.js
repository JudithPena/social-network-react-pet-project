import { createContext, useContext } from "react";
import { events as allEvents } from "../data/events";
import { usePersistentState } from "../hooks/usePersistentState";

// Shared "going" marks for the events page and the right column
const EventsContext = createContext(null);

const byDate = (a, b) => a.date.localeCompare(b.date);

export const EventsProvider = ({ children }) => {
  const [goingIds, setGoingIds] = usePersistentState("goingToEvents", []);

  const toggleGoing = (id) => {
    setGoingIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  // The counter includes the user when they are going
  const events = [...allEvents].sort(byDate).map((event) => {
    const isGoing = goingIds.includes(event.id);
    return { ...event, isGoing, going: event.going + (isGoing ? 1 : 0) };
  });

  const value = {
    events,
    getEvent: (id) => events.find((event) => event.id === id),
    toggleGoing,
  };

  return <EventsContext.Provider value={value}>{children}</EventsContext.Provider>;
};

export const useEvents = () => useContext(EventsContext);
