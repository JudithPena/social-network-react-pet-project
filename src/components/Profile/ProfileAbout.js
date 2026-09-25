import { currentUser } from "../../data/profile";
import styles from "./ProfileTab.module.css";

const ProfileAbout = () => {
  return (
    <section className={styles.card}>
      <h2 className={styles.title}>О себе</h2>
      <dl className={styles.about}>
        {currentUser.about.map(({ id, label, value }) => (
          <div key={id} className={styles.aboutRow}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default ProfileAbout;
