import { Link, Route, Routes } from "react-router-dom";
import { useEvents } from "../../context/EventsContext";
import { useGroups } from "../../context/GroupsContext";
import { usePosts } from "../../context/PostsContext";
import { useSaved } from "../../context/SavedContext";
import EventCard from "../Events/EventCard";
import Post from "../Post/Post";
import Tabs from "../Tabs/Tabs";
import styles from "./Saved.module.css";

const emptyTexts = {
  all: "Здесь появится всё, что вы сохраните.",
  post: "Сохранённых публикаций пока нет.",
  event: "Сохранённых событий пока нет.",
};

const SavedList = ({ type = "all" }) => {
  const { items } = useSaved();
  const { posts, toggleLike } = usePosts();
  const { getEvent } = useEvents();
  const { groupPosts, toggleGroupPostLike } = useGroups();

  // Bookmarked posts can come from the feed or from a group
  const findPost = (id) => {
    const post = posts.find((item) => item.id === id);
    if (post) return { ...post, onLike: () => toggleLike(id) };
    const groupPost = groupPosts.find((item) => item.id === id);
    return groupPost && { ...groupPost, onLike: () => toggleGroupPostLike(id) };
  };

  // Keep the saved order and drop bookmarks whose post or event no longer exists
  const entries = items
    .filter((item) => type === "all" || item.type === type)
    .map((item) => ({
      ...item,
      data: item.type === "post" ? findPost(item.id) : getEvent(item.id),
    }))
    .filter((entry) => entry.data);

  if (entries.length === 0) {
    return (
      <div className={styles.empty}>
        <p>{emptyTexts[type]}</p>
        <p>
          Нажмите на значок закладки у поста в <Link to="/">ленте</Link> или у{" "}
          <Link to="/events">события</Link>.
        </p>
      </div>
    );
  }

  return (
    <ul className={styles.list}>
      {entries.map(({ type: itemType, id, data }) => (
        <li key={`${itemType}-${id}`}>
          {itemType === "post" ? (
            <Post {...data} />
          ) : (
            <EventCard event={data} horizontal />
          )}
        </li>
      ))}
    </ul>
  );
};

const Saved = () => {
  const { items } = useSaved();
  const count = (type) => items.filter((item) => item.type === type).length;

  const tabs = [
    { path: "/saved", label: "Всё", count: items.length },
    { path: "/saved/posts", label: "Публикации", count: count("post") },
    { path: "/saved/events", label: "События", count: count("event") },
  ];

  return (
    <div className={styles.page}>
      <section className={styles.header}>
        <h1 className={styles.title}>Сохранённое</h1>
        <Tabs items={tabs} label="Разделы сохранённого" />
      </section>

      <Routes>
        <Route index element={<SavedList />} />
        <Route path="posts" element={<SavedList type="post" />} />
        <Route path="events" element={<SavedList type="event" />} />
      </Routes>
    </div>
  );
};

export default Saved;
