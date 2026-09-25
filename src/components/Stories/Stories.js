import { stories } from "../../data/posts";
import { currentUser } from "../../data/profile";
import Avatar from "../Avatar/Avatar";
import styles from "./Stories.module.css";

const Stories = () => {
  return (
    <section className={styles.stories} aria-label="Истории">
      <ul className={styles.list}>
        <li>
          <button type="button" className={styles.story} aria-label="Добавить историю">
            <span className={`${styles.ring} ${styles.own}`}>
              <Avatar name={currentUser.name} size={60} />
              <span className={styles.plus} aria-hidden="true">
                +
              </span>
            </span>
            <span className={styles.name}>Добавить</span>
          </button>
        </li>
        {stories.map(({ id, author, seen }) => (
          <li key={id}>
            <button type="button" className={styles.story}>
              <span className={`${styles.ring} ${seen ? styles.seen : ""}`}>
                <Avatar name={author} size={60} />
              </span>
              <span className={styles.name}>{author.split(" ")[0]}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Stories;
