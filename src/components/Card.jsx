import { Link, useLocation } from "react-router-dom";
import styles from "../styles/Card.module.css";

function Card({ id, title, description, rarity, onClick }) {
  const location = useLocation();

  return (
    <Link
      to={`/achievement/${id}`}
      onClick={onClick}
      className={`${styles.card} ${styles[rarity]}`}
      state={{ from: location }}
    >
      <img
        src={`/images/achievements/Ach-${id}.jpg`}
        alt={title}
        className={styles.thumbnail}
      />
      <h3>{title}</h3>
      <p>{description}</p>
    </Link>
  );
}

export default Card;
