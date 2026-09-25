import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useMessages } from "../../context/MessagesContext";
import Avatar from "../Avatar/Avatar";
import styles from "./Messages.module.css";

const ConversationList = () => {
  const { conversations } = useMessages();
  const [query, setQuery] = useState("");

  const normalized = query.trim().toLowerCase();
  const visible = conversations.filter((conversation) => conversation.name.toLowerCase().includes(normalized));

  return (
    <section className={styles.sidebar} aria-label="Диалоги">
      <div className={styles.sidebarHeader}>
        <h2 className={styles.sidebarTitle}>Сообщения</h2>
        <input
          className={styles.search}
          type="search"
          placeholder="Поиск диалогов"
          aria-label="Поиск диалогов"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      {visible.length === 0 ? (
        <p className={styles.empty}>Диалогов не найдено</p>
      ) : (
        <ul className={styles.conversations}>
          {visible.map(({ id, name, unread, messages }) => {
            const last = messages[messages.length - 1];
            return (
              <li key={id}>
                <NavLink
                  to={`/messages/${id}`}
                  className={({ isActive }) => `${styles.conversation} ${isActive ? styles.activeConversation : ""}`}
                >
                  <Avatar name={name} size={44} />
                  <span className={styles.conversationInfo}>
                    <span className={styles.conversationTop}>
                      <span className={styles.conversationName}>{name}</span>
                      <span className={styles.conversationTime}>{last.time}</span>
                    </span>
                    <span className={styles.conversationBottom}>
                      <span className={`${styles.preview} ${unread > 0 ? styles.previewUnread : ""}`}>
                        {last.fromMe && "Вы: "}
                        {last.text}
                      </span>
                      {unread > 0 && (
                        <span className={styles.unread} aria-label={`${unread} непрочитанных`}>
                          {unread}
                        </span>
                      )}
                    </span>
                  </span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default ConversationList;
