import { useState } from "react";
import Avatar from "../Avatar/Avatar";
import styles from "./CreatePost.module.css";

const CreatePost = ({ author, onSubmit }) => {
  const [text, setText] = useState("");
  const trimmed = text.trim();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!trimmed) return;
    onSubmit(trimmed);
    setText("");
  };

  return (
    <form className={styles.createPost} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <Avatar name={author} size={44} />
        <textarea
          className={styles.input}
          rows={2}
          placeholder="Что у вас нового?"
          aria-label="Текст публикации"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
      </div>
      <div className={styles.footer}>
        <button className={styles.submit} type="submit" disabled={!trimmed}>
          Опубликовать
        </button>
      </div>
    </form>
  );
};

export default CreatePost;
