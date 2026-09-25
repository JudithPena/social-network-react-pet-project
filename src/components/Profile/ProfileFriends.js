import { friends } from "../../data/profile";
import Avatar from "../Avatar/Avatar";
import styles from "./ProfileTab.module.css";

// 1 общий друг, 3 общих друга, 12 общих друзей
const mutualLabel = (count) => {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return `${count} общий друг`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${count} общих друга`;
  return `${count} общих друзей`;
};

const ProfileFriends = () => {
  return (
    <section className={styles.card}>
      <h2 className={styles.title}>
        Друзья <span className={styles.count}>{friends.length}</span>
      </h2>
      <ul className={styles.friends}>
        {friends.map(({ id, name, mutual }) => (
          <li key={id} className={styles.friend}>
            <Avatar name={name} size={64} />
            <div className={styles.friendName}>{name}</div>
            <div className={styles.friendMutual}>{mutualLabel(mutual)}</div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProfileFriends;
