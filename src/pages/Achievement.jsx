import { useParams } from "react-router-dom";
import { achievements } from "../data/achievements";
import styles from "../styles/Achievement.module.css";
import { Link } from "react-router-dom";

function Achievement() {
  const { id } = useParams();
  const achievement = achievements.find((a) => a.id === Number(id));

  if (!achievement) return <p>Достижение не найдено</p>;

  return (
    <div className={styles.container}>
      <img
        src={`/images/achievements/Ach-${achievement.id}.jpg`}
        alt={achievement.title}
        className={styles.heroImage}
        onError={(e) => {
          e.target.src = "/images/placeholder.jpg";
        }}
      />

      <div className={styles.content}>
        <h1 className={styles.title}>{achievement.title}</h1>
        <p className={styles.description}>{achievement.description}</p>
        <p className={styles.descriptionFull}>{achievement.descriptionFull}</p>
        <p className={`${styles.rarity} ${styles[achievement.rarity]}`}>
          Редкость: {achievement.rarity}
        </p>
        <Link to="/" className={styles.backButton}>
          ← Назад на главную
        </Link>
      </div>
    </div>
  );
}

export default Achievement;
