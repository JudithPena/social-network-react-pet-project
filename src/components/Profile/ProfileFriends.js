import { useFriends } from "../../context/FriendsContext";
import PersonCard from "../PersonCard/PersonCard";
import styles from "./ProfileTab.module.css";

const ProfileFriends = () => {
  const { friends } = useFriends();

  return (
    <section className={styles.card}>
      <h2 className={styles.title}>
        Друзья <span className={styles.count}>{friends.length}</span>
      </h2>
      <ul className={styles.friends}>
        {friends.map(({ id, name, mutual }) => (
          <li key={id}>
            <PersonCard name={name} mutual={mutual} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProfileFriends;
