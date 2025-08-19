import { useParams, useLocation, Link } from "react-router-dom";
import { useState } from "react";
import { achievements } from "../data/achievements";
import styles from "../styles/Achievement.module.css";

function Achievement() {
  const { id } = useParams();
  const location = useLocation();
  const achievement = achievements.find((a) => a.id === Number(id));
  const [revealed, setRevealed] = useState(false);

  const hiddenLetters = {
    3: "Ж",
    7: "А",
    12: "Б",
    18: "И",
    21: "Й",
    44: "Х",
    32: "У",
    28: "Й",
  };

  if (!achievement) return <p>Достижение не найдено</p>;

  const backLink = location.state?.from?.search
    ? `/${location.state.from.search}`
    : "/";

  const hasLetter = hiddenLetters[achievement.id];
  const handleReveal = () => {
    if (hasLetter) setRevealed(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper} onClick={handleReveal}>
        <img
          src={`/images/achievements/Ach-${achievement.id}.jpg`}
          alt={achievement.title}
          className={`${styles.heroImage} ${revealed ? styles.hidden : ""}`}
          onError={(e) => {
            e.target.src = "/images/placeholder.jpg";
          }}
        />
        {hasLetter && revealed && (
          <div className={styles.letterReveal}>{hasLetter}</div>
        )}
      </div>

      <div className={styles.content}>
        <h1 className={styles.title}>{achievement.title}</h1>
        <p className={styles.description}>{achievement.description}</p>
        <p className={styles.descriptionFull}>{achievement.descriptionFull}</p>
        <p className={`${styles.rarity} ${styles[achievement.rarity]}`}>
          Редкость: {achievement.rarity}
        </p>
        <Link to={backLink} className={styles.backButton}>
          ← Назад на главную
        </Link>
      </div>
    </div>
  );
}

export default Achievement;
