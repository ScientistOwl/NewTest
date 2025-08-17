import { Link } from "react-router-dom";
import styles from "../styles/Card.module.css";

function Card({ id, title, description, rarity }) {
  return (
    <Link
      to={`/achievement/${id}`}
      className={`${styles.card} ${styles[rarity]}`}
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
