import { createContext, useContext, useState } from "react";
import {
  friends as initialFriends,
  requests as initialRequests,
  suggestions as initialSuggestions,
} from "../data/friends";

// Shared friends state for the friends page, the profile and the right column
const FriendsContext = createContext(null);

export const FriendsProvider = ({ children }) => {
  const [friends, setFriends] = useState(initialFriends);
  const [requests, setRequests] = useState(initialRequests);
  const [suggestions, setSuggestions] = useState(initialSuggestions);
  const [sentIds, setSentIds] = useState([]);

  const acceptRequest = (id) => {
    const person = requests.find((request) => request.id === id);
    setRequests((prev) => prev.filter((request) => request.id !== id));
    if (person) setFriends((prev) => [person, ...prev]);
  };

  const declineRequest = (id) => {
    setRequests((prev) => prev.filter((request) => request.id !== id));
  };

  const removeFriend = (id) => {
    setFriends((prev) => prev.filter((friend) => friend.id !== id));
  };

  const sendRequest = (id) => {
    setSentIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const cancelRequest = (id) => {
    setSentIds((prev) => prev.filter((sentId) => sentId !== id));
  };

  const hideSuggestion = (id) => {
    setSuggestions((prev) => prev.filter((person) => person.id !== id));
  };

  const value = {
    friends,
    requests,
    suggestions,
    sent: suggestions.filter((person) => sentIds.includes(person.id)),
    isSent: (id) => sentIds.includes(id),
    acceptRequest,
    declineRequest,
    removeFriend,
    sendRequest,
    cancelRequest,
    hideSuggestion,
  };

  return <FriendsContext.Provider value={value}>{children}</FriendsContext.Provider>;
};

export const useFriends = () => useContext(FriendsContext);
