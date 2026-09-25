import { NavLink, Route, Routes } from "react-router-dom";
import { currentUser } from "../../data/profile";
import Avatar from "../Avatar/Avatar";
import PageStub from "../PageStub/PageStub";
import ProfileAbout from "./ProfileAbout";
import ProfileFriends from "./ProfileFriends";
import ProfilePhotos from "./ProfilePhotos";
import ProfilePosts from "./ProfilePosts";
import styles from "./Profile.module.css";

const tabs = [
  { path: "/profile", label: "Публикации" },
  { path: "/profile/about", label: "О себе" },
  { path: "/profile/friends", label: "Друзья" },
  { path: "/profile/photos", label: "Фото" },
];

const formatCount = (count) => (count >= 1000 ? `${(count / 1000).toFixed(1).replace(".0", "")}K` : count);

const Profile = () => {
  const { name, handle, bio, stats } = currentUser;

  return (
    <div className={styles.profile}>
      <section className={styles.card}>
        <div className={styles.cover} />

        <div className={styles.info}>
          <Avatar name={name} size={120} className={styles.avatar} />

          <div className={styles.identity}>
            <h1 className={styles.name}>{name}</h1>
            <div className={styles.handle}>@{handle}</div>
            <p className={styles.bio}>{bio}</p>
          </div>

          <div className={styles.buttons}>
            <button type="button" className={styles.primaryButton}>
              Редактировать профиль
            </button>
            <button type="button" className={styles.secondaryButton}>
              Поделиться
            </button>
          </div>
        </div>

        <dl className={styles.stats}>
          <div className={styles.stat}>
            <dt>Публикации</dt>
            <dd>{formatCount(stats.posts)}</dd>
          </div>
          <div className={styles.stat}>
            <dt>Подписчики</dt>
            <dd>{formatCount(stats.followers)}</dd>
          </div>
          <div className={styles.stat}>
            <dt>Подписки</dt>
            <dd>{formatCount(stats.following)}</dd>
          </div>
        </dl>

        <nav className={styles.tabs} aria-label="Разделы профиля">
          {tabs.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              end
              className={({ isActive }) => `${styles.tab} ${isActive ? styles.activeTab : ""}`}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </section>

      <Routes>
        <Route index element={<ProfilePosts />} />
        <Route path="about" element={<ProfileAbout />} />
        <Route path="friends" element={<ProfileFriends />} />
        <Route path="photos" element={<ProfilePhotos />} />
        <Route
          path="*"
          element={<PageStub title="Страница не найдена" text="В профиле нет такого раздела." />}
        />
      </Routes>
    </div>
  );
};

export default Profile;
