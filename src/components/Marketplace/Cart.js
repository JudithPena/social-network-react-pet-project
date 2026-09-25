import { useState } from "react";
import { Link } from "react-router-dom";
import { useMarket } from "../../context/MarketContext";
import { formatPrice } from "../../utils/format";
import { plural } from "../../utils/plural";
import ImagePlaceholder from "../ImagePlaceholder/ImagePlaceholder";
import MarketHeader from "./MarketHeader";
import styles from "./Marketplace.module.css";

const Cart = () => {
  const { cartItems, cartCount, cartTotal, setQuantity, removeFromCart, clearCart } = useMarket();
  const [ordered, setOrdered] = useState(false);

  // Demo checkout: there is no payment, the cart is just emptied
  const checkout = () => {
    clearCart();
    setOrdered(true);
  };

  return (
    <div className={styles.page}>
      <MarketHeader title="Корзина" inCart />

      {ordered ? (
        <div className={styles.empty} role="status">
          <p className={styles.success}>Заказ оформлен! Продавцы свяжутся с вами в сообщениях.</p>
          <Link to="/marketplace">Вернуться к покупкам</Link>
        </div>
      ) : cartItems.length === 0 ? (
        <div className={styles.empty}>
          <p>Корзина пуста.</p>
          <Link to="/marketplace">Перейти в маркетплейс</Link>
        </div>
      ) : (
        <>
          <ul className={styles.cartList}>
            {cartItems.map(({ id, quantity, product }) => (
              <li key={id} className={styles.cartItem}>
                <ImagePlaceholder image={product.image} className={styles.cartImage} />
                <div className={styles.cartInfo}>
                  <Link to={`/marketplace/${id}`} className={styles.cartTitle}>
                    {product.title}
                  </Link>
                  <div className={styles.muted}>{formatPrice(product.price)} за шт.</div>
                  <div className={styles.cartControls}>
                    <div className={styles.quantity}>
                      <button
                        type="button"
                        aria-label={`Уменьшить количество «${product.title}»`}
                        onClick={() => setQuantity(id, quantity - 1)}
                      >
                        −
                      </button>
                      <span aria-label={`Количество «${product.title}»`}>{quantity}</span>
                      <button
                        type="button"
                        aria-label={`Увеличить количество «${product.title}»`}
                        onClick={() => setQuantity(id, quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      className={styles.removeButton}
                      aria-label={`Удалить «${product.title}» из корзины`}
                      onClick={() => removeFromCart(id)}
                    >
                      Удалить
                    </button>
                  </div>
                </div>
                <div className={styles.cartPrice}>{formatPrice(product.price * quantity)}</div>
              </li>
            ))}
          </ul>

          <section className={styles.summary} aria-label="Итого">
            <div>
              <div className={styles.muted}>
                {cartCount} {plural(cartCount, ["товар", "товара", "товаров"])}
              </div>
              <div className={styles.total}>Итого: {formatPrice(cartTotal)}</div>
            </div>
            <button type="button" className={styles.primaryButton} onClick={checkout}>
              Оформить заказ
            </button>
          </section>
        </>
      )}
    </div>
  );
};

export default Cart;
