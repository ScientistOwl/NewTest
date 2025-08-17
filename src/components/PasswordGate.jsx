import { useState, useEffect } from "react";
import styles from "../styles/PasswordGate.module.css";

function PasswordGate({ onUnlock }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const unlocked = localStorage.getItem("access_granted");
    if (unlocked === "true") {
      onUnlock();
    }
  }, [onUnlock]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === "13371337") {
      localStorage.setItem("access_granted", "true");
      onUnlock();
    } else {
      setError("Неверный пароль");
    }
  };

  return (
    <div className={styles.overlay}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Введите пароль для доступа</h2>
        <input
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Пароль"
        />
        <button type="submit">Войти</button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
}

export default PasswordGate;
