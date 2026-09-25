import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Settings.module.css";

const Settings = ({ onResetData }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [confirming, setConfirming] = useState(false);
  // The page remounts after a reset, so the success flag travels in the location state
  const justReset = location.state?.dataReset;

  const reset = () => {
    onResetData();
    navigate(location.pathname, { replace: true, state: { dataReset: true } });
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Настройки</h1>

      <section className={styles.card} aria-labelledby="demo-data-title">
        <h2 id="demo-data-title" className={styles.cardTitle}>
          Демо-данные
        </h2>
        <p className={styles.text}>
          Посты, лайки, друзья, заявки, сообщения и отметки о событиях сохраняются в этом браузере
          (localStorage) и не пропадают после перезагрузки страницы.
        </p>

        {justReset && (
          <p className={styles.success} role="status">
            Демо-данные сброшены к исходным.
          </p>
        )}

        {confirming ? (
          <div className={styles.confirm}>
            <span className={styles.text}>Все ваши изменения пропадут. Сбросить?</span>
            <div className={styles.buttons}>
              <button type="button" className={styles.dangerButton} onClick={reset}>
                Да, сбросить
              </button>
              <button type="button" className={styles.secondaryButton} onClick={() => setConfirming(false)}>
                Отмена
              </button>
            </div>
          </div>
        ) : (
          <button type="button" className={styles.secondaryButton} onClick={() => setConfirming(true)}>
            Сбросить демо-данные
          </button>
        )}
      </section>
    </div>
  );
};

export default Settings;
