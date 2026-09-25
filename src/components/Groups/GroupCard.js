import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import ImagePlaceholder from "../ImagePlaceholder/ImagePlaceholder";
import { membersLabel } from "../../utils/plural";
import JoinButton from "./JoinButton";
import styles from "./Groups.module.css";

const GroupCard = ({ group }) => {
  const { id, name, topic, image, members, description } = group;

  return (
    <article className={styles.card}>
      <ImagePlaceholder image={image} className={styles.cardCover} />
      <div className={styles.cardBody}>
        <Avatar name={name} size={56} className={styles.cardAvatar} />
        <h2 className={styles.cardTitle}>
          <Link to={`/groups/${id}`}>{name}</Link>
        </h2>
        <div className={styles.muted}>
          {topic} · {membersLabel(members)}
        </div>
        <p className={styles.cardText}>{description}</p>
        <JoinButton group={group} />
      </div>
    </article>
  );
};

export default GroupCard;
