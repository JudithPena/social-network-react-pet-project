import styles from "./ImagePlaceholder.module.css";

// Stands in for real photos until there is image upload
const ImagePlaceholder = ({ image, className = "" }) => {
  return (
    <div className={`${styles.placeholder} ${styles[image] || ""} ${className}`} role="img" aria-label="Фото">
      <svg viewBox="0 0 64 40" aria-hidden="true">
        <circle cx="46" cy="12" r="5" />
        <path d="M0 40l18-20 12 12 8-8 26 16z" />
      </svg>
    </div>
  );
};

export default ImagePlaceholder;
