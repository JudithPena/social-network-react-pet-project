import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/format";
import ImagePlaceholder from "../ImagePlaceholder/ImagePlaceholder";
import styles from "./Marketplace.module.css";

const ProductCard = ({ product }) => {
  const { id, title, price, image, location, condition } = product;

  return (
    <article className={styles.card}>
      <Link to={`/marketplace/${id}`} className={styles.cardLink}>
        <ImagePlaceholder image={image} className={styles.cardImage} />
        <div className={styles.cardBody}>
          <div className={styles.price}>{formatPrice(price)}</div>
          <h2 className={styles.cardTitle}>{title}</h2>
          <div className={styles.muted}>
            {location} · {condition}
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ProductCard;
