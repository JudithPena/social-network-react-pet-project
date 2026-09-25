import { friends } from "../../data/profile";
import Avatar from "../Avatar/Avatar";
import { mutualFriendsLabel } from "../../utils/plural";
import styles from "./ProfileTab.module.css";

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
            <div className={styles.friendMutual}>{mutualFriendsLabel(mutual)}</div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProfileFriends;
