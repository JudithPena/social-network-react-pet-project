import { Link } from "react-router-dom";
import { useMarket } from "../../context/MarketContext";
import styles from "./Marketplace.module.css";

// On the cart page the link leads back to the catalog instead of the cart itself
const MarketHeader = ({ title = "Маркетплейс", inCart = false }) => {
  const { cartCount } = useMarket();

  return (
    <section className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      {inCart ? (
        <Link to="/marketplace" className={styles.cartLink}>
          ← К товарам
        </Link>
      ) : (
        <Link to="/marketplace/cart" className={styles.cartLink}>
          Корзина
          {cartCount > 0 && <span className={styles.cartCount}>{cartCount}</span>}
        </Link>
      )}
    </section>
  );
};

export default MarketHeader;
