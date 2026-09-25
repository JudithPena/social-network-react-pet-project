import styles from "./PageStub.module.css";

// Placeholder for sections that are not laid out yet
const PageStub = ({ title, text = "Раздел в разработке." }) => {
  return (
    <div className={styles.pageStub}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.text}>{text}</p>
    </div>
  );
};
export default PageStub;
