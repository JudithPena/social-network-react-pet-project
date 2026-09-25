import { photos } from "../../data/profile";
import ImagePlaceholder from "../ImagePlaceholder/ImagePlaceholder";
import styles from "./ProfileTab.module.css";

const ProfilePhotos = () => {
  return (
    <section className={styles.card}>
      <h2 className={styles.title}>
        Фото <span className={styles.count}>{photos.length}</span>
      </h2>
      <ul className={styles.photos}>
        {photos.map(({ id, image }) => (
          <li key={id}>
            <ImagePlaceholder image={image} className={styles.photo} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProfilePhotos;
