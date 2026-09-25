import Avatar from "../Avatar/Avatar";
import ImagePlaceholder from "../ImagePlaceholder/ImagePlaceholder";
import SaveButton from "../SaveButton/SaveButton";
import styles from "./Post.module.css";

const icons = {
  like: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
    </svg>
  ),
  comment: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5h16v11H8l-4 4z" />
    </svg>
  ),
  share: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14 5l6 6-6 6M20 11H9a5 5 0 0 0-5 5v3" />
    </svg>
  ),
};

// Short quote of the post for button labels
const excerpt = (text) => (text.length > 40 ? `${text.slice(0, 40).trim()}…` : text);

const Post = ({ id, author, time, text, image, likes, comments, shares, liked = false, onLike }) => {
  return (
    <article className={styles.post}>
      <header className={styles.header}>
        <Avatar name={author} size={44} />
        <div>
          <div className={styles.author}>{author}</div>
          <div className={styles.time}>{time}</div>
        </div>
      </header>

      <p className={styles.text}>{text}</p>
      {image && <ImagePlaceholder image={image} className={styles.image} />}

      <footer className={styles.actions}>
        <button
          type="button"
          className={`${styles.action} ${liked ? styles.liked : ""}`}
          aria-pressed={liked}
          onClick={onLike}
        >
          {icons.like}
          <span>{likes}</span>
          <span className={styles.actionLabel}>Нравится</span>
        </button>
        <button type="button" className={styles.action}>
          {icons.comment}
          <span>{comments}</span>
          <span className={styles.actionLabel}>Комментарии</span>
        </button>
        <button type="button" className={styles.action}>
          {icons.share}
          <span>{shares}</span>
          <span className={styles.actionLabel}>Поделиться</span>
        </button>
        <SaveButton type="post" id={id} title={excerpt(text)} className={styles.save} />
      </footer>
    </article>
  );
};

export default Post;
