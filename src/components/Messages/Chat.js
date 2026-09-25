import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useFriends } from "../../context/FriendsContext";
import { useMessages } from "../../context/MessagesContext";
import Avatar from "../Avatar/Avatar";
import styles from "./Messages.module.css";

const icons = {
  back: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M15 5l-7 7 7 7" />
    </svg>
  ),
  send: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 12l16-8-6 16-2.5-6.5z" />
    </svg>
  ),
};

const Chat = ({ id }) => {
  const { getConversation, sendMessage, markRead } = useMessages();
  const { friends } = useFriends();
  const [text, setText] = useState("");
  const listRef = useRef(null);

  const conversation = getConversation(id);
  const friend = friends.find((item) => item.id === id);
  // A friend without a conversation yet gets an empty chat
  const person = conversation || friend;
  const messages = conversation ? conversation.messages : [];

  useEffect(() => {
    markRead(id);
  }, [id, markRead]);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages.length]);

  if (!person) {
    return (
      <div className={styles.placeholder}>
        <p>Диалог не найден</p>
        <Link to="/messages">К списку диалогов</Link>
      </div>
    );
  }

  const trimmed = text.trim();

  const submit = () => {
    if (!trimmed) return;
    sendMessage({ id, name: person.name }, trimmed);
    setText("");
  };

  const handleKeyDown = (event) => {
    // Enter sends, Shift+Enter adds a new line
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submit();
    }
  };

  return (
    <section className={styles.chat} aria-label={`Диалог с ${person.name}`}>
      <header className={styles.chatHeader}>
        <Link to="/messages" className={styles.back} aria-label="К списку диалогов">
          {icons.back}
        </Link>
        <Avatar name={person.name} size={40} />
        <div className={styles.chatName}>{person.name}</div>
      </header>

      <ol className={styles.messageList} ref={listRef}>
        {messages.length === 0 && <li className={styles.noMessages}>Напишите первое сообщение</li>}
        {messages.map((message) => (
          <li key={message.id} className={`${styles.message} ${message.fromMe ? styles.mine : ""}`}>
            <span className={styles.bubble}>{message.text}</span>
            <span className={styles.messageTime}>{message.time}</span>
          </li>
        ))}
      </ol>

      <form
        className={styles.composer}
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
      >
        <textarea
          className={styles.input}
          rows={1}
          placeholder="Написать сообщение..."
          aria-label="Текст сообщения"
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className={styles.send} type="submit" aria-label="Отправить" disabled={!trimmed}>
          {icons.send}
        </button>
      </form>
    </section>
  );
};

export default Chat;
