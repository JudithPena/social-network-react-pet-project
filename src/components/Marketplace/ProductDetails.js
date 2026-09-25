import { Link, useParams } from "react-router-dom";
import { useMarket } from "../../context/MarketContext";
import { productCategories } from "../../data/market";
import { formatPrice } from "../../utils/format";
import Avatar from "../Avatar/Avatar";
import ImagePlaceholder from "../ImagePlaceholder/ImagePlaceholder";
import PageStub from "../PageStub/PageStub";
import styles from "./Marketplace.module.css";

const ProductDetails = () => {
  const { id } = useParams();
  const { getProduct, isInCart, addToCart } = useMarket();
  const product = getProduct(Number(id));

  if (!product) {
    return <PageStub title="Товар не найден" text="Возможно, объявление уже снято с продажи." />;
  }

  const { title, price, image, category, condition, location, seller, description } = product;
  const categoryLabel = productCategories.find((item) => item.id === category)?.label;
  const inCart = isInCart(product.id);

  return (
    <article className={styles.details}>
      <ImagePlaceholder image={image} className={styles.detailsImage} />

      <div className={styles.detailsBody}>
        <Link to="/marketplace" className={styles.backLink}>
          ← Все товары
        </Link>
        <h1 className={styles.detailsTitle}>{title}</h1>
        <div className={styles.detailsPrice}>{formatPrice(price)}</div>

        <div className={styles.detailsActions}>
          {inCart ? (
            <Link to="/marketplace/cart" className={styles.secondaryButton}>
              В корзине ✓ Перейти
            </Link>
          ) : (
            <button type="button" className={styles.primaryButton} onClick={() => addToCart(product.id)}>
              В корзину
            </button>
          )}
          <Link to={`/messages/${seller.id}`} className={styles.secondaryButton}>
            Написать продавцу
          </Link>
        </div>

        <dl className={styles.facts}>
          <div>
            <dt>Категория</dt>
            <dd>{categoryLabel}</dd>
          </div>
          <div>
            <dt>Состояние</dt>
            <dd>{condition}</dd>
          </div>
          <div>
            <dt>Район</dt>
            <dd>{location}</dd>
          </div>
        </dl>

        <section>
          <h2 className={styles.sectionTitle}>Описание</h2>
          <p className={styles.description}>{description}</p>
        </section>

        <section>
          <h2 className={styles.sectionTitle}>Продавец</h2>
          <div className={styles.seller}>
            <Avatar name={seller.name} size={44} />
            <span>{seller.name}</span>
          </div>
        </section>
      </div>
    </article>
  );
};

export default ProductDetails;
