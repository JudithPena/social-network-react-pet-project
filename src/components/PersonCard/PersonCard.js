import { mutualFriendsLabel } from "../../utils/plural";
import Avatar from "../Avatar/Avatar";
import styles from "./PersonCard.module.css";

// Card with avatar, name and mutual friends; buttons go in children
const PersonCard = ({ name, mutual, children }) => {
  return (
    <div className={styles.card}>
      <Avatar name={name} size={64} />
      <div className={styles.name}>{name}</div>
      <div className={styles.mutual}>{mutualFriendsLabel(mutual)}</div>
      {children && <div className={styles.actions}>{children}</div>}
    </div>
  );
};

export default PersonCard;
