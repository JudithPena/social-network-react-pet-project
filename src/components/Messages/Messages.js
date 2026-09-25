import { Route, Routes, useParams } from "react-router-dom";
import Chat from "./Chat";
import ConversationList from "./ConversationList";
import styles from "./Messages.module.css";

const MessagesView = () => {
  const { id } = useParams();
  const activeId = id ? Number(id) : null;

  return (
    <div className={`${styles.messages} ${activeId ? styles.hasChat : ""}`}>
      <h1 className={styles.visuallyHidden}>Сообщения</h1>
      <ConversationList />
      {activeId ? (
        <Chat key={activeId} id={activeId} />
      ) : (
        <div className={styles.placeholder}>
          <p>Выберите диалог слева, чтобы начать переписку</p>
        </div>
      )}
    </div>
  );
};

const Messages = () => {
  return (
    <Routes>
      <Route index element={<MessagesView />} />
      <Route path=":id" element={<MessagesView />} />
    </Routes>
  );
};

export default Messages;
