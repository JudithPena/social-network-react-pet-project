import { useSearchParams } from "react-router-dom";
import { useMarket } from "../../context/MarketContext";
import { productCategories } from "../../data/market";
import MarketHeader from "./MarketHeader";
import ProductCard from "./ProductCard";
import styles from "./Marketplace.module.css";

const sorters = {
  new: (a, b) => b.listed - a.listed,
  cheap: (a, b) => a.price - b.price,
  expensive: (a, b) => b.price - a.price,
};

const Catalog = () => {
  const { products } = useMarket();
  // Filters live in the URL so a filtered catalog can be shared
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");
  const sort = sorters[searchParams.get("sort")] ? searchParams.get("sort") : "new";
  const query = searchParams.get("q") || "";

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next, { replace: key === "q" });
  };

  const normalized = query.trim().toLowerCase();
  const visible = products
    .filter((product) => !category || product.category === category)
    .filter((product) => product.title.toLowerCase().includes(normalized))
    .sort(sorters[sort]);

  return (
    <div className={styles.page}>
      <MarketHeader />

      <div className={styles.toolbar}>
        <input
          className={styles.search}
          type="search"
          placeholder="Поиск товаров"
          aria-label="Поиск товаров"
          value={query}
          onChange={(event) => updateParam("q", event.target.value)}
        />
        <select
          className={styles.sort}
          aria-label="Сортировка"
          value={sort}
          onChange={(event) => updateParam("sort", event.target.value === "new" ? null : event.target.value)}
        >
          <option value="new">Сначала новые</option>
          <option value="cheap">Сначала дешевле</option>
          <option value="expensive">Сначала дороже</option>
        </select>
      </div>

      <div className={styles.chips} role="group" aria-label="Категории">
        {[{ id: null, label: "Все" }, ...productCategories].map(({ id, label }) => (
          <button
            key={label}
            type="button"
            className={`${styles.chip} ${category === id ? styles.activeChip : ""}`}
            aria-pressed={category === id}
            onClick={() => updateParam("category", id)}
          >
            {label}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className={styles.empty}>Ничего не нашлось. Попробуйте другой запрос или категорию.</p>
      ) : (
        <ul className={styles.grid}>
          {visible.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Catalog;
