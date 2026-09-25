import { createContext, useCallback, useContext } from "react";
import { conversations as initialConversations } from "../data/messages";
import { usePersistentState } from "../hooks/usePersistentState";

// Shared chats state for the messages page, the header and the menu
const MessagesContext = createContext(null);

const currentTime = () => new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });

export const MessagesProvider = ({ children }) => {
  const [conversations, setConversations] = usePersistentState("conversations", initialConversations);

  // person is { id, name } so a chat can be started with someone new
  const sendMessage = ({ id, name }, text) => {
    const message = { id: Date.now(), fromMe: true, text, time: currentTime() };
    setConversations((prev) => {
      const existing = prev.find((conversation) => conversation.id === id);
      const updated = existing
        ? { ...existing, messages: [...existing.messages, message], updatedAt: Date.now() }
        : { id, name, unread: 0, updatedAt: Date.now(), messages: [message] };
      return [updated, ...prev.filter((conversation) => conversation.id !== id)];
    });
  };

  // Stable reference: the chat calls it from an effect when a dialog opens
  const markRead = useCallback((id) => {
    setConversations((prev) =>
      prev.some((conversation) => conversation.id === id && conversation.unread > 0)
        ? prev.map((conversation) => (conversation.id === id ? { ...conversation, unread: 0 } : conversation))
        : prev
    );
  }, [setConversations]);

  const value = {
    conversations: [...conversations].sort((a, b) => b.updatedAt - a.updatedAt),
    unreadCount: conversations.filter((conversation) => conversation.unread > 0).length,
    getConversation: (id) => conversations.find((conversation) => conversation.id === id),
    sendMessage,
    markRead,
  };

  return <MessagesContext.Provider value={value}>{children}</MessagesContext.Provider>;
};

export const useMessages = () => useContext(MessagesContext);
